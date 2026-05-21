import { GoogleGenAI } from "@google/genai";

type GenerateAIReadingOptions = {
  prompt: string;
  maxOutputTokens?: number;
};

function shouldUseLocalFallback(error: unknown) {
  if (process.env.AI_ENABLE_LOCAL_FALLBACK === "true") {
    return true;
  }

  if (process.env.NODE_ENV === "production") {
    return false;
  }

  const message = error instanceof Error ? error.message : String(error);
  const cause =
    error instanceof Error && error.cause
      ? String(error.cause)
      : "";

  return (
    message.includes("fetch failed") ||
    cause.includes("UND_ERR_CONNECT_TIMEOUT") ||
    cause.includes("EACCES")
  );
}

function buildLocalFallbackReading(prompt: string) {
  const isLiuYao = prompt.includes("Liu Yao");

  if (isLiuYao) {
    return [
      "一、本卦所示 / Primary Hexagram",
      "本地测试环境暂时无法连接 Gemini，因此这里返回一份开发环境兜底解读，用来验证 PayPal 付款、订单确认与 AI 解锁流程是否完整。就六爻流程而言，当前订单已经完成支付，系统也已经进入生成解读步骤，说明支付链路本身是通的。",
      "",
      "二、变卦趋势 / Changed Hexagram Tendency",
      "正式上线后，这一部分会由 Gemini 根据用户的问题、本卦、变卦、动爻、起卦时间和问题类型生成更完整的中英文初步解读。当前内容只用于本地沙盒测试，不代表正式占断结论。",
      "",
      "三、动爻提示 / Changing Line Indications",
      "若本地或正式环境能正常访问 AI 服务，系统会进一步说明动爻位置、事情变化点、当前状态与后续趋势。若涉及财务、医疗、法律、安全等事项，仍应寻求相应专业人士意见。",
      "",
      "四、后续建议 / Next Step",
      "This is a local development fallback result. The PayPal payment flow is working; the remaining issue is AI network access from the local machine. On Vercel or any environment that can reach Gemini, the real AI reading should replace this fallback automatically.",
    ].join("\n\n");
  }

  return [
    "一、格局初判 / Preliminary Pattern",
    "本地测试环境暂时无法连接 Gemini，因此这里返回一份开发环境兜底解读，用来验证 PayPal 付款、订单确认与 AI 解锁流程是否完整。当前内容只用于测试，不代表正式风水分析结论。",
    "",
    "二、主要关注点 / Main Concerns",
    "正式上线后，系统会根据用户提交的住宅类型、朝向、房间位置、关注事项和补充说明生成更完整的中英文初步报告。若提交户型图、房间照片和方向信息，后续人工深度咨询会更准确。",
    "",
    "三、后续建议 / Next Step",
    "This is a local development fallback result. The PayPal payment flow is working; the remaining issue is AI network access from the local machine. On Vercel or any environment that can reach Gemini, the real AI reading should replace this fallback automatically.",
  ].join("\n\n");
}

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  return new GoogleGenAI({
    apiKey,
  });
}

export async function generateAIReading({
  prompt,
  maxOutputTokens = 1200,
}: GenerateAIReadingOptions) {
  const ai = getGeminiClient();

  const model = process.env.AI_MODEL || "gemini-2.5-flash";

  let response;

  try {
    response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        temperature: 0.45,
        maxOutputTokens,
      },
    });
  } catch (error) {
    if (shouldUseLocalFallback(error)) {
      return buildLocalFallbackReading(prompt);
    }

    throw error;
  }

  const text = response.text;

  if (!text || !text.trim()) {
    throw new Error("AI returned empty response");
  }

  return text.trim();
}

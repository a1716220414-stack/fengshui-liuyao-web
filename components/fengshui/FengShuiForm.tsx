"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import FengShuiReportCard from "@/components/reports/FengShuiReportCard";
import AIReadingCard from "@/components/reports/AIReadingCard";
import type { FengShuiFormData } from "@/lib/fengshuiReport";
import { generateFengShuiReport as generateFengShuiInsightReport } from "@/lib/fengshui-insights";
import type { FengShuiReport as FengShuiInsightReport } from "@/lib/fengshui-insights";

const initialFormData: FengShuiFormData = {
  name: "",
  email: "",
  wechat: "",
  xAccount: "",
  instagram: "",
  preferredContactMethod: "email",

  houseType: "apartment",
  facingDirection: "unknown",

  analysisScope: "wholeHome",
  targetRoomType: "bedroom",
  targetRoomArea: "unknown",
  roomPurpose: "",

  mainDoorArea: "unknown",
  bedroomArea: "unknown",
  kitchenArea: "unknown",
  bathroomArea: "unknown",

  mainConcern: "overall",
  paidConsultationInterest: "maybe",
  notes: "",
};

const areaOptions = [
  { value: "unknown", label: "Not sure / 不确定" },
  { value: "none", label: "None or not applicable / 无或不适用" },
  { value: "north", label: "North / 北方" },
  { value: "south", label: "South / 南方" },
  { value: "east", label: "East / 东方" },
  { value: "west", label: "West / 西方" },
  { value: "northeast", label: "Northeast / 东北方" },
  { value: "northwest", label: "Northwest / 西北方" },
  { value: "southeast", label: "Southeast / 东南方" },
  { value: "southwest", label: "Southwest / 西南方" },
  { value: "center", label: "Center / 中宫" },
];

const directionOptions = areaOptions.filter(
  (item) => item.value !== "center" && item.value !== "none",
);

function FieldLabel({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <label className="mb-2 block">
      <span className="block text-sm font-medium text-stone-100">{title}</span>
      <span className="block text-xs text-stone-500">{subtitle}</span>
    </label>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-stone-600 focus:border-amber-300/60"
    />
  );
}

export default function FengShuiForm() {
  const [formData, setFormData] =
    useState<FengShuiFormData>(initialFormData);
  const [error, setError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [freeReport, setFreeReport] =
    useState<FengShuiInsightReport | null>(null);
  const [aiReading, setAiReading] = useState("");
  const [aiError, setAiError] = useState("");
  const [isCreatingPayment, setIsCreatingPayment] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  function updateField(field: keyof FengShuiFormData, value: string) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    setSelectedFiles(files);
  }

  async function saveLeadToServer(currentFormData: FengShuiFormData) {
    const payload = new FormData();

    Object.entries(currentFormData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    selectedFiles.forEach((file) => {
      payload.append("files", file);
    });

    const response = await fetch("/api/fengshui-leads", {
      method: "POST",
      body: payload,
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      throw new Error(result.message || "Failed to save lead.");
    }

    return result as {
      ok: boolean;
      leadId: string;
      uploadedFiles: Array<{
        name: string;
        path: string;
        type: string;
        size: number;
      }>;
    };
  }

  function hasAnyContact() {
    return Boolean(
      formData.email.trim() ||
        formData.wechat.trim() ||
        formData.xAccount.trim() ||
        formData.instagram.trim(),
    );
  }

  function buildCurrentFreeReport() {
    return generateFengShuiInsightReport({
      houseType: formData.houseType,
      facingDirection: formData.facingDirection,
      analysisScope: formData.analysisScope,
      targetRoomType: formData.targetRoomType,
      targetRoomArea: formData.targetRoomArea,
      roomPurpose: formData.roomPurpose,
      mainDoorArea: formData.mainDoorArea,
      bedroomArea: formData.bedroomArea,
      kitchenArea: formData.kitchenArea,
      bathroomArea: formData.bathroomArea,
      mainConcern: formData.mainConcern,
      notes: formData.notes,
      uploadedFileCount: selectedFiles.length,
    });
  }

  function handleGenerateFreeReport() {
    const report = buildCurrentFreeReport();

    setFreeReport(report);
    setAiReading("");
    setAiError("");
    setError("");
  }

  async function handlePayAndUnlockAIReading() {
    setAiError("");
    setAiReading("");
    setError("");
    setSaveMessage("");
    setIsCreatingPayment(true);

    try {
      const reportForAI = freeReport ?? buildCurrentFreeReport();

      setFreeReport(reportForAI);

      const response = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceType: "fengshui",
          customer: {
            name: formData.name,
            email: formData.email,
            wechat: formData.wechat,
            xAccount: formData.xAccount,
            instagram: formData.instagram,
          },
          requestPayload: {
            serviceType: "fengshui",
            formData,
            freeReport: reportForAI,
            uploadedFileCount: selectedFiles.length,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Failed to create payment order.");
      }

      window.localStorage.setItem(
        `sy-ai-reading-payload:${data.providerOrderId}`,
        JSON.stringify({
          serviceType: "fengshui",
          aiRequestBody: {
            serviceType: "fengshui",
            formData,
            freeReport: reportForAI,
            uploadedFileCount: selectedFiles.length,
          },
        }),
      );

      window.localStorage.setItem(
        "sy-ai-last-provider-order-id",
        data.providerOrderId,
      );

      window.location.href = data.payUrl;
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Failed to create payment order.";

      setAiError(message);
    } finally {
      setIsCreatingPayment(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!hasAnyContact()) {
      setError(
        "Please provide at least one contact method. / 请至少填写一种联系方式。",
      );
      return;
    }

    if (formData.email.trim() && !formData.email.includes("@")) {
      setError("Please enter a valid email address. / 请填写有效邮箱。");
      return;
    }

    try {
      setError("");
      setSaveMessage("");
      setIsSaving(true);

      await saveLeadToServer(formData);

      setSaveMessage(
        "Thank you. We have received your request and will follow up based on your preferred contact method. / 感谢提交。我们已经收到你的需求，并会根据你选择的联系方式进行后续跟进。",
      );
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Failed to save your information.";

      setError(message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
            Free Check / 免费检测
          </p>

          <h2 className="mt-3 text-2xl font-semibold text-white">
            Submit your home or room information
          </h2>

          <p className="mt-2 text-sm leading-6 text-stone-400">
            填写住宅或单个房间信息后，可以选择生成免费报告、支付解锁 AI
            初步解读，或提交咨询需求。三个按钮功能相互独立。
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <h3 className="text-base font-semibold text-white">
              1. Contact Information / 联系方式
            </h3>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <FieldLabel title="Name" subtitle="称呼，可选" />
                <TextInput
                  value={formData.name}
                  onChange={(value) => updateField("name", value)}
                  placeholder="Your name"
                />
              </div>

              <div>
                <FieldLabel
                  title="Preferred Contact"
                  subtitle="优先联系方式"
                />
                <select
                  value={formData.preferredContactMethod}
                  onChange={(event) =>
                    updateField("preferredContactMethod", event.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/60"
                >
                  <option value="email">Email / 邮箱</option>
                  <option value="wechat">WeChat / 微信</option>
                  <option value="x">X / Twitter</option>
                  <option value="instagram">Instagram</option>
                </select>
              </div>

              <div>
                <FieldLabel title="Email" subtitle="邮箱，可选" />
                <TextInput
                  value={formData.email}
                  onChange={(value) => updateField("email", value)}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <FieldLabel title="WeChat" subtitle="微信号，可选" />
                <TextInput
                  value={formData.wechat}
                  onChange={(value) => updateField("wechat", value)}
                  placeholder="Your WeChat ID"
                />
              </div>

              <div>
                <FieldLabel title="X / Twitter" subtitle="X 账号，可选" />
                <TextInput
                  value={formData.xAccount}
                  onChange={(value) => updateField("xAccount", value)}
                  placeholder="@yourname"
                />
              </div>

              <div>
                <FieldLabel title="Instagram" subtitle="Instagram 账号，可选" />
                <TextInput
                  value={formData.instagram}
                  onChange={(value) => updateField("instagram", value)}
                  placeholder="@yourname"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <h3 className="text-base font-semibold text-white">
              2. Analysis Type / 分析类型
            </h3>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <FieldLabel title="Analysis Scope" subtitle="分析范围" />
                <select
                  value={formData.analysisScope}
                  onChange={(event) =>
                    updateField("analysisScope", event.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/60"
                >
                  <option value="wholeHome">Whole Home / 整体住宅</option>
                  <option value="singleRoom">Single Room / 单个房间</option>
                  <option value="officeOrShop">
                    Office or Shop / 办公室或店铺
                  </option>
                </select>
              </div>

              <div>
                <FieldLabel title="House Type" subtitle="房屋类型" />
                <select
                  value={formData.houseType}
                  onChange={(event) =>
                    updateField("houseType", event.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/60"
                >
                  <option value="apartment">Apartment / 公寓</option>
                  <option value="house">House / 独栋住宅</option>
                  <option value="office">Office / 办公室</option>
                  <option value="shop">Shop / 店铺</option>
                  <option value="roomOnly">Room Only / 只看房间</option>
                </select>
              </div>

              <div>
                <FieldLabel title="Target Room" subtitle="想重点看的房间" />
                <select
                  value={formData.targetRoomType}
                  onChange={(event) =>
                    updateField("targetRoomType", event.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/60"
                >
                  <option value="bedroom">Bedroom / 卧室</option>
                  <option value="livingRoom">Living Room / 客厅</option>
                  <option value="study">
                    Study or Office Room / 书房或办公房间
                  </option>
                  <option value="kitchen">Kitchen / 厨房</option>
                  <option value="bathroom">Bathroom / 卫生间</option>
                  <option value="entrance">Entrance / 入户区域</option>
                  <option value="shop">Shop / 店铺空间</option>
                  <option value="office">Office / 办公空间</option>
                  <option value="other">Other / 其他</option>
                </select>
              </div>

              <div>
                <FieldLabel title="Target Room Area" subtitle="目标房间方位" />
                <select
                  value={formData.targetRoomArea}
                  onChange={(event) =>
                    updateField("targetRoomArea", event.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/60"
                >
                  {areaOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <FieldLabel
                title="Room Purpose"
                subtitle="房间用途或你想改善的问题，可选"
              />
              <TextInput
                value={formData.roomPurpose}
                onChange={(value) => updateField("roomPurpose", value)}
                placeholder="Example: improve sleep, desk placement, relationship, business flow..."
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <h3 className="text-base font-semibold text-white">
              3. Basic Layout / 基础格局
            </h3>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <FieldLabel title="Facing Direction" subtitle="房屋朝向" />
                <select
                  value={formData.facingDirection}
                  onChange={(event) =>
                    updateField("facingDirection", event.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/60"
                >
                  {directionOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel title="Main Door Area" subtitle="入户门所在方位" />
                <select
                  value={formData.mainDoorArea}
                  onChange={(event) =>
                    updateField("mainDoorArea", event.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/60"
                >
                  {areaOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel title="Bedroom Area" subtitle="卧室所在方位" />
                <select
                  value={formData.bedroomArea}
                  onChange={(event) =>
                    updateField("bedroomArea", event.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/60"
                >
                  {areaOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel title="Kitchen Area" subtitle="厨房所在方位" />
                <select
                  value={formData.kitchenArea}
                  onChange={(event) =>
                    updateField("kitchenArea", event.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/60"
                >
                  {areaOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel title="Bathroom Area" subtitle="卫生间所在方位" />
                <select
                  value={formData.bathroomArea}
                  onChange={(event) =>
                    updateField("bathroomArea", event.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/60"
                >
                  {areaOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel title="Main Concern" subtitle="最关心的问题" />
                <select
                  value={formData.mainConcern}
                  onChange={(event) =>
                    updateField("mainConcern", event.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/60"
                >
                  <option value="overall">Overall Balance / 整体平衡</option>
                  <option value="wealth">Wealth / 财运资源</option>
                  <option value="career">Career / 事业发展</option>
                  <option value="relationship">Relationship / 关系情感</option>
                  <option value="health">Health / 健康休息</option>
                  <option value="sleep">Sleep / 睡眠质量</option>
                  <option value="business">Business / 生意经营</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <h3 className="text-base font-semibold text-white">
              4. Upload Images / 上传图片
            </h3>

            <p className="mt-2 text-sm leading-6 text-stone-500">
              当前版本可以保存户型图、房间实景图或指南针截图，后续深度咨询会结合这些资料进一步判断。
            </p>

            <div className="mt-5">
              <FieldLabel
                title="Floor plan, room photos, or compass screenshot"
                subtitle="户型图、房间实景图、指南针截图"
              />
              <input
                type="file"
                multiple
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="w-full rounded-xl border border-dashed border-white/15 bg-black/30 px-4 py-3 text-sm text-stone-300 file:mr-4 file:rounded-full file:border-0 file:bg-amber-300 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black"
              />

              {selectedFiles.length > 0 ? (
                <div className="mt-4 rounded-xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-stone-300">
                  <p className="font-medium text-amber-100">
                    Selected files / 已选择文件：
                  </p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    {selectedFiles.map((file) => (
                      <li key={`${file.name}-${file.size}`}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <h3 className="text-base font-semibold text-white">
              5. Paid Consultation / 付费咨询意向
            </h3>

            <div className="mt-5">
              <FieldLabel
                title="Are you interested in deeper consultation?"
                subtitle="是否有进一步付费分析意向"
              />
              <select
                value={formData.paidConsultationInterest}
                onChange={(event) =>
                  updateField("paidConsultationInterest", event.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/60"
              >
                <option value="yes">Yes, contact me / 是，请联系我</option>
                <option value="maybe">Maybe later / 可能之后需要</option>
                <option value="no">Free report only / 只看免费报告</option>
              </select>
            </div>

            <div className="mt-4">
              <FieldLabel title="Additional Notes" subtitle="补充说明，可选" />
              <textarea
                value={formData.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                placeholder="Tell us more about your home, room layout, current problem, or what kind of paid consultation you may need."
                rows={4}
                className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-stone-600 focus:border-amber-300/60"
              />
            </div>
          </div>

          {error ? (
            <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          {saveMessage ? (
            <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
              {saveMessage}
            </div>
          ) : null}

          <div className="grid gap-3 md:grid-cols-3">
            <button
              type="button"
              onClick={handleGenerateFreeReport}
              className="rounded-full border border-amber-300/40 px-6 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-300/10"
            >
              Generate Free Report / 生成免费报告
            </button>

            <button
              type="button"
              onClick={handlePayAndUnlockAIReading}
              disabled={isCreatingPayment}
              className="rounded-full border border-emerald-300/40 px-6 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-300/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCreatingPayment
                ? "Creating Payment... / 正在创建支付订单..."
                : "Pay with PayPal / PayPal 支付解锁 AI 解读"}
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving
                ? "Submitting... / 正在提交..."
                : "Submit Request / 提交咨询需求"}
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-6">
        {aiError ? (
          <div className="mb-6 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {aiError}
          </div>
        ) : null}

        {aiReading ? (
          <AIReadingCard
            title="Feng Shui AI Preliminary Interpretation"
            zhTitle="风水 AI 初步解读"
            reading={aiReading}
          />
        ) : freeReport ? (
          <FengShuiReportCard report={freeReport} />
        ) : (
          <div className="flex h-full min-h-[520px] flex-col justify-center rounded-[1.25rem] border border-dashed border-white/10 p-6 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
              Report Preview
            </p>

            <h3 className="mt-4 text-2xl font-semibold text-white">
              Your Feng Shui report will appear here
            </h3>

            <p className="mt-3 text-sm leading-7 text-stone-400">
              Fill in the information, then choose Free Report or paid AI
              Reading.
            </p>

            <p className="mt-2 text-sm leading-7 text-stone-500">
              填写左侧信息后，可以选择生成免费报告，或通过 PayPal 支付后解锁
              AI 解读。提交咨询需求只用于保存联系方式和后续跟进。
            </p>

            <div className="mt-8 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5 text-left">
              <h4 className="font-semibold text-amber-100">
                How this page works / 本页使用方式
              </h4>

              <div className="mt-4 space-y-3 text-sm leading-7 text-stone-400">
                <p>
                  1. Generate Free Report：生成一份规则型免费初步报告。
                </p>
                <p>
                  2. Pay and Unlock AI Reading：创建 PayPal 订单，支付成功后自动生成更完整的
                  AI 初步解读。
                </p>
                <p>
                  3. Submit Request：提交联系方式和咨询需求，便于后续人工跟进。
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

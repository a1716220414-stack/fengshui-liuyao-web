import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy & Service Disclaimer",
  description:
    "Privacy policy and service disclaimer for SY Metaphysics Feng Shui, Liu Yao, and Taoist consultation requests.",
  alternates: {
    canonical: absoluteUrl("/privacy"),
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-stone-950 px-6 py-16 text-stone-100">
      <section className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
          Privacy & Disclaimer / 隐私与免责声明
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-6xl">
          Privacy & Service Disclaimer
        </h1>

        <h2 className="mt-4 text-2xl font-medium text-amber-100 md:text-3xl">
          隐私保护与服务说明
        </h2>

        <p className="mt-6 text-sm leading-7 text-stone-400">
          This page explains what information may be collected when you use SY
          Metaphysics, how the information may be used, and the limitations of
          Feng Shui and Liu Yao consultation services.
        </p>

        <p className="mt-3 text-sm leading-7 text-stone-500">
          本页面用于说明 SY Metaphysics 在用户使用风水分析、六爻占问和咨询服务时可能收集的信息、信息用途，以及风水与六爻服务的边界说明。
        </p>

        <div className="mt-10 space-y-6">
          <PolicyBlock
            title="1. Information We Collect"
            zhTitle="1. 我们收集的信息"
            en="When you submit a Feng Shui or Liu Yao request, we may collect your name, email, WeChat, X, Instagram, preferred contact method, consultation intention, notes, and other information you choose to provide."
            zh="当你提交风水或六爻咨询请求时，我们可能会收集你的称呼、邮箱、WeChat、X、Instagram、优先联系方式、咨询意向、补充说明，以及你主动填写的其他信息。"
          />

          <PolicyBlock
            title="2. Feng Shui Request Information"
            zhTitle="2. 风水分析相关信息"
            en="For Feng Shui requests, we may collect home type, facing direction, analysis scope, room type, room purpose, entrance, bedroom, kitchen and bathroom information, main concern, uploaded floor plans, room photos, and related documents."
            zh="针对风水分析请求，我们可能会收集住宅类型、房屋朝向、分析范围、房间类型、房间用途、入户门、卧室、厨房、卫生间信息、主要问题，以及你上传的户型图、房间照片和相关资料。"
          />

          <PolicyBlock
            title="3. Liu Yao Divination Information"
            zhTitle="3. 六爻占问相关信息"
            en="For Liu Yao requests, we may collect your question, question type, gender selection, casting time, time zone, primary hexagram, changed hexagram, changing lines, line details, and background notes for deeper interpretation."
            zh="针对六爻占问请求，我们可能会收集所问之事、问题类型、性别选项、起卦时间、时区、本卦、变卦、动爻、六爻明细，以及用于深度解卦的事情背景补充。"
          />

          <PolicyBlock
            title="4. How We Use Your Information"
            zhTitle="4. 我们如何使用信息"
            en="Your submitted information is used to generate preliminary results, understand your consultation needs, provide follow-up communication, improve the service experience, and prepare deeper paid consultation when requested."
            zh="你提交的信息将用于生成初步结果、理解咨询需求、进行后续沟通、改进服务体验，并在你表达付费咨询意向时用于准备更深入的分析服务。"
          />

          <PolicyBlock
            title="5. Image and Floor Plan Privacy"
            zhTitle="5. 图片与户型图隐私"
            en="Uploaded floor plans, room photos, and home-related images may contain private residential information. They are used only for analysis and consultation follow-up and will not be publicly displayed on the website."
            zh="上传的户型图、房间照片和住宅相关图片可能包含私人居住信息。这些资料仅用于分析和咨询跟进，不会在网站上公开展示。"
          />

          <PolicyBlock
            title="6. Contact and Follow-up"
            zhTitle="6. 联系与后续跟进"
            en="If you leave your contact information, we may follow up through your preferred contact method, such as email, WeChat, X, or Instagram, especially when you request deeper paid consultation."
            zh="如果你留下联系方式，我们可能会根据你选择的优先联系方式进行后续沟通，例如邮箱、WeChat、X 或 Instagram，尤其是在你申请深度付费咨询时。"
          />

          <PolicyBlock
            title="7. Data Storage and Security"
            zhTitle="7. 数据保存与安全"
            en="Submitted form data and uploaded files may be stored in our backend database and file storage service. We take reasonable measures to avoid public exposure of user-submitted private information."
            zh="用户提交的表单数据和上传文件可能会保存在后台数据库和文件存储服务中。我们会采取合理措施，避免用户提交的私人信息被公开暴露。"
          />

          <PolicyBlock
            title="8. Service Disclaimer"
            zhTitle="8. 服务免责声明"
            en="Feng Shui, Liu Yao, and metaphysics readings are provided for cultural, lifestyle, reflective, and spatial guidance. They are not guaranteed predictions and should not replace legal, medical, financial, psychological, or other professional advice."
            zh="风水、六爻和玄学分析主要用于文化体验、生活方式参考、个人反思和空间调整建议，不构成确定性预测，也不能替代法律、医疗、财务、心理或其他专业意见。"
          />

          <PolicyBlock
            title="9. Payment and Paid Consultation"
            zhTitle="9. 付费咨询说明"
            en="Some deeper interpretation features, AI-assisted readings, or one-on-one consultation services may be offered as paid services. Any payment process, price, scope, and deliverables should be confirmed before the paid service begins."
            zh="部分深度解读、AI 辅助解卦或一对一咨询服务可能作为付费服务提供。付费前应确认服务价格、范围、交付内容和沟通方式。"
          />

          <PolicyBlock
            title="10. Data Removal Request"
            zhTitle="10. 数据删除请求"
            en="If you want your submitted information removed, you may contact us and request deletion of your form data, uploaded images, uploaded documents, and consultation records."
            zh="如果你希望删除已经提交的信息，可以联系我们，请求删除你的表单数据、上传图片、上传资料和咨询记录。"
          />

          <PolicyBlock
            title="11. Contact"
            zhTitle="11. 联系方式"
            en="If you have questions about privacy, data removal, or consultation services, please contact us through the contact methods provided on the Contact page."
            zh="如果你对隐私保护、数据删除或咨询服务有任何问题，请通过 Contact 页面提供的方式联系我们。"
          />
        </div>
      </section>
    </main>
  );
}

function PolicyBlock({
  title,
  zhTitle,
  en,
  zh,
}: {
  title: string;
  zhTitle: string;
  en: string;
  zh: string;
}) {
  return (
    <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-1 text-lg text-amber-100">{zhTitle}</p>
      <p className="mt-5 text-sm leading-7 text-stone-300">{en}</p>
      <p className="mt-3 text-sm leading-7 text-stone-500">{zh}</p>
    </section>
  );
}

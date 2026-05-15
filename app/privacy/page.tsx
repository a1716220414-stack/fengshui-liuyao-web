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

        <div className="mt-10 space-y-6">
          <PolicyBlock
            title="1. Information We Collect"
            zhTitle="1. 我们收集的信息"
            en="When you submit a Feng Shui request, we may collect your name, email, WeChat, X, Instagram, preferred contact method, home or room information, uploaded floor plans, room photos, and consultation intention."
            zh="当你提交风水分析请求时，我们可能会收集你的称呼、邮箱、WeChat、X、Instagram、优先联系方式、住宅或房间信息、上传的户型图、房间照片以及咨询意向。"
          />

          <PolicyBlock
            title="2. How We Use Your Information"
            zhTitle="2. 我们如何使用信息"
            en="Your submitted information is used to generate a preliminary report, understand your consultation needs, and follow up if you express interest in deeper analysis."
            zh="你提交的信息将用于生成初步报告、了解你的咨询需求，并在你表达进一步分析意向时进行后续沟通。"
          />

          <PolicyBlock
            title="3. Image and Floor Plan Privacy"
            zhTitle="3. 图片与户型图隐私"
            en="Uploaded floor plans and room photos may contain private home information. They are used only for Feng Shui analysis and consultation follow-up. They will not be displayed publicly on the website."
            zh="上传的户型图和房间照片可能包含私人居住信息。这些资料仅用于风水分析和咨询跟进，不会在网站上公开展示。"
          />

          <PolicyBlock
            title="4. Service Disclaimer"
            zhTitle="4. 服务免责声明"
            en="Feng Shui and metaphysics readings are provided for cultural, lifestyle, reflective, and spatial guidance. They are not guaranteed predictions and should not replace legal, medical, financial, psychological, or other professional advice."
            zh="风水和玄学分析主要用于文化体验、生活方式参考、个人反思和空间调整建议，不构成确定性预测，也不能替代法律、医疗、财务、心理或其他专业意见。"
          />

          <PolicyBlock
            title="5. Data Removal Request"
            zhTitle="5. 数据删除请求"
            en="If you want your submitted information removed, you may contact us and request deletion of your form data and uploaded files."
            zh="如果你希望删除已经提交的信息，可以联系我们，请求删除表单数据和上传文件。"
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
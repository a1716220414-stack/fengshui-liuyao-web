"use client";

import { FormEvent, ReactNode, useState } from "react";

type AdminLeadFile = {
  name: string;
  path: string;
  type: string;
  size: number;
  signedUrl: string;
};

type FengShuiLead = {
  id: string;
  created_at: string;

  name: string | null;
  email: string | null;
  wechat: string | null;
  x_account: string | null;
  instagram: string | null;
  preferred_contact_method: string | null;

  house_type: string | null;
  facing_direction: string | null;
  analysis_scope: string | null;
  target_room_type: string | null;
  target_room_area: string | null;
  room_purpose: string | null;

  main_door_area: string | null;
  bedroom_area: string | null;
  kitchen_area: string | null;
  bathroom_area: string | null;

  main_concern: string | null;
  paid_consultation_interest: string | null;
  notes: string | null;

  uploaded_files: AdminLeadFile[];
};

type LiuYaoLineResult = {
  position?: number;
  positionName?: string;
  coins?: string[];
  sum?: number;
  yinYang?: string;
  changing?: boolean;
  lineName?: string;
  lineNameZh?: string;
};

type LiuYaoLead = {
  id: string;
  created_at: string;

  name: string | null;
  email: string | null;
  wechat: string | null;
  x_account: string | null;
  instagram: string | null;
  preferred_contact_method: string | null;

  seeker_gender: string | null;
  question: string | null;
  question_type: string | null;
  cast_time_local: string | null;
  timezone: string | null;

  primary_hexagram: string | null;
  changed_hexagram: string | null;
  changing_lines: string | null;
  line_results: LiuYaoLineResult[] | null;

  paid_reading_interest: string | null;
  notes: string | null;
};

type ActiveTab = "fengshui" | "liuyao";

export default function AdminLeadsPage() {
  const [password, setPassword] = useState("");
  const [fengshuiLeads, setFengshuiLeads] = useState<FengShuiLead[]>([]);
  const [liuyaoLeads, setLiuyaoLeads] = useState<LiuYaoLead[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>("fengshui");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  async function handleLoadLeads(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsLoading(true);
      setError("");

      const response = await fetch("/api/admin/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Failed to load leads.");
      }

      setFengshuiLeads(result.fengshuiLeads ?? []);
      setLiuyaoLeads(result.liuyaoLeads ?? []);
      setHasLoaded(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load leads.";
      setError(message);
      setFengshuiLeads([]);
      setLiuyaoLeads([]);
      setHasLoaded(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
          Admin / 后台管理
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-6xl">
          Consultation Leads
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-400">
          This page is for internal use only. It displays submitted Feng Shui
          and Liu Yao consultation leads, contact information, consultation
          intention, and uploaded file links.
        </p>

        <form
          onSubmit={handleLoadLeads}
          className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6"
        >
          <label className="block text-sm font-medium text-white">
            Admin Password / 后台密码
          </label>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter admin password"
            className="mt-3 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-300/60"
          />

          {error ? (
            <div className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-5 rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Loading... / 加载中..." : "Load Leads / 查看线索"}
          </button>
        </form>

        {hasLoaded ? (
          <div className="mt-8">
            <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <h2 className="text-2xl font-semibold text-white">
                Submitted Leads / 已提交线索
              </h2>

              <p className="text-sm text-zinc-500">
                Feng Shui: {fengshuiLeads.length} · Liu Yao:{" "}
                {liuyaoLeads.length}
              </p>
            </div>

            <div className="mb-6 grid gap-3 md:grid-cols-2">
              <TabButton
                active={activeTab === "fengshui"}
                title="Feng Shui Leads"
                zhTitle="风水线索"
                count={fengshuiLeads.length}
                onClick={() => setActiveTab("fengshui")}
              />

              <TabButton
                active={activeTab === "liuyao"}
                title="Liu Yao Leads"
                zhTitle="六爻线索"
                count={liuyaoLeads.length}
                onClick={() => setActiveTab("liuyao")}
              />
            </div>

            {activeTab === "fengshui" ? (
              fengshuiLeads.length === 0 ? (
                <EmptyState text="No Feng Shui leads found. / 暂无风水线索。" />
              ) : (
                <div className="space-y-5">
                  {fengshuiLeads.map((lead) => (
                    <FengShuiLeadCard key={lead.id} lead={lead} />
                  ))}
                </div>
              )
            ) : liuyaoLeads.length === 0 ? (
              <EmptyState text="No Liu Yao leads found. / 暂无六爻线索。" />
            ) : (
              <div className="space-y-5">
                {liuyaoLeads.map((lead) => (
                  <LiuYaoLeadCard key={lead.id} lead={lead} />
                ))}
              </div>
            )}
          </div>
        ) : null}
      </section>
    </main>
  );
}

function TabButton({
  active,
  title,
  zhTitle,
  count,
  onClick,
}: {
  active: boolean;
  title: string;
  zhTitle: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-2xl border p-5 text-left transition",
        active
          ? "border-amber-300/40 bg-amber-300/10"
          : "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]",
      ].join(" ")}
    >
      <p className="text-lg font-semibold text-white">{title}</p>
      <p className="mt-1 text-sm text-amber-100">{zhTitle}</p>
      <p className="mt-3 text-sm text-zinc-500">Total: {count}</p>
    </button>
  );
}

function FengShuiLeadCard({ lead }: { lead: FengShuiLead }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <CardHeader
        title={lead.name || "Unnamed Feng Shui Lead"}
        createdAt={lead.created_at}
        badge={lead.paid_consultation_interest || "unknown"}
      />

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <InfoBlock title="Contact / 联系方式">
          <InfoRow label="Email" value={lead.email} />
          <InfoRow label="WeChat" value={lead.wechat} />
          <InfoRow label="X / Twitter" value={lead.x_account} />
          <InfoRow label="Instagram" value={lead.instagram} />
          <InfoRow label="Preferred" value={lead.preferred_contact_method} />
        </InfoBlock>

        <InfoBlock title="Main Request / 主要需求">
          <InfoRow label="Concern" value={lead.main_concern} />
          <InfoRow
            label="Paid Interest"
            value={lead.paid_consultation_interest}
          />
          <InfoRow label="Analysis Scope" value={lead.analysis_scope} />
          <InfoRow label="Target Room" value={lead.target_room_type} />
          <InfoRow label="Room Purpose" value={lead.room_purpose} />
        </InfoBlock>

        <InfoBlock title="Basic Layout / 基础格局">
          <InfoRow label="House Type" value={lead.house_type} />
          <InfoRow label="Facing" value={lead.facing_direction} />
          <InfoRow label="Main Door" value={lead.main_door_area} />
          <InfoRow label="Bedroom" value={lead.bedroom_area} />
          <InfoRow label="Kitchen" value={lead.kitchen_area} />
          <InfoRow label="Bathroom" value={lead.bathroom_area} />
        </InfoBlock>

        <InfoBlock title="Uploaded Files / 上传文件">
          {lead.uploaded_files?.length ? (
            <div className="space-y-2">
              {lead.uploaded_files.map((file) => (
                <div
                  key={file.path}
                  className="rounded-xl border border-white/10 bg-black/20 p-3"
                >
                  <p className="break-all text-sm text-zinc-300">
                    {file.name}
                  </p>

                  <p className="mt-1 text-xs text-zinc-600">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>

                  {file.signedUrl ? (
                    <a
                      href={file.signedUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex text-sm text-amber-200 hover:text-amber-100"
                    >
                      Open file / 打开文件 →
                    </a>
                  ) : (
                    <p className="mt-2 text-sm text-red-300">
                      Failed to create file link.
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-500">No uploaded files.</p>
          )}
        </InfoBlock>
      </div>

      {lead.notes ? <NotesBlock notes={lead.notes} /> : null}
    </article>
  );
}

function LiuYaoLeadCard({ lead }: { lead: LiuYaoLead }) {
  const lineResults = Array.isArray(lead.line_results)
    ? lead.line_results
    : [];

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <CardHeader
        title={lead.name || "Unnamed Liu Yao Lead"}
        createdAt={lead.created_at}
        badge={lead.paid_reading_interest || "unknown"}
      />

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <InfoBlock title="Contact / 联系方式">
          <InfoRow label="Email" value={lead.email} />
          <InfoRow label="WeChat" value={lead.wechat} />
          <InfoRow label="X / Twitter" value={lead.x_account} />
          <InfoRow label="Instagram" value={lead.instagram} />
          <InfoRow label="Preferred" value={lead.preferred_contact_method} />
        </InfoBlock>

        <InfoBlock title="Question / 占问信息">
          <InfoRow label="Question" value={lead.question} />
          <InfoRow label="Type" value={lead.question_type} />
          <InfoRow label="Gender" value={lead.seeker_gender} />
          <InfoRow label="Cast Time" value={lead.cast_time_local} />
          <InfoRow label="Timezone" value={lead.timezone} />
        </InfoBlock>

        <InfoBlock title="Hexagram / 卦象结果">
          <InfoRow label="Primary" value={lead.primary_hexagram} />
          <InfoRow label="Changed" value={lead.changed_hexagram} />
          <InfoRow label="Changing" value={lead.changing_lines} />
          <InfoRow label="Paid Interest" value={lead.paid_reading_interest} />
        </InfoBlock>

        <InfoBlock title="Line Results / 六爻明细">
          {lineResults.length ? (
            <div className="space-y-2">
              {lineResults.map((line, index) => (
                <div
                  key={`${line.position ?? index}-${line.sum ?? "line"}`}
                  className="rounded-xl border border-white/10 bg-black/20 p-3 text-sm"
                >
                  <p className="font-medium text-amber-100">
                    {line.positionName || `Line ${index + 1}`} ·{" "}
                    {line.lineNameZh || line.lineName || "-"}
                    {line.changing ? " · 动爻" : ""}
                  </p>

                  <p className="mt-2 text-xs leading-6 text-zinc-500">
                    Sum: {line.sum ?? "-"} · Yin/Yang: {line.yinYang ?? "-"}
                  </p>

                  {line.coins?.length ? (
                    <p className="mt-1 text-xs leading-6 text-zinc-500">
                      Coins: {line.coins.join(", ")}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-500">No line details.</p>
          )}
        </InfoBlock>
      </div>

      {lead.notes ? <NotesBlock notes={lead.notes} /> : null}
    </article>
  );
}

function CardHeader({
  title,
  createdAt,
  badge,
}: {
  title: string;
  createdAt: string;
  badge: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 md:flex-row md:items-start">
      <div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>

        <p className="mt-2 text-sm text-zinc-500">
          Submitted at: {new Date(createdAt).toLocaleString()}
        </p>
      </div>

      <div className="rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm text-amber-100">
        {badge}
      </div>
    </div>
  );
}

function InfoBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <h4 className="mb-4 font-semibold text-white">{title}</h4>
      {children}
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  return (
    <div className="mb-2 flex gap-3 text-sm">
      <span className="w-32 shrink-0 text-zinc-500">{label}</span>
      <span className="break-all text-zinc-300">{value || "-"}</span>
    </div>
  );
}

function NotesBlock({ notes }: { notes: string }) {
  return (
    <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5">
      <h4 className="font-semibold text-white">Notes / 补充说明</h4>
      <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-zinc-400">
        {notes}
      </p>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-sm text-zinc-400">
      {text}
    </div>
  );
}
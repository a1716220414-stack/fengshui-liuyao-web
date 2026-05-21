import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

type UploadedFile = {
  name: string;
  path: string;
  type: string;
  size: number;
};

type FengShuiLeadWithFiles = {
  uploaded_files?: UploadedFile[] | null;
  [key: string]: unknown;
};

function createSupabaseAdminClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error("Missing Supabase environment variables.");
  }

  return createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

async function addSignedUrlsToFengShuiLeads(
  supabase: ReturnType<typeof createSupabaseAdminClient>,
  leads: FengShuiLeadWithFiles[],
) {
  return Promise.all(
    leads.map(async (lead) => {
      const uploadedFiles = Array.isArray(lead.uploaded_files)
        ? (lead.uploaded_files as UploadedFile[])
        : [];

      const files = await Promise.all(
        uploadedFiles.map(async (file) => {
          const { data: signedData, error: signedError } =
            await supabase.storage
              .from("fengshui-uploads")
              .createSignedUrl(file.path, 60 * 30);

          return {
            ...file,
            signedUrl: signedError ? "" : signedData?.signedUrl ?? "",
          };
        }),
      );

      return {
        ...lead,
        uploaded_files: files,
      };
    }),
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = body.password?.toString() ?? "";

    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        {
          ok: false,
          message: "Missing ADMIN_PASSWORD in environment variables.",
        },
        { status: 500 },
      );
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        {
          ok: false,
          message: "Invalid admin password.",
        },
        { status: 401 },
      );
    }

    const supabase = createSupabaseAdminClient();

    const { data: fengshuiData, error: fengshuiError } = await supabase
      .from("fengshui_leads")
      .select(
        `
        id,
        created_at,
        name,
        email,
        wechat,
        x_account,
        instagram,
        preferred_contact_method,
        house_type,
        facing_direction,
        analysis_scope,
        target_room_type,
        target_room_area,
        room_purpose,
        main_door_area,
        bedroom_area,
        kitchen_area,
        bathroom_area,
        main_concern,
        paid_consultation_interest,
        notes,
        uploaded_files
      `,
      )
      .order("created_at", { ascending: false })
      .limit(100);

    if (fengshuiError) {
      return NextResponse.json(
        {
          ok: false,
          message: `Failed to load Feng Shui leads: ${fengshuiError.message}`,
        },
        { status: 500 },
      );
    }

    const { data: liuyaoData, error: liuyaoError } = await supabase
      .from("liuyao_leads")
      .select(
        `
        id,
        created_at,
        name,
        email,
        wechat,
        x_account,
        instagram,
        preferred_contact_method,
        seeker_gender,
        question,
        question_type,
        cast_time_local,
        timezone,
        primary_hexagram,
        changed_hexagram,
        changing_lines,
        line_results,
        paid_reading_interest,
        notes
      `,
      )
      .order("created_at", { ascending: false })
      .limit(100);

    if (liuyaoError) {
      return NextResponse.json(
        {
          ok: false,
          message: `Failed to load Liu Yao leads: ${liuyaoError.message}`,
        },
        { status: 500 },
      );
    }

    const fengshuiLeads = await addSignedUrlsToFengShuiLeads(
      supabase,
      fengshuiData ?? [],
    );

    return NextResponse.json({
      ok: true,
      fengshuiLeads,
      liuyaoLeads: liuyaoData ?? [],
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error.";

    return NextResponse.json(
      {
        ok: false,
        message,
      },
      { status: 500 },
    );
  }
}

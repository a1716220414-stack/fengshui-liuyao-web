import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

type UploadedFile = {
  name: string;
  path: string;
  type: string;
  size: number;
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = body.password?.toString() ?? "";

    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        {
          ok: false,
          message: "Missing ADMIN_PASSWORD in .env.local.",
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

    const { data, error } = await supabase
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

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          message: error.message,
        },
        { status: 500 },
      );
    }

    const leadsWithSignedFiles = await Promise.all(
      (data ?? []).map(async (lead) => {
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

    return NextResponse.json({
      ok: true,
      leads: leadsWithSignedFiles,
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
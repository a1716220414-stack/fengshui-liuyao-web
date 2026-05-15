import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { FengShuiFormData } from "@/lib/fengshuiReport";

export const runtime = "nodejs";

function getString(formData: FormData, key: keyof FengShuiFormData) {
  return formData.get(key)?.toString() ?? "";
}

function sanitizeFileName(fileName: string) {
  return fileName
    .replace(/[^\w.\-]+/g, "_")
    .replace(/_+/g, "_")
    .slice(0, 120);
}

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
    const formData = await request.formData();
    const supabase = createSupabaseAdminClient();

    const leadForm: FengShuiFormData = {
      name: getString(formData, "name"),
      email: getString(formData, "email"),
      wechat: getString(formData, "wechat"),
      xAccount: getString(formData, "xAccount"),
      instagram: getString(formData, "instagram"),
      preferredContactMethod: getString(formData, "preferredContactMethod"),

      houseType: getString(formData, "houseType"),
      facingDirection: getString(formData, "facingDirection"),

      analysisScope: getString(formData, "analysisScope"),
      targetRoomType: getString(formData, "targetRoomType"),
      targetRoomArea: getString(formData, "targetRoomArea"),
      roomPurpose: getString(formData, "roomPurpose"),

      mainDoorArea: getString(formData, "mainDoorArea"),
      bedroomArea: getString(formData, "bedroomArea"),
      kitchenArea: getString(formData, "kitchenArea"),
      bathroomArea: getString(formData, "bathroomArea"),

      mainConcern: getString(formData, "mainConcern"),
      paidConsultationInterest: getString(
        formData,
        "paidConsultationInterest",
      ),
      notes: getString(formData, "notes"),
    };

    const hasAnyContact =
      leadForm.email.trim() ||
      leadForm.wechat.trim() ||
      leadForm.xAccount.trim() ||
      leadForm.instagram.trim();

    if (!hasAnyContact) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Please provide at least one contact method. / 请至少填写一种联系方式。",
        },
        { status: 400 },
      );
    }

    if (leadForm.email.trim() && !leadForm.email.includes("@")) {
      return NextResponse.json(
        {
          ok: false,
          message: "Please enter a valid email address. / 请填写有效邮箱。",
        },
        { status: 400 },
      );
    }

    const { data: insertedLead, error: insertError } = await supabase
      .from("fengshui_leads")
      .insert({
        name: leadForm.name,
        email: leadForm.email,
        wechat: leadForm.wechat,
        x_account: leadForm.xAccount,
        instagram: leadForm.instagram,
        preferred_contact_method: leadForm.preferredContactMethod,

        house_type: leadForm.houseType,
        facing_direction: leadForm.facingDirection,

        analysis_scope: leadForm.analysisScope,
        target_room_type: leadForm.targetRoomType,
        target_room_area: leadForm.targetRoomArea,
        room_purpose: leadForm.roomPurpose,

        main_door_area: leadForm.mainDoorArea,
        bedroom_area: leadForm.bedroomArea,
        kitchen_area: leadForm.kitchenArea,
        bathroom_area: leadForm.bathroomArea,

        main_concern: leadForm.mainConcern,
        paid_consultation_interest: leadForm.paidConsultationInterest,
        notes: leadForm.notes,

        form_payload: leadForm,
      })
      .select("id")
      .single();

    if (insertError || !insertedLead) {
      return NextResponse.json(
        {
          ok: false,
          message: insertError?.message ?? "Failed to save lead.",
        },
        { status: 500 },
      );
    }

    const files = formData
      .getAll("files")
      .filter((item): item is File => item instanceof File && item.size > 0);

    const uploadedFiles: Array<{
      name: string;
      path: string;
      type: string;
      size: number;
    }> = [];

    for (const file of files) {
      const safeFileName = sanitizeFileName(file.name);
      const filePath = `${insertedLead.id}/${Date.now()}-${safeFileName}`;

      const { error: uploadError } = await supabase.storage
        .from("fengshui-uploads")
        .upload(filePath, file, {
          contentType: file.type || "application/octet-stream",
          upsert: false,
        });

      if (uploadError) {
        return NextResponse.json(
          {
            ok: false,
            message: uploadError.message,
          },
          { status: 500 },
        );
      }

      uploadedFiles.push({
        name: file.name,
        path: filePath,
        type: file.type,
        size: file.size,
      });
    }

    if (uploadedFiles.length > 0) {
      const { error: updateError } = await supabase
        .from("fengshui_leads")
        .update({
          uploaded_files: uploadedFiles,
        })
        .eq("id", insertedLead.id);

      if (updateError) {
        return NextResponse.json(
          {
            ok: false,
            message: updateError.message,
          },
          { status: 500 },
        );
      }
    }

    return NextResponse.json({
      ok: true,
      leadId: insertedLead.id,
      uploadedFiles,
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
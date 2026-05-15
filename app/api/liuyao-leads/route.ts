import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

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

function toStringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = toStringValue(body.name);
    const email = toStringValue(body.email);
    const wechat = toStringValue(body.wechat);
    const xAccount = toStringValue(body.xAccount);
    const instagram = toStringValue(body.instagram);
    const preferredContactMethod = toStringValue(body.preferredContactMethod);

    const seekerGender = toStringValue(body.seekerGender);
    const question = toStringValue(body.question);
    const questionType = toStringValue(body.questionType);
    const castTimeLocal = toStringValue(body.castTimeLocal);
    const timezone = toStringValue(body.timezone);

    const primaryHexagram = toStringValue(body.primaryHexagram);
    const changedHexagram = toStringValue(body.changedHexagram);
    const changingLines = toStringValue(body.changingLines);

    const paidReadingInterest = toStringValue(body.paidReadingInterest);
    const notes = toStringValue(body.notes);

    const lineResults = Array.isArray(body.lineResults)
      ? body.lineResults
      : [];

    if (!question) {
      return NextResponse.json(
        {
          ok: false,
          message: "Question is required. / 请先填写所问之事。",
        },
        { status: 400 },
      );
    }

    if (!castTimeLocal) {
      return NextResponse.json(
        {
          ok: false,
          message: "Casting time is required. / 请填写起卦时间。",
        },
        { status: 400 },
      );
    }

    if (!primaryHexagram) {
      return NextResponse.json(
        {
          ok: false,
          message: "Please complete the hexagram casting first. / 请先完成起卦。",
        },
        { status: 400 },
      );
    }

    const hasAnyContact = email || wechat || xAccount || instagram;

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

    if (email && !email.includes("@")) {
      return NextResponse.json(
        {
          ok: false,
          message: "Please enter a valid email address. / 请填写有效邮箱。",
        },
        { status: 400 },
      );
    }

    const supabase = createSupabaseAdminClient();

    const payload = {
      name,
      email,
      wechat,
      x_account: xAccount,
      instagram,
      preferred_contact_method: preferredContactMethod,

      seeker_gender: seekerGender,
      question,
      question_type: questionType,
      cast_time_local: castTimeLocal,
      timezone,

      primary_hexagram: primaryHexagram,
      changed_hexagram: changedHexagram,
      changing_lines: changingLines,
      line_results: lineResults,

      paid_reading_interest: paidReadingInterest,
      notes,

      form_payload: body,
    };

    const { data, error } = await supabase
      .from("liuyao_leads")
      .insert(payload)
      .select("id")
      .single();

    if (error || !data) {
      return NextResponse.json(
        {
          ok: false,
          message: error?.message ?? "Failed to save Liu Yao lead.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      leadId: data.id,
      message:
        "Your Liu Yao consultation request has been received. / 你的六爻咨询需求已提交。",
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
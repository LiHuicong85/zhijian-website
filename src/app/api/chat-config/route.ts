import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/storage/database/supabase-client";

// chat_config 表可能尚未在用户 Supabase 中创建
// 所有操作做容错处理，表不存在时返回默认值而非报错

const DEFAULT_CONFIG = {
  coze_bot_id: "",
  coze_api_key: "",
  is_enabled: true,
  welcome_message: "您好！我是知践咨询的智能客服。请问有什么可以帮助您的？",
};

function isTableNotFoundError(error: { message?: string; code?: string }): boolean {
  const msg = (error.message || "").toLowerCase();
  return msg.includes("could not find the table") || msg.includes("does not exist") || msg.includes("pgrst205");
}

export async function GET() {
  try {
    const client = getSupabaseClient();
    
    const { data, error } = await client
      .from("chat_config")
      .select("*")
      .maybeSingle();

    if (error) {
      if (isTableNotFoundError(error)) {
        // 表不存在，返回默认配置
        return NextResponse.json({ success: true, data: DEFAULT_CONFIG });
      }
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: data || DEFAULT_CONFIG });
  } catch {
    return NextResponse.json({ success: true, data: DEFAULT_CONFIG });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const client = getSupabaseClient();

    // 检查是否已有配置
    const { data: existing, error: selectError } = await client
      .from("chat_config")
      .select("id")
      .maybeSingle();

    if (selectError) {
      if (isTableNotFoundError(selectError)) {
        return NextResponse.json({ 
          success: false, 
          error: "chat_config 表尚未创建，请先在 Supabase 中执行建表 SQL" 
        }, { status: 400 });
      }
      return NextResponse.json({ success: false, error: selectError.message }, { status: 500 });
    }

    if (existing) {
      // 更新
      const { error } = await client
        .from("chat_config")
        .update({
          coze_bot_id: body.cozeBotId,
          coze_api_key: body.cozeApiKey,
          is_enabled: body.isEnabled,
          welcome_message: body.welcomeMessage,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }
    } else {
      // 创建
      const { error } = await client.from("chat_config").insert({
        coze_bot_id: body.cozeBotId,
        coze_api_key: body.cozeApiKey,
        is_enabled: body.isEnabled,
        welcome_message: body.welcomeMessage,
      });

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, message: "配置已保存" });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

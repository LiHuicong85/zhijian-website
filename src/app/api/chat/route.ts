import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/storage/database/supabase-client";

const COZE_API_URL = "https://api.coze.cn/v1/chat";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { success: false, error: "消息不能为空" },
        { status: 400 }
      );
    }

    // 获取客服配置
    const client = getSupabaseClient();
    const { data: config, error } = await client
      .from("chat_config")
      .select("*")
      .eq("is_enabled", true)
      .maybeSingle();

    // 如果没有配置或配置错误，使用默认回复
    if (error || !config?.coze_bot_id) {
      return NextResponse.json({
        success: true,
        message: "您好，我是知践咨询的智能客服。请问有什么可以帮助您的？您可以咨询：\n1. AI赋能相关服务\n2. 管理咨询服务\n3. 企业内训服务\n4. 沙盘模拟服务\n5. 如何联系我们",
      });
    }

    // 调用Coze API
    const response = await fetch(COZE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.coze_api_key}`,
      },
      body: JSON.stringify({
        bot_id: config.coze_bot_id,
        user_id: "website_user",
        stream: false,
        auto_save_history: true,
        additional_messages: [
          {
            role: "user",
            content: message,
            content_type: "text",
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Coze API error: ${response.status}`);
    }

    const result = await response.json();

    if (result.code !== 0) {
      throw new Error(result.msg || "Coze API error");
    }

    // 轮询获取结果
    const chatId = result.data.chat_id;
    const conversationId = result.data.conversation_id;
    
    let aiMessage = "";
    for (let i = 0; i < 30; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const retrieveResponse = await fetch(
        `${COZE_API_URL}/retrieve?chat_id=${chatId}&conversation_id=${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${config.coze_api_key}`,
          },
        }
      );

      const retrieveResult = await retrieveResponse.json();
      
      if (retrieveResult.data?.status === "completed") {
        // 获取消息列表
        const messagesResponse = await fetch(
          `https://api.coze.cn/v1/messages?chat_id=${chatId}&conversation_id=${conversationId}`,
          {
            headers: {
              Authorization: `Bearer ${config.coze_api_key}`,
            },
          }
        );

        const messagesResult = await messagesResponse.json();
        const assistantMessage = messagesResult.data?.find(
          (msg: { role: string; type: string; content: string }) => msg.role === "assistant" && msg.type === "answer"
        );
        
        if (assistantMessage) {
          aiMessage = assistantMessage.content;
        }
        break;
      }
    }

    if (!aiMessage) {
      aiMessage = "抱歉，AI回复超时。请稍后再试或拨打客服电话：13322459191";
    }

    return NextResponse.json({
      success: true,
      message: aiMessage,
    });
  } catch (error) {
    console.error("处理聊天请求失败:", error);
    return NextResponse.json({
      success: true,
      message: "抱歉，我现在无法回答您的问题。请拨打客服电话：13322459191 联系我们。",
    });
  }
}

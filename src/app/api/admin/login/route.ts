import { NextRequest, NextResponse } from "next/server";

// 管理员账号配置
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "zhijian2024";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // 登录成功
      const response = NextResponse.json({ 
        success: true, 
        message: "登录成功",
        user: { username: ADMIN_USERNAME }
      });
      
      // 设置Cookie
      response.cookies.set("admin_token", "zhijian_logged_in", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24小时
        path: "/",
      });
      
      return response;
    }

    return NextResponse.json(
      { success: false, error: "用户名或密码错误" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "请求错误" },
      { status: 400 }
    );
  }
}

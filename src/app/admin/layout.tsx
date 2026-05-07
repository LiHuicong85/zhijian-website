"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  Settings, 
  Briefcase,
  BookOpen,
  User,
  Tag,
  ChevronLeft,
  ChevronRight,
  LogOut
} from "lucide-react";

const menuItems = [
  { name: "仪表盘", href: "/admin", icon: LayoutDashboard },
  { name: "案例管理", href: "/admin/cases", icon: Briefcase },
  { name: "文章管理", href: "/admin/articles", icon: BookOpen },
  { name: "师资管理", href: "/admin/team", icon: User },
  { name: "分类管理", href: "/admin/categories", icon: Tag },
  { name: "客服配置", href: "/admin/chat", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 排除登录页面
    if (pathname === "/admin/login") {
      setIsLoading(false);
      setIsAuthenticated(false);
      return;
    }
    
    // 检查登录状态
    const loggedIn = localStorage.getItem("adminLoggedIn") === "true";
    setIsAuthenticated(loggedIn);
    setIsLoading(false);
    
    if (!loggedIn) {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminUsername");
    router.push("/admin/login");
  };

  // 登录页面不需要侧边栏
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* 侧边栏 */}
      <aside
        className={`${
          collapsed ? "w-16" : "w-64"
        } bg-slate-900 border-r border-white/5 flex flex-col transition-all duration-300`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-white/5">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="知践咨询" className="h-8 w-auto" />
              <span className="text-white font-semibold">管理后台</span>
            </div>
          )}
          {collapsed && (
            <img src="/logo.png" alt="知践咨询" className="h-8 w-auto mx-auto" />
          )}
        </div>

        {/* 菜单 */}
        <nav className="flex-1 p-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* 折叠按钮 */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-4 border-t border-white/5 text-white/40 hover:text-white transition-colors flex items-center justify-center"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>

        {/* 退出登录 */}
        <div className="p-2 border-t border-white/5">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all w-full ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm">退出登录</span>}
          </button>
        </div>
      </aside>

      {/* 主内容 */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

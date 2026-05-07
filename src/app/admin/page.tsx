"use client";

import { useState, useEffect } from "react";
import { Briefcase, BookOpen, User, Trash2, AlertTriangle } from "lucide-react";

interface Stats {
  team: number;
  cases: number;
  articles: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ team: 0, cases: 0, articles: 0 });
  const [loading, setLoading] = useState(true);
  const [showCleanup, setShowCleanup] = useState(false);
  const [cleanupType, setCleanupType] = useState<string>("");
  const [cleaning, setCleaning] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/cleanup");
      const result = await res.json();
      if (result.success) {
        setStats({
          team: result.data.teamCount || 0,
          cases: result.data.casesCount || 0,
          articles: result.data.articlesCount || 0,
        });
      }
    } catch (error) {
      console.error("获取统计数据失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCleanup = async () => {
    if (!cleanupType) {
      alert("请选择要清除的数据类型");
      return;
    }
    
    if (!confirm(`确定要清除所有 ${cleanupType === "all" ? "数据" : cleanupType === "cases" ? "案例" : cleanupType === "articles" ? "文章" : "师资"} 吗？此操作不可恢复！`)) {
      return;
    }

    setCleaning(true);
    try {
      const res = await fetch("/api/admin/cleanup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: cleanupType, confirm: true }),
      });
      const result = await res.json();
      
      if (result.success) {
        alert(`已清除 ${result.data.deletedCount} 条数据`);
        setShowCleanup(false);
        setCleanupType("");
        fetchStats();
      } else {
        alert(result.error || "清除失败");
      }
    } catch {
      alert("清除失败");
    } finally {
      setCleaning(false);
    }
  };

  const statCards = [
    { name: "师资数量", value: stats.team, icon: User, color: "from-cyan-500 to-blue-500", href: "/admin/team" },
    { name: "案例数量", value: stats.cases, icon: Briefcase, color: "from-emerald-500 to-teal-500", href: "/admin/cases" },
    { name: "文章数量", value: stats.articles, icon: BookOpen, color: "from-violet-500 to-purple-500", href: "/admin/articles" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">仪表盘</h1>
        <button
          onClick={() => setShowCleanup(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors border border-red-500/30"
        >
          <Trash2 className="w-4 h-4" />
          清除历史数据
        </button>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((card) => (
          <a
            key={card.name}
            href={card.href}
            className="glass rounded-2xl p-6 card-hover block"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}
              >
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {loading ? "..." : card.value}
            </div>
            <div className="text-white/50 text-sm">{card.name}</div>
          </a>
        ))}
      </div>

      {/* 系统信息 */}
      <div className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">系统信息</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white/5">
            <div className="text-white/40 text-sm mb-1">当前版本</div>
            <div className="text-white font-medium">v1.0.0</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <div className="text-white/40 text-sm mb-1">数据库</div>
            <div className="text-emerald-400 font-medium">已连接</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <div className="text-white/40 text-sm mb-1">存储服务</div>
            <div className="text-emerald-400 font-medium">已连接</div>
          </div>
        </div>
      </div>

      {/* 清除数据弹窗 */}
      {showCleanup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                清除历史数据
              </h2>
              <button
                onClick={() => { setShowCleanup(false); setCleanupType(""); }}
                className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <p className="text-orange-400 text-sm">
                  警告：清除数据是危险操作，删除后数据无法恢复！
                </p>
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-2">选择数据类型</label>
                <select
                  value={cleanupType}
                  onChange={(e) => setCleanupType(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                >
                  <option value="">请选择...</option>
                  <option value="cases">案例数据</option>
                  <option value="articles">文章数据</option>
                  <option value="team">师资数据</option>
                  <option value="all">全部数据</option>
                </select>
              </div>

              {cleanupType && (
                <div className="p-4 rounded-xl bg-white/5 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">案例数量：</span>
                    <span className="text-white">{stats.cases} 条</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">文章数量：</span>
                    <span className="text-white">{stats.articles} 条</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">师资数量：</span>
                    <span className="text-white">{stats.team} 条</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-white/10">
              <button
                onClick={() => { setShowCleanup(false); setCleanupType(""); }}
                className="px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10"
              >
                取消
              </button>
              <button
                onClick={handleCleanup}
                disabled={!cleanupType || cleaning}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {cleaning ? "清除中..." : "确认清除"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

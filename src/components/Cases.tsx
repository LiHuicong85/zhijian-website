"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, Building2, ShoppingCart, Factory, Briefcase } from "lucide-react";

const industryIcons: Record<string, typeof Factory> = {
  制造业: Factory,
  零售业: ShoppingCart,
  科技业: Building2,
  服务业: Building2,
  金融业: Building2,
};

// 行业主题色映射
const categoryColors: Record<string, string> = {
  制造业: "#3b82f6",
  零售业: "#10b981",
  科技业: "#06b6d4",
  服务业: "#8b5cf6",
  金融业: "#f59e0b",
  互联网: "#ec4899",
  医疗健康: "#14b8a6",
  教育培训: "#6366f1",
  房地产: "#f97316",
  能源化工: "#84cc16",
  物流运输: "#22d3ee",
  农业: "#22c55e",
  文化传媒: "#a855f7",
  餐饮旅游: "#fb923c",
  建筑业: "#78716c",
  政府公共事业: "#0ea5e9",
};

interface Case {
  id: string;
  title: string;
  company: string;
  category: string;
  description: string;
  image_url1: string;
  image_url2: string;
  created_at: string;
}

export function Cases() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const res = await fetch("/api/cases");
      const result = await res.json();
      if (result.success && result.data.length > 0) {
        // 只取前3个案例展示在首页
        setCases(result.data.slice(0, 3));
      }
    } catch (error) {
      console.error("加载案例失败:", error);
    } finally {
      setLoading(false);
    }
  };

  // 如果没有数据，显示空状态
  if (loading) {
    return (
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              成功
              <span className="gradient-text">客户案例</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">加载中...</p>
          </div>
        </div>
      </section>
    );
  }

  // 如果没有案例数据，不显示该区块
  if (cases.length === 0) {
    return null;
  }

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            成功
            <span className="gradient-text">客户案例</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            12年来，我们服务了2000+企业客户，涵盖制造、零售、科技等多个行业
          </p>
        </div>

        {/* 案例卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((caseItem, index) => {
            const IconComponent = industryIcons[caseItem.category] || Briefcase;
            const themeColor = categoryColors[caseItem.category] || "#00d4ff";
            return (
              <div
                key={caseItem.id}
                className="group relative rounded-3xl glass card-hover overflow-hidden category-stripe"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* 顶部行业色条 */}
                <div
                  className="h-1 w-full"
                  style={{ backgroundColor: themeColor }}
                />

                {/* 图片区域 */}
                {(caseItem.image_url1 || caseItem.image_url2) && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={caseItem.image_url1 || caseItem.image_url2}
                      alt={caseItem.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    {/* 分类标签叠加 */}
                    <div className="absolute bottom-4 left-4">
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-sm text-white text-sm font-medium"
                        style={{ backgroundColor: themeColor + "30", borderColor: themeColor + "50", borderWidth: "1px" }}
                      >
                        <IconComponent className="w-4 h-4" />
                        {caseItem.category}
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {/* 如果没有图片，显示分类标签 */}
                  {!caseItem.image_url1 && !caseItem.image_url2 && (
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4"
                      style={{ backgroundColor: themeColor + "15", color: themeColor, borderColor: themeColor + "30", borderWidth: "1px" }}
                    >
                      <IconComponent className="w-4 h-4" />
                      {caseItem.category}
                    </div>
                  )}

                  {/* 标题 */}
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {caseItem.title}
                  </h3>

                  {/* 公司名称 */}
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: themeColor + "20" }}
                    >
                      <Building2 className="w-4 h-4" style={{ color: themeColor }} />
                    </div>
                    <span className="text-white/80 text-sm font-medium">{caseItem.company || '企业客户'}</span>
                  </div>

                  {/* 描述 */}
                  <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-2">
                    {caseItem.description}
                  </p>

                  {/* 链接 */}
                  <Link
                    href="/cases"
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-emerald-400 transition-colors text-sm font-medium group/link"
                  >
                    查看详情
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* 悬停边框 */}
                <div
                  className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-cyan-400/30 transition-colors duration-500 pointer-events-none"
                />
              </div>
            );
          })}
        </div>

        {/* 查看更多 - CTA金色 */}
        <div className="text-center mt-12">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full btn-cta font-semibold transition-all duration-300 group btn-press"
          >
            查看更多案例
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

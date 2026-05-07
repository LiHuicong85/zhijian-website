"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Factory, ShoppingCart, Building2, Briefcase, ArrowRight, Camera, Image as ImageIcon, ChevronLeft, ChevronRight, ChevronDown, X, TrendingUp, Zap, BarChart3 } from "lucide-react";

const defaultIcons: Record<string, typeof Factory> = {
  制造业: Factory,
  零售业: ShoppingCart,
  金融业: Building2,
  互联网: Building2,
  医疗健康: Building2,
  教育培训: Building2,
  房地产: Building2,
  能源化工: Building2,
  物流运输: Building2,
  农业: Building2,
  文化传媒: Camera,
  餐饮旅游: Building2,
  建筑业: Building2,
  政府公共事业: Briefcase,
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
  challenge: string;
  solution: string;
  gradient: string;
  image_url1: string;
  image_url2: string;
  created_at: string;
}

const MAX_VISIBLE_TABS = 5;

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchCases();
  }, []);

  // 点击外部关闭更多下拉
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // 自动滚动
  useEffect(() => {
    if (!scrollRef.current) return;
    
    const startScroll = () => {
      scrollIntervalRef.current = setInterval(() => {
        if (scrollRef.current && !isPaused) {
          const el = scrollRef.current;
          const maxScroll = el.scrollWidth / 2;
          if (el.scrollLeft >= maxScroll - 10) {
            el.scrollLeft = 0;
          } else {
            el.scrollLeft += 4;
          }
        }
      }, 30);
    };

    startScroll();

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [cases, isPaused]);

  const fetchCases = async () => {
    try {
      const res = await fetch("/api/cases");
      const result = await res.json();
      if (result.success) {
        setCases(result.data);
      }
      // 从分类API获取分类列表
      const catRes = await fetch("/api/categories?type=case");
      const catResult = await catRes.json();
      if (catResult.success && catResult.data?.length > 0) {
        setCategories(catResult.data.map((c: {name: string}) => c.name));
      } else {
        // 降级：从数据中提取
        const cats = [...new Set(result.data.map((c: Case) => c.category).filter(Boolean))] as string[];
        setCategories(cats);
      }
    } catch (error) {
      console.error("加载案例失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCases = activeCategory === "all" 
    ? cases 
    : cases.filter(c => c.category === activeCategory);

  // 分配可见标签和更多标签
  const visibleCategories = categories.slice(0, MAX_VISIBLE_TABS);
  const moreCategories = categories.slice(MAX_VISIBLE_TABS);

  const getCategoryIcon = (cat: string) => {
    return defaultIcons[cat] || Building2;
  };

  return (
    <div className="pt-24 page-enter">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[128px]" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              成功
              <span className="gradient-text">客户案例</span>
            </h1>
            <p className="text-xl text-white/70 leading-relaxed mb-8">
              12年来，我们服务了2000+企业客户
              <br />
              以下是部分精选案例展示
            </p>
          </div>
        </div>
      </section>

      {/* Image Gallery Showcase */}
      {cases.length > 0 && (
        <section className="py-12 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800/30" />
          <div className="relative max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm mb-4">
                <Camera className="w-4 h-4" />
                项目实拍
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                真实项目
                <span className="gradient-text">现场记录</span>
              </h2>
              <p className="text-white/50 text-sm">
                每一张图片都是我们服务客户的真实见证
              </p>
            </div>

            {/* 图片画廊 - 丝滑自动滚动 */}
            {(() => {
              const allImages = cases.flatMap((c) => [
                c.image_url1 ? { url: c.image_url1, caption: c.title } : null,
                c.image_url2 ? { url: c.image_url2, caption: c.title } : null,
              ]).filter((x): x is { url: string; caption: string } => Boolean(x));
              
              if (allImages.length === 0) return null;
              
              return (
                <div className="mb-12">
                  <div 
                    className="relative group"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    {/* 左滚动按钮 */}
                    <button
                      onClick={() => {
                        if (scrollRef.current) {
                          scrollRef.current.scrollLeft -= 272;
                        }
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* 右滚动按钮 */}
                    <button
                      onClick={() => {
                        if (scrollRef.current) {
                          scrollRef.current.scrollLeft += 272;
                        }
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* 左渐变遮罩 */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
                    {/* 右渐变遮罩 */}
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />
                    
                    {/* 丝滑滚动容器 */}
                    <div 
                      ref={scrollRef}
                      className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
                      onMouseEnter={() => setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                    >
                      {[...allImages, ...allImages].map((img, idx) => (
                        <div 
                          key={idx}
                          className="flex-shrink-0 w-64 aspect-[4/3] relative group/img rounded-2xl overflow-hidden cursor-pointer"
                          onClick={() => setLightboxImage(img?.url || "")}
                        >
                          <img 
                            src={img?.url || ""} 
                            alt={img?.caption}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                            <p className="text-white text-xs font-medium truncate">{img?.caption}</p>
                          </div>
                          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                            <ImageIcon className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* 图片数量提示 */}
                  <div className="text-center mt-4">
                    <span className="text-white/40 text-sm">
                      共 {allImages.length} 张项目图片 · 鼠标悬停暂停
                    </span>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* Filter & Cases */}
      <section className="py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/30 to-slate-800/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          {/* 动态分类筛选 */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {/* 全部按钮 */}
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeCategory === "all"
                  ? "btn-gradient text-slate-900 shadow-md shadow-cyan-500/20"
                  : "glass text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              全部案例
            </button>

            {/* 动态分类 - 可见部分 */}
            {visibleCategories.map((cat) => {
              const Icon = getCategoryIcon(cat);
              return (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setMoreOpen(false); }}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeCategory === cat
                      ? "btn-gradient text-slate-900 shadow-md shadow-cyan-500/20"
                      : "glass text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat}
                </button>
              );
            })}

            {/* 更多主题下拉 */}
            {moreCategories.length > 0 && (
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 glass text-white/70 hover:text-white hover:bg-white/10 ${
                    moreOpen ? "ring-1 ring-cyan-400/50" : ""
                  }`}
                >
                  更多主题
                  <ChevronDown className={`w-4 h-4 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
                </button>
                {moreOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 rounded-2xl glass-strong border border-white/10 py-2 z-50 shadow-xl">
                    {moreCategories.map((cat) => {
                      const Icon = getCategoryIcon(cat);
                      return (
                        <button
                          key={cat}
                          onClick={() => { setActiveCategory(cat); setMoreOpen(false); }}
                          className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-2.5 transition-colors ${
                            activeCategory === cat
                              ? "text-cyan-400 bg-cyan-500/10"
                              : "text-white/70 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          {cat}
                          {activeCategory === cat && (
                            <X className="w-3 h-3 ml-auto" onClick={(e) => { e.stopPropagation(); setActiveCategory("all"); setMoreOpen(false); }} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCases.map((caseItem) => {
                  const Icon = getCategoryIcon(caseItem.category);
                  const themeColor = categoryColors[caseItem.category] || "#00d4ff";
                  return (
                    <div key={caseItem.id} className="group glass rounded-2xl overflow-hidden hover:bg-white/[0.06] transition-all duration-300 card-hover category-stripe">
                      {/* 顶部行业色条 */}
                      <div className="h-1 w-full" style={{ backgroundColor: themeColor }} />
                      {/* 图片区域 */}
                      <div className="relative h-48 overflow-hidden">
                        {caseItem.image_url1 ? (
                          <img
                            src={caseItem.image_url1}
                            alt={caseItem.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
                            <Icon className="w-12 h-12 text-cyan-400/50" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                            style={{ backgroundColor: themeColor + "25", color: themeColor, borderColor: themeColor + "40", borderWidth: "1px" }}
                          >
                            {caseItem.category}
                          </span>
                        </div>
                      </div>
                      {/* 内容区域 */}
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                          {caseItem.title}
                        </h3>
                        <p className="text-white/60 text-sm mb-4">{caseItem.company}</p>
                        <p className="text-white/60 text-sm line-clamp-3 mb-4">{caseItem.description}</p>
                        <Link
                          href={`/cases/${caseItem.id}`}
                          className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors group/link"
                        >
                          查看详情
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredCases.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-white/40 text-lg">暂无该分类的案例</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={lightboxImage}
            alt="案例图片"
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* CTA - 重新设计 */}
      <section className="py-28 relative overflow-hidden">
        {/* 装饰渐变线 */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/30 to-slate-900/50" />

        <div className="relative max-w-5xl mx-auto px-4">
          {/* 标题 */}
          <div className="text-center mb-14">
            <p className="inline-flex items-center gap-2 text-cyan-400 text-sm font-medium tracking-widest uppercase mb-4">
              <span className="w-8 h-px bg-cyan-400/60" />
              立即行动
              <span className="w-8 h-px bg-cyan-400/60" />
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              成为下一个<span className="gradient-text">成功案例</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              无数企业已通过知践咨询实现数智化突破，下一个就是您
            </p>
          </div>

          {/* 价值主张三列 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "降本增效",
                desc: "平均降低运营成本 30%+",
                color: "text-cyan-400",
                bg: "bg-cyan-400/10",
                border: "border-cyan-400/20",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "快速落地",
                desc: "90天完成数智化改造",
                color: "text-teal-400",
                bg: "bg-teal-400/10",
                border: "border-teal-400/20",
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "业绩倍增",
                desc: "客户平均增长 150%+",
                color: "text-sky-400",
                bg: "bg-sky-400/10",
                border: "border-sky-400/20",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`relative p-6 rounded-2xl ${item.bg} border ${item.border} backdrop-blur-sm hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 group`}
              >
                <div className={`inline-flex p-3 rounded-xl bg-white/5 mb-4 ${item.color}`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:translate-x-1 transition-transform">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA按钮 */}
          <div className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full btn-cta font-semibold text-lg btn-press group"
            >
              预约咨询
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="mt-4 text-white/40 text-sm">
              已有 <span className="text-cyan-400 font-medium">200+</span> 企业选择知践咨询
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

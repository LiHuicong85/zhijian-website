"use client";

import Link from "next/link";
import { Target, Users, RefreshCw, Lightbulb, ChevronLeft, ChevronRight, Clock, Award, CheckCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  avatar_url: string;
  sort_order: number;
}

const honors = [
  { name: "AAA级信用企业", year: "2021" },
  { name: "优秀管理咨询机构", year: "2023" },
  { name: "企业培训十强", year: "2024" },
  { name: "数智化转型优秀服务商", year: "2025" },
];

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [showArrows, setShowArrows] = useState(false);
  const isScrollingEnabled = teamMembers.length > 4;

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const res = await fetch("/api/team");
      const result = await res.json();
      if (result.success) {
        setTeamMembers(result.data);
      }
    } catch (error) {
      console.error("加载师资数据失败:", error);
    } finally {
      setLoading(false);
    }
  };

  // 自动滚动
  useEffect(() => {
    if (!scrollRef.current || !isScrollingEnabled) return;
    
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
  }, [teamMembers, isPaused, isScrollingEnabled]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
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
              关于
              <span className="gradient-text">知践咨询</span>
            </h1>
            <p className="text-xl text-white/60 leading-relaxed mb-8">
              知践咨询，数智化时代企业增长的实战陪跑者。我们始终坚信"只有知践，才有知见"。
            </p>
          </div>
        </div>
      </section>

      {/* 公司简介 */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800/30" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                企业数智化转型的
                <span className="gradient-text">实战陪跑者</span>
              </h2>
              <div className="space-y-6 text-white/80 leading-relaxed">
                <p>
                  知践咨询是一家专注于企业利用AI实现快速增长的实战型咨询机构。12年来，我们深耕企业咨询与培训领域，成功服务超过2000家企业客户。
                </p>
                <p>
                  我们拥有专业的管理咨询团队和AI技术团队，以"只有知践，才有知见"为核心理念，致力于帮助企业解决管理、营销、人才、数字化等领域的实际问题。
                </p>
                <p>
                  在 AI 重塑商业逻辑的今天，企业真正稀缺的不是工具，而是将技术转化为核心生产力的系统能力。我们不提供标准答案，只提供基于您业务场景的定制化解法。
                </p>
              </div>
            </div>
            <div className="glass rounded-3xl p-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Clock, value: "12+", label: "深耕年份" },
                  { icon: Users, value: "2000+", label: "服务客户" },
                  { icon: Award, value: "50+", label: "合伙人团队" },
                  { icon: Target, value: "100%", label: "方案落地" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-6 rounded-2xl bg-white/5">
                    <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                    <div className="text-white/50 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心价值观 */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/30 to-slate-900" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              核心
              <span className="gradient-text">价值观</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "实战导向", desc: "拒绝空谈概念，直击转型核心痛点", icon: Target },
              { title: "客户为本", desc: "360°贴身服务，快速响应客户需求", icon: Users },
              { title: "持续陪伴", desc: "不仅是咨询公司，更是长期战略伙伴", icon: RefreshCw },
              { title: "精益创新", desc: "以最小成本验证最大价值，驱动企业在变局中稳步进化", icon: Lightbulb },
            ].map((value) => (
              <div key={value.title} className="text-center p-8 rounded-3xl glass card-hover cursor-default">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-white/60">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 核心师资介绍 */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800/30" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              核心
              <span className="gradient-text">师资介绍</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              50+合伙人团队，来自各行业顶尖企业，拥有10年以上丰富的实战经验
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
            </div>
          ) : isScrollingEnabled ? (
            <div 
              className="relative"
              onMouseEnter={() => { setIsPaused(true); setShowArrows(true); }}
              onMouseLeave={() => { setIsPaused(false); setShowArrows(false); }}
            >
              {/* 左箭头 */}
              <button
                onClick={() => handleScroll("left")}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-slate-800/90 border border-white/20 flex items-center justify-center text-white hover:bg-cyan-500/80 transition-all duration-300 ${showArrows ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              {/* 滚动容器 */}
              <div
                ref={scrollRef}
                className="flex gap-8 overflow-x-auto scrollbar-hide pb-4 px-2"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {/* 复制一份用于无缝滚动 */}
                {[...teamMembers, ...teamMembers].map((member, index) => (
                  <div 
                    key={`${member.id}-${index}`}
                    className="flex-shrink-0 w-72 text-center p-8 rounded-3xl glass card-hover"
                  >
                    {member.avatar_url ? (
                      <div className="w-24 h-24 rounded-full mx-auto mb-6 overflow-hidden border-2 border-cyan-500/30">
                        <img 
                          src={member.avatar_url} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 mx-auto mb-6 flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">{member.name[0]}</span>
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-cyan-400 text-sm mb-3">{member.role}</p>
                    <p className="text-white/50 text-sm">{member.description}</p>
                  </div>
                ))}
              </div>
              
              {/* 右箭头 */}
              <button
                onClick={() => handleScroll("right")}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-slate-800/90 border border-white/20 flex items-center justify-center text-white hover:bg-cyan-500/80 transition-all duration-300 ${showArrows ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="text-center p-8 rounded-3xl glass card-hover">
                  {member.avatar_url ? (
                    <div className="w-24 h-24 rounded-full mx-auto mb-6 overflow-hidden border-2 border-cyan-500/30">
                      <img 
                        src={member.avatar_url} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 mx-auto mb-6 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">{member.name[0]}</span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-cyan-400 text-sm mb-3">{member.role}</p>
                  <p className="text-white/50 text-sm">{member.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 荣誉资质 */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/30 to-slate-900" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              荣誉
              <span className="gradient-text">资质</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {honors.map((honor) => (
              <div key={honor.name} className="p-6 rounded-2xl glass text-center card-hover">
                <Award className="w-10 h-10 text-amber-400 mx-auto mb-4" />
                <h3 className="text-white font-medium mb-2">{honor.name}</h3>
                <p className="text-white/40 text-sm">{honor.year}年</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800/50" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            开启您的<span className="gradient-text">数智化增长之旅</span>
          </h2>
          <p className="text-white/50 mb-8">
            选择知践，不仅是选择一家咨询公司，更是选择一个懂业务、能落地、可沉淀的长期伙伴
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full btn-gradient text-slate-900 font-semibold text-lg"
          >
            立即咨询
          </Link>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Brain, 
  Sparkles,
  Trophy,
  Wrench,
  ArrowRight,
  Zap,
  Target,
  Shield,
  Award,
  CheckCircle,
  Phone,
  BookOpen,
  Lightbulb,
  Users,
  BadgeCheck,
  ScrollText,
  Layers,
  GraduationCap,
  TrendingUp,
  UsersRound,
  BarChart3
} from "lucide-react";

const aiProducts = [
  {
    id: "scene-training",
    icon: Brain,
    title: "AI场景实训",
    subtitle: "学用闭环 · 即学即用",
    number: "01",
    color: "cyan",
    pain: "不会用、不敢用、学用脱节",
    description: "针对员工\"不会用、不敢用、学用脱节\"、培训转化率低、提示词设计难及工作流搭建门槛高等痛点，采用\"场景拆解-提示词工程-工作流搭建-实战复盘\"的训战模式，打通学练用闭环，快速提升员工AI工具链应用与业务实战能力。",
    value: "打通学练用闭环，让员工从\"知道AI\"到\"会用AI\"再到\"用好AI\"，培训转化率提升5倍",
    steps: [
      { icon: Target, text: "场景拆解" },
      { icon: Lightbulb, text: "提示词工程" },
      { icon: Layers, text: "工作流搭建" },
      { icon: CheckCircle, text: "实战复盘" },
    ],
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: "tool-practice",
    icon: Wrench,
    title: "AI工具实战",
    subtitle: "技巧进阶 · 产能跃升",
    number: "02",
    color: "emerald",
    pain: "工具多但用不深、产出质量低",
    description: "系统讲授主流生成式AI工具的高阶应用技巧，覆盖内容创作、视觉设计、数据分析、代码编程等核心职能，实现单人产能与内容质量的规模化跃升。",
    value: "一个人干十个人的活，从基础操作到高阶技巧全覆盖，让每个工具都发挥最大价值",
    steps: [
      { icon: BookOpen, text: "内容创作" },
      { icon: Sparkles, text: "视觉设计" },
      { icon: Brain, text: "数据分析" },
      { icon: ScrollText, text: "代码编程" },
    ],
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "topic-empower",
    icon: Sparkles,
    title: "AI专题赋能",
    subtitle: "垂直场景 · 深度赋能",
    number: "03",
    color: "violet",
    pain: "通用培训不解决实际问题",
    description: "聚焦党建、营销、人力资源、财税、法务、生产、采购、物流、研发等核心职能领域，针对行业与业务特性定制专项AI解决方案与实战课程，破解垂直场景应用瓶颈，实现职能提效与业务深度赋能。",
    value: "每个岗位都有专属AI方案，不教通用套路，只解决你所在岗位的真实问题",
    steps: [
      { icon: Sparkles, text: "营销赋能" },
      { icon: Users, text: "HR赋能" },
      { icon: Shield, text: "财税赋能" },
      { icon: Wrench, text: "更多专题" },
    ],
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: "certification",
    icon: Trophy,
    title: "AI资格认证",
    subtitle: "权威认证 · 人才标准",
    number: "04",
    color: "orange",
    pain: "人才能力无标准、执业无资格",
    description: "联合工信部教考中心及权威机构，开展人工智能应用工程师等国家级职业资格培训与认证，为企业定向输送具备标准化AI实战能力的专业人才。",
    value: "国家级职业资格认证，为企业人才能力提供可量化、可认可的标准，让AI人才选拔有据可依",
    steps: [
      { icon: BadgeCheck, text: "工信部认证" },
      { icon: Award, text: "各类AI工程师" },
      { icon: Brain, text: "AI职业资格" },
      { icon: CheckCircle, text: "考前攻坚辅导" },
    ],
    gradient: "from-orange-500 to-amber-600",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; glow: string; light: string; tag: string }> = {
  cyan: { bg: "bg-cyan-500", text: "text-cyan-400", border: "border-cyan-500/30", glow: "shadow-cyan-500/20", light: "bg-cyan-500/10", tag: "bg-cyan-500/15 border-cyan-500/25" },
  emerald: { bg: "bg-emerald-500", text: "text-emerald-400", border: "border-emerald-500/30", glow: "shadow-emerald-500/20", light: "bg-emerald-500/10", tag: "bg-emerald-500/15 border-emerald-500/25" },
  violet: { bg: "bg-violet-500", text: "text-violet-400", border: "border-violet-500/30", glow: "shadow-violet-500/20", light: "bg-violet-500/10", tag: "bg-violet-500/15 border-violet-500/25" },
  orange: { bg: "bg-orange-500", text: "text-orange-400", border: "border-orange-500/30", glow: "shadow-orange-500/20", light: "bg-orange-500/10", tag: "bg-orange-500/15 border-orange-500/25" },
};

export default function AIPage() {
  const [activeTab, setActiveTab] = useState(0);
  const activeProduct = aiProducts[activeTab];

  return (
    <div className="pt-24 page-enter">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[128px]" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass tech-border mb-6">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-white/80">从入门到精通 · 全面提升AI应用能力</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="gradient-text">赋能培训</span>
              <br />
              让AI成为团队的超能力
            </h1>
            <p className="text-xl text-white/60 leading-relaxed mb-10">
              四大培训产品矩阵，覆盖AI认知、技能、工具、认证全链条
              <br />
              实战派师资+场景化教学+效果导向评估
            </p>
          </div>

          {/* Hero下方 - 培训数据亮点 */}
          <div className="max-w-5xl mx-auto mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: GraduationCap, num: "500+", label: "已培训企业", color: "cyan" },
                { icon: UsersRound, num: "10000+", label: "参训学员", color: "emerald" },
                { icon: TrendingUp, num: "95%", label: "满意度", color: "violet" },
                { icon: BarChart3, num: "5倍", label: "效率提升", color: "orange" },
              ].map((stat, i) => (
                <div key={i} className="relative p-5 rounded-2xl glass tech-border text-center group hover:border-white/20 transition-all duration-300">
                  <stat.icon className={`w-8 h-8 ${colorMap[stat.color as keyof typeof colorMap].text} mx-auto mb-3`} />
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.num}</div>
                  <div className="text-white/40 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 培训产品 - Tab切换 */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800/30" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              四大
              <span className="gradient-text">赋能培训</span>
              产品
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              针对企业AI人才培养的不同需求，提供定制化培训解决方案
            </p>
          </div>

          {/* Tab按钮 */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {aiProducts.map((product, index) => (
              <button
                key={product.id}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === index
                    ? `${colorMap[product.color].bg} text-white shadow-lg ${colorMap[product.color].glow}`
                    : "glass border border-white/10 text-white/60 hover:text-white hover:border-white/25"
                }`}
              >
                <product.icon className="w-4 h-4" />
                {product.title}
              </button>
            ))}
          </div>

          {/* Tab内容 */}
          <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
            {/* 顶部渐变条 */}
            <div className={`h-1 bg-gradient-to-r ${activeProduct.gradient}`} />
            
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                {/* 左侧：序号 + 图标 + 标题 + 痛点 + 描述 */}
                <div className="flex flex-col gap-6">
                  {/* 大号序号 + 标题 */}
                  <div>
                    <div className="relative inline-block mb-4">
                      <span className={`text-8xl font-black ${colorMap[activeProduct.color].text} opacity-10 leading-none select-none`}>
                        {activeProduct.number}
                      </span>
                      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl ${colorMap[activeProduct.color].bg} flex items-center justify-center shadow-lg ${colorMap[activeProduct.color].glow}`}>
                        <activeProduct.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {activeProduct.title}
                    </h3>
                    <p className={`text-xl ${colorMap[activeProduct.color].text} font-medium`}>
                      {activeProduct.subtitle}
                    </p>
                  </div>

                  {/* 痛点标签 */}
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${colorMap[activeProduct.color].tag} border w-fit`}>
                    <span className={`${colorMap[activeProduct.color].text} text-sm font-medium`}>痛点：{activeProduct.pain}</span>
                  </div>

                  {/* 描述 */}
                  <p className="text-white/60 leading-relaxed text-base">
                    {activeProduct.description}
                  </p>
                </div>

                {/* 右侧：核心价值 + 训战路径 + 适配场景 */}
                <div className="flex flex-col gap-6">
                  {/* 核心价值 */}
                  <div className={`p-6 rounded-2xl ${colorMap[activeProduct.color].light} border ${colorMap[activeProduct.color].border}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Target className={`w-5 h-5 ${colorMap[activeProduct.color].text}`} />
                      <span className="text-white font-semibold">核心价值</span>
                    </div>
                    <p className={`text-base leading-relaxed ${colorMap[activeProduct.color].text} font-medium`}>{activeProduct.value}</p>
                  </div>

                  {/* 训战路径 */}
                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-5 font-medium">训战路径</p>
                    <div className="grid grid-cols-2 gap-4">
                      {activeProduct.steps.map((step, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl ${colorMap[activeProduct.color].bg} flex items-center justify-center flex-shrink-0`}>
                            <step.icon className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-white/70 text-sm font-medium">{step.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 适配场景标签 + 获取方案 */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {activeProduct.steps.map((step, i) => (
                        <span key={i} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${colorMap[activeProduct.color].tag} border text-white/60`}>
                          {step.text}
                        </span>
                      ))}
                    </div>
                    <Link
                      href="/contact"
                      className={`inline-flex items-center gap-2 ${colorMap[activeProduct.color].text} hover:text-white transition-colors group/link text-sm font-semibold whitespace-nowrap ml-4`}
                    >
                      获取方案
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 底部快速导航点 */}
          <div className="flex justify-center gap-3 mt-8">
            {aiProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeTab === index
                    ? `${colorMap[aiProducts[index].color].bg} w-8`
                    : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 服务优势 */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/30 to-slate-800/50" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              培训服务
              <span className="gradient-text">核心优势</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "实战导向", desc: "不玩虚的，干货满满" },
              { icon: Target, title: "精准对接", desc: "深入调研，量身定制" },
              { icon: Award, title: "权威认证", desc: "专业资质，品质保障" },
              { icon: CheckCircle, title: "效果可见", desc: "训后跟踪，持续辅导" },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 rounded-2xl glass">
                <div className={`w-14 h-14 rounded-full ${colorMap[['cyan', 'emerald', 'violet', 'orange'][index] as keyof typeof colorMap].bg} bg-opacity-20 flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`w-7 h-7 ${colorMap[['cyan', 'emerald', 'violet', 'orange'][index] as keyof typeof colorMap].text}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/50 to-slate-900" />
        <div className="relative max-w-5xl mx-auto px-4">
          <div className="relative p-12 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-violet-500/10 rounded-3xl" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  开启团队
                  <span className="gradient-text">AI赋能</span>
                  之旅
                </h2>
                <p className="text-white/60">专业培训团队提供从需求诊断到效果评估的全流程服务</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full btn-cta font-semibold whitespace-nowrap btn-press"
                >
                  获取方案
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="tel:13322459191"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass border border-white/20 text-white hover:bg-white/10 transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4" />
                  13322459191
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

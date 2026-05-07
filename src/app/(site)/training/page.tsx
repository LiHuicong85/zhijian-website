"use client";

import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles,
  TrendingUp,
  Users,
  AlertTriangle,
  Lightbulb,
  Target,
  Award,
  CheckCircle,
  Rocket,
  Brain,
  Shield,
  Phone,
  Compass,
  Handshake,
  Eye,
  Flame
} from "lucide-react";

const services = [
  {
    id: "ai-innovation",
    icon: Lightbulb,
    title: "AI商业创新",
    subtitle: "洞察 · 重构 · 突破",
    keyword: "AI-Driven Business Innovation",
    color: "cyan",
    gradient: "from-cyan-600 to-blue-700",
    glowColor: "bg-cyan-500/20",
    description: "依托AI市场洞察与趋势推演技术，辅助企业重构产品矩阵与服务链路，挖掘差异化竞争机会，孵化第二增长曲线。",
    value: "帮您找到下一个增长点，让创新不再是碰运气，而是有据可依的战略选择",
    features: [
      { icon: Brain, text: "AI市场洞察与趋势推演" },
      { icon: Target, text: "产品矩阵与服务链路重构" },
      { icon: TrendingUp, text: "挖掘差异化竞争机会" },
      { icon: Rocket, text: "孵化第二增长曲线" },
    ],
    scenario: "寻求业务创新突破、探索新增长点的企业",
    process: ["市场扫描", "机会评估", "方案设计", "试点验证", "规模推广"],
  },
  {
    id: "marketing-growth",
    icon: TrendingUp,
    title: "AI营销增长",
    subtitle: "获客 · 转化 · 跃升",
    keyword: "AI-Powered Marketing Growth",
    color: "emerald",
    gradient: "from-emerald-600 to-teal-700",
    glowColor: "bg-emerald-500/20",
    description: `搭建"AI内容工厂-智能分发-线索培育-自动转化"全链路营销系统，通过数据驱动的个性化触达与策略迭代，实现获客成本降低与转化率跃升。`,
    value: "让客户主动找上门，花更少的钱获得更多高质量客户，营销ROI显著提升",
    features: [
      { icon: Sparkles, text: "AI内容工厂智能化生产" },
      { icon: Target, text: "智能分发与精准触达" },
      { icon: Users, text: "线索培育自动化管理" },
      { icon: CheckCircle, text: "数据驱动策略迭代" },
    ],
    scenario: "营销效率待提升、获客成本高的企业",
    process: ["链路诊断", "系统搭建", "内容启动", "数据闭环", "持续迭代"],
  },
  {
    id: "team-building",
    icon: Users,
    title: "AI梯队建设",
    subtitle: "选才 · 育才 · 适配",
    keyword: "AI-Enabled Talent Development",
    color: "violet",
    gradient: "from-violet-600 to-purple-700",
    glowColor: "bg-violet-500/20",
    description: `引入AI人才画像、智能测评与自适应学习路径等数字化工具，重构"选育"全流程，显著提升人才选拔精准度、培养效能与人岗匹配效率，打造敏捷迭代的数字化人才梯队。`,
    value: "找到对的人，培养对的人，让人才梯队成为企业最坚实的增长底座",
    features: [
      { icon: Brain, text: "AI人才画像精准描绘" },
      { icon: Award, text: "智能测评与能力评估" },
      { icon: Target, text: "自适应学习路径规划" },
      { icon: CheckCircle, text: "人岗匹配效率提升" },
    ],
    scenario: "人才管理效率待提升、梯队建设薄弱的企业",
    process: ["人才盘点", "画像建模", "测评体系", "培养路径", "动态优化"],
  },
  {
    id: "employment-risk",
    icon: AlertTriangle,
    title: "AI用工风控",
    subtitle: "合规 · 预警 · 保障",
    keyword: "AI-Powered Employment Risk Control",
    color: "orange",
    gradient: "from-orange-600 to-amber-700",
    glowColor: "bg-orange-500/20",
    description: "针对劳动法规迭代快、合同审查易疏漏、合规监控盲区多及劳动争议取证难等痛点，提供招聘合规、用工风险、操作行为等全链路监测与预警服务，保障组织稳健运行。",
    value: "让企业用工没有后顾之忧，风险早知道、早防范、早解决",
    features: [
      { icon: Shield, text: "劳动法规动态追踪" },
      { icon: CheckCircle, text: "合同审查智能辅助" },
      { icon: AlertTriangle, text: "合规监控全链路覆盖" },
      { icon: Users, text: "劳动争议快速取证" },
    ],
    scenario: "用工规模大、合规要求高的企业",
    process: ["风险扫描", "体系诊断", "方案部署", "监控预警", "持续运维"],
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; light: string; tag: string }> = {
  cyan: { bg: "bg-cyan-500", text: "text-cyan-400", border: "border-cyan-500/30", light: "bg-cyan-500/10", tag: "bg-cyan-500/10" },
  emerald: { bg: "bg-emerald-500", text: "text-emerald-400", border: "border-emerald-500/30", light: "bg-emerald-500/10", tag: "bg-emerald-500/10" },
  violet: { bg: "bg-violet-500", text: "text-violet-400", border: "border-violet-500/30", light: "bg-violet-500/10", tag: "bg-violet-500/10" },
  orange: { bg: "bg-orange-500", text: "text-orange-400", border: "border-orange-500/30", light: "bg-orange-500/10", tag: "bg-orange-500/10" },
};

export default function TrainingPage() {
  return (
    <div className="pt-24 page-enter">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[128px]" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-white/80 text-sm">4大商业陪跑项目 · 贴身服务企业成长</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="gradient-text">商业陪跑</span>
              <br />
              <span className="text-white">与您并肩作战</span>
            </h1>
            <p className="text-xl text-white/60 leading-relaxed mb-8">
              不是旁观者，是并肩作战的伙伴
              <br />
              从战略到执行，全程陪跑，助您突破增长瓶颈
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full btn-cta font-semibold text-lg btn-press"
              >
                获取陪跑方案
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 陪跑理念 */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800/30" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Compass, title: "战略先行", desc: "从顶层设计到一线执行，确保方向正确", color: "cyan" },
              { icon: Handshake, title: "深度陪跑", desc: "驻场式贴身服务，不是指导而是共创", color: "emerald" },
              { icon: Eye, title: "数据驱动", desc: "全程数据可量化，效果看得见摸得着", color: "violet" },
              { icon: Flame, title: "持续迭代", desc: "基于业务变化持续优化，长期价值交付", color: "orange" },
            ].map((item, index) => (
              <div key={index} className="text-center p-8 rounded-2xl glass group hover:bg-white/[0.06] transition-all duration-300">
                <div className={`w-16 h-16 rounded-2xl ${colorMap[item.color].bg} flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 四大陪跑项目 - 全宽沉浸式 */}
      <section className="relative">
        <div className="absolute inset-0 bg-slate-900" />
        
        <div className="relative">
          {/* 标题 */}
          <div className="max-w-7xl mx-auto px-4 pt-20 pb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              四大商业<span className="gradient-text">陪跑</span>项目
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              针对企业核心诉求量身定制，全流程贴身服务，确保方案落地见效
            </p>
          </div>

          {/* 垂直时间线布局 */}
          <div className="max-w-7xl mx-auto px-4 pb-24">
            <div className="relative">
              {/* 中心时间线 */}
              <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 via-violet-500/50 to-orange-500/50" />

              {services.map((service, index) => (
                <div key={service.id} className="relative mb-16 last:mb-0">
                  {/* 时间线节点 */}
                  <div className={`absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full ${colorMap[service.color].bg} flex items-center justify-center z-10 shadow-lg ring-4 ring-slate-900`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* 内容卡片 - 交替左右 */}
                  <div className={`ml-20 md:ml-0 ${index % 2 === 0 ? 'md:pr-[calc(50%+3rem)]' : 'md:pl-[calc(50%+3rem)] md:text-left'}`}>
                    <div className={`relative rounded-3xl overflow-hidden border border-white/[0.08] ${index % 2 === 0 ? '' : ''}`}>
                      {/* 顶部渐变条 */}
                      <div className={`h-1.5 bg-gradient-to-r ${service.gradient}`} />
                      
                      <div className="bg-white/[0.03] backdrop-blur-sm p-8 md:p-10">
                        {/* 标题行 */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`w-12 h-12 rounded-xl ${colorMap[service.color].bg} flex items-center justify-center flex-shrink-0`}>
                            <service.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white">{service.title}</h3>
                            <p className={`text-sm ${colorMap[service.color].text} font-medium`}>{service.subtitle}</p>
                          </div>
                        </div>

                        {/* 描述 */}
                        <p className="text-white/60 leading-relaxed mb-6 text-base">
                          {service.description}
                        </p>

                        {/* 核心价值 */}
                        <div className={`p-5 rounded-2xl ${colorMap[service.color].light} border ${colorMap[service.color].border} mb-6`}>
                          <div className="flex items-center gap-2 mb-2">
                            <Target className={`w-4 h-4 ${colorMap[service.color].text}`} />
                            <span className="text-white text-sm font-semibold">核心价值</span>
                          </div>
                          <p className={`${colorMap[service.color].text} font-medium text-sm leading-relaxed`}>{service.value}</p>
                        </div>

                        {/* 功能点 + 陪跑路径 双列 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* 功能点 */}
                          <div>
                            <p className="text-white/40 text-xs uppercase tracking-widest mb-4 font-medium">核心能力</p>
                            <div className="space-y-3">
                              {service.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-lg ${colorMap[service.color].bg} flex items-center justify-center flex-shrink-0`}>
                                    <feature.icon className="w-4 h-4 text-white" />
                                  </div>
                                  <span className="text-white/70 text-sm">{feature.text}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 陪跑路径 */}
                          <div>
                            <p className="text-white/40 text-xs uppercase tracking-widest mb-4 font-medium">陪跑路径</p>
                            <div className="space-y-3">
                              {service.process.map((step, i) => (
                                <div key={i} className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0`}>
                                    <span className={`text-xs font-bold ${colorMap[service.color].text}`}>0{i + 1}</span>
                                  </div>
                                  <span className="text-white/70 text-sm">{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* 底部：适用场景 + 获取方案 */}
                        <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-white/30 text-xs">适用：</span>
                            <span className="text-white/50 text-xs">{service.scenario}</span>
                          </div>
                          <Link
                            href="/contact"
                            className={`inline-flex items-center gap-1.5 ${colorMap[service.color].text} hover:text-white transition-colors group/link text-sm font-semibold`}
                          >
                            获取方案
                            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800/30" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="p-12 rounded-3xl glass border border-white/[0.08]">
            <h2 className="text-3xl font-bold text-white mb-4">
              开启您的<span className="gradient-text">商业陪跑</span>之旅
            </h2>
            <p className="text-white/60 mb-8">
              专业团队全程陪跑，与您并肩作战，共同见证企业成长
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full btn-cta font-semibold text-lg btn-press"
              >
                获取陪跑方案
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:13322459191"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all"
              >
                <Phone className="w-5 h-5" />
                电话咨询：13322459191
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

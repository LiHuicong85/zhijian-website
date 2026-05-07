"use client";

import Link from "next/link";
import { Phone, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 border-t border-white/5">
      {/* 装饰元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8">
            <img src="/logo.png" alt="知践咨询" className="h-16 w-auto mx-auto" />
          </div>

          {/* 公司简介 */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-4"><span className="gradient-text">深刻体会</span></h3>
            <p className="text-white/70 text-sm leading-relaxed max-w-2xl mx-auto mb-4">
              在这个被AI重塑的时代，我们始终坚信"只有知践，才有知见"。
              历经实战我们深知，企业真正稀缺的并非工具，而是将技术转化为生产力的系统能力。
              摒弃概念堆砌，直击转化瓶颈，助您在业务中沉淀核心壁垒。 
            </p>
          </div>

          {/* 联系方式 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center p-6 rounded-2xl glass">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center mb-4">
                <Phone className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-white/40 text-sm mb-1">联系电话</div>
              <div className="text-white font-medium">13322459191</div>
              <div className="text-white/50 text-sm mt-1">联系人：李老师</div>
            </div>

            <div className="flex flex-col items-center p-6 rounded-2xl glass">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-white/40 text-sm mb-1">公司地址</div>
              <div className="text-white text-sm text-center">
                沈阳市和平区长白街道<br />
                和盛巷6甲万科中心写字间2110室
              </div>
            </div>

            <div className="flex flex-col items-center p-6 rounded-2xl glass">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-white/40 text-sm mb-1">工作时间</div>
              <div className="text-white text-sm">周一至周五 9:00-17:00</div>
              <div className="text-white/50 text-sm mt-1">节假日除外</div>
            </div>
          </div>

          {/* 快速链接 */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <Link href="/about" className="text-white/60 hover:text-cyan-400 text-sm transition-colors">关于知践</Link>
            <Link href="/consulting" className="text-white/60 hover:text-cyan-400 text-sm transition-colors">数智转型</Link>
            <Link href="/ai" className="text-white/60 hover:text-cyan-400 text-sm transition-colors">赋能培训</Link>
            <Link href="/training" className="text-white/60 hover:text-cyan-400 text-sm transition-colors">商业陪跑</Link>
            <Link href="/cases" className="text-white/60 hover:text-cyan-400 text-sm transition-colors">客户案例</Link>
            <Link href="/wiki" className="text-white/60 hover:text-cyan-400 text-sm transition-colors">知践百科</Link>
            <Link href="/contact" className="text-white/60 hover:text-cyan-400 text-sm transition-colors">联系我们</Link>
          </div>

          {/* 版权 */}
          <div className="pt-8 border-t border-white/10">
            <p className="text-white/30 text-sm">
              © 2024 知践咨询. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

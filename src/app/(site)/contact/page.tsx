"use client";

import { Phone, MapPin, Clock, MessageSquare } from "lucide-react";

// 地图图片URL
const MAP_IMAGE_URL = "https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2F%E5%9C%B0%E5%9B%BE.png&nonce=c31b6482-dd40-48bf-9658-f17a41a12db6&project_id=7626409623968415753&sign=8d8e484a07e3d78521106cdda1a2c65bf3785e3d14a3e5a0e6a3aa4843c516dd";

// 二维码图片URL
const QR_CODE_URL = "https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2F%E4%BA%8C%E7%BB%B4%E7%A0%81.png&nonce=22993567-7469-4e75-9a82-8828b2f939f7&project_id=7626409623968415753&sign=154da14b0beaf25673cddc23e7aecbb16fadc8e0c8d4a2d5eb471722c90a18b0";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Phone,
      title: "联系电话",
      content: "13322459191",
      subContent: "联系人：李老师",
      action: "tel:13322459191",
    },
    {
      icon: MapPin,
      title: "公司地址",
      content: "沈阳市和平区长白街道",
      subContent: "和盛巷6甲万科中心写字间2110室",
    },
    {
      icon: Clock,
      title: "工作时间",
      content: "周一至周五 9:00-17:00",
      subContent: "节假日除外",
    },
  ];

  return (
    <div className="pt-24 page-enter">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[128px]" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">联系我们</span>
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              开启您的数智化增长之旅
              <br />
              期待与您深入交流
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Map */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800/30" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-8">
                联系方式
              </h2>
              <div className="space-y-8">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-sm text-white/40 mb-1">{info.title}</div>
                      {info.action ? (
                        <a 
                          href={info.action}
                          className="text-lg text-white font-medium hover:text-cyan-400 transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <div className="text-lg text-white font-medium">{info.content}</div>
                      )}
                      {info.subContent && (
                        <div className="text-white/50 text-sm mt-1">{info.subContent}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WeChat QR Code */}
              <div className="mt-12">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-xl font-bold text-white">扫码关注我们</h3>
                </div>
                <div className="flex gap-6">
                  <div className="p-4 rounded-2xl glass">
                    <div className="w-40 h-40 rounded-xl bg-white/5 flex items-center justify-center mb-3 overflow-hidden">
                      <img 
                        src="/qrcode_official.jpg" 
                        alt="官方公众号二维码"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-center text-white/60 text-sm">官方公众号</p>
                  </div>
                  <div className="p-4 rounded-2xl glass">
                    <div className="w-40 h-40 rounded-xl bg-white/5 flex items-center justify-center mb-3 overflow-hidden">
                      <img 
                        src={QR_CODE_URL} 
                        alt="咨询顾问二维码"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-center text-white/60 text-sm">咨询顾问</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map & Location */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-8">
                公司位置
              </h2>
              
              {/* Map Image */}
              <div className="rounded-3xl overflow-hidden glass mb-8">
                <img 
                  src={MAP_IMAGE_URL}
                  alt="公司位置地图"
                  className="w-full h-80 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">万科中心</p>
                      <p className="text-white/50 text-sm mt-1">
                        沈阳市和平区长白街道和盛巷6甲万科中心2110室
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transport Info */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">交通指引</h3>
                <div className="space-y-4 text-white/70 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-cyan-400 font-bold">地</span>
                    </div>
                    <div>
                      <p className="font-medium text-white/80">地铁</p>
                      <p>地铁4号线长白岛站B出口，步行约800米</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-400 font-bold">驾</span>
                    </div>
                    <div>
                      <p className="font-medium text-white/80">自驾</p>
                      <p>导航搜索"万科中心"，地下停车场充足</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-violet-400 font-bold">公</span>
                    </div>
                    <div>
                      <p className="font-medium text-white/80">公交</p>
                      <p>287路、324路、327路等公交线路可达</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Save, Bot } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChatConfigPage() {
  const [config, setConfig] = useState({
    cozeBotId: "",
    cozeApiKey: "",
    isEnabled: true,
    welcomeMessage: "您好！我是知践咨询的智能客服。请问有什么可以帮助您的？",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchConfig = async () => {
    try {
      const response = await fetch("/api/chat-config");
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setConfig({
            cozeBotId: data.data.coze_bot_id || "",
            cozeApiKey: data.data.coze_api_key || "",
            isEnabled: data.data.is_enabled ?? true,
            welcomeMessage: data.data.welcome_message || "您好！我是知践咨询的智能客服。请问有什么可以帮助您的？",
          });
        }
      }
    } catch (error) {
      console.error("获取配置失败:", error);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/chat-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      
      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error("保存配置失败:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">智能客服配置</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 配置表单 */}
        <div className="lg:col-span-2">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Coze智能体配置</h2>
                <p className="text-white/50 text-sm">配置Coze平台的智能客服机器人</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-white/70 mb-2">Bot ID</label>
                <Input
                  value={config.cozeBotId}
                  onChange={(e) => setConfig({ ...config, cozeBotId: e.target.value })}
                  placeholder="请输入Coze Bot ID"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
                <p className="text-white/30 text-xs mt-2">
                  Coze平台的Bot ID，可在Bot设置页面获取
                </p>
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2">API Key</label>
                <Input
                  type="password"
                  value={config.cozeApiKey}
                  onChange={(e) => setConfig({ ...config, cozeApiKey: e.target.value })}
                  placeholder="请输入Coze API Key"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
                <p className="text-white/30 text-xs mt-2">
                  Coze平台的API Key，用于调用智能体接口
                </p>
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2">欢迎语</label>
                <textarea
                  value={config.welcomeMessage}
                  onChange={(e) => setConfig({ ...config, welcomeMessage: e.target.value })}
                  placeholder="请输入欢迎语"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 resize-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setConfig({ ...config, isEnabled: !config.isEnabled })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    config.isEnabled ? "bg-cyan-500" : "bg-white/20"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      config.isEnabled ? "left-7" : "left-1"
                    }`}
                  />
                </button>
                <span className="text-white/70">
                  {config.isEnabled ? "客服功能已启用" : "客服功能已禁用"}
                </span>
              </div>

              <Button
                onClick={handleSave}
                disabled={saving}
                className="btn-gradient text-slate-900"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? "保存中..." : "保存配置"}
              </Button>

              {saved && (
                <span className="text-emerald-400 text-sm ml-4">配置已保存</span>
              )}
            </div>
          </div>
        </div>

        {/* 说明 */}
        <div>
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">配置说明</h3>
            <div className="space-y-4 text-sm text-white/50">
              <div>
                <div className="text-white font-medium mb-1">1. 获取Bot ID</div>
                <p>登录Coze平台，在Bot设置页面复制Bot ID</p>
              </div>
              <div>
                <div className="text-white font-medium mb-1">2. 获取API Key</div>
                <p>在Coze平台的API设置中创建并复制API Key</p>
              </div>
              <div>
                <div className="text-white font-medium mb-1">3. 机器人发布</div>
                <p>确保机器人已发布到Web端，否则用户无法访问</p>
              </div>
              <div>
                <div className="text-white font-medium mb-1">4. 当前Bot地址</div>
                <p className="text-cyan-400">https://www.coze.cn/space/7435074936211423270/bot/7626117356053594131</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

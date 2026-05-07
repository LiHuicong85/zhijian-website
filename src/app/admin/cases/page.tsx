"use client";

import { useState, useEffect } from "react";

const THEME_COLORS = [
  { label: "科技蓝", value: "#00D4FF" },
  { label: "翠绿", value: "#10B981" },
  { label: "紫罗兰", value: "#8B5CF6" },
  { label: "琥珀橙", value: "#F59E0B" },
  { label: "玫红", value: "#EC4899" },
  { label: "靛蓝", value: "#6366F1" },
  { label: "翡翠绿", value: "#34D399" },
  { label: "珊瑚红", value: "#EF4444" },
];

interface Case {
  id: string;
  title: string;
  company: string;
  category: string;
  description: string;
  content_cases: string;
  project_achievements_cases: string;
  image_url1: string;
  theme_color: string;
  is_published: boolean;
  created_at: string;
}

export default function AdminCasesPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [caseCategories, setCaseCategories] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    category: "",
    description: "",
    content_cases: "",
    project_achievements_cases: "",
    image_url1: "",
    theme_color: "#00D4FF",
    is_published: true,
  });

  const fetchCases = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cases");
      const result = await res.json();
      if (result.success) {
        setCases(result.data || []);
      }
    } catch (error) {
      console.error("加载失败:", error);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories?type=case");
      const result = await res.json();
      if (result.success) {
        setCaseCategories(result.data.map((c: { name: string }) => c.name));
      }
    } catch {}
  };

  useEffect(() => {
    fetchCases();
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      const url = editingId ? `/api/cases/${editingId}` : "/api/cases";
      const method = editingId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      
      if (result.success) {
        alert(editingId ? "更新成功" : "创建成功");
        setShowModal(false);
        resetForm();
        fetchCases();
      } else {
        alert(result.error || "操作失败");
      }
    } catch (error) {
      console.error("提交失败:", error);
      alert("提交失败");
    }
  };

  const handleEdit = (item: Case) => {
    setEditingId(item.id);
    setFormData({
      title: item.title || "",
      company: item.company || "",
      category: item.category || "",
      description: item.description || "",
      content_cases: item.content_cases || "",
      project_achievements_cases: item.project_achievements_cases || "",
      image_url1: item.image_url1 || "",
      theme_color: item.theme_color || "#00D4FF",
      is_published: item.is_published ?? true,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      company: "",
      category: "",
      description: "",
      content_cases: "",
      project_achievements_cases: "",
      image_url1: "",
      theme_color: "#00D4FF",
      is_published: true,
    });
  };

  const openNew = () => {
    resetForm();
    setShowModal(true);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#fff", padding: "24px" }}>
      {/* 头部 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>案例管理</h1>
        <button
          onClick={openNew}
          style={{ background: "#00D4FF", color: "#000", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "bold" }}
        >
          + 新增案例
        </button>
      </div>

      {/* 列表 */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>加载中...</div>
      ) : cases.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>暂无案例</div>
      ) : (
        <div style={{ display: "grid", gap: "16px" }}>
          {cases.map((item) => (
            <div key={item.id} style={{ background: "#1a2744", borderRadius: "12px", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  {item.theme_color && (
                    <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: item.theme_color, display: "inline-block" }} />
                  )}
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>{item.title}</span>
                </div>
                <div style={{ color: "#00D4FF", fontSize: "14px" }}>{item.company} - {item.category}</div>
                <div style={{ color: "#888", fontSize: "12px", marginTop: "4px" }}>
                  {item.is_published ? "已发布" : "未发布"} | {item.created_at?.slice(0, 10)}
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => handleEdit(item)} style={{ background: "#2563eb", color: "#fff", padding: "8px 16px", borderRadius: "6px", border: "none", cursor: "pointer" }}>
                  编辑
                </button>
                <button
                  onClick={async () => {
                    try {
                      const res = await fetch(`/api/cases/${item.id}`, { method: "DELETE" });
                      const result = await res.json();
                      if (result.success) {
                        await fetchCases();
                        alert("删除成功！");
                      } else {
                        alert("删除失败: " + (result.error || "未知错误"));
                      }
                    } catch (error) {
                      alert("删除异常: " + String(error));
                    }
                  }}
                  style={{ background: "#dc2626", color: "#fff", padding: "8px 16px", borderRadius: "6px", border: "none", cursor: "pointer" }}
                >
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 弹窗 */}
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#1a2744", borderRadius: "16px", padding: "24px", width: "90%", maxWidth: "600px", maxHeight: "90vh", overflow: "auto" }}>
            <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>{editingId ? "编辑案例" : "新增案例"}</h2>
            
            <div style={{ display: "grid", gap: "16px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "6px", color: "#aaa" }}>标题</label>
                <input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} 
                  style={{ width: "100%", padding: "10px", background: "#0A1628", border: "1px solid #333", borderRadius: "8px", color: "#fff" }} />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "6px", color: "#aaa" }}>公司名称</label>
                <input value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} 
                  style={{ width: "100%", padding: "10px", background: "#0A1628", border: "1px solid #333", borderRadius: "8px", color: "#fff" }} />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "6px", color: "#aaa" }}>行业分类</label>
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                  style={{ width: "100%", padding: "10px", background: "#0A1628", border: "1px solid #333", borderRadius: "8px", color: "#fff" }}>
                  <option value="">请选择行业</option>
                  {caseCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "6px", color: "#aaa" }}>主题颜色</label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {THEME_COLORS.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setFormData({...formData, theme_color: color.value})}
                      style={{
                        width: "36px", height: "36px", borderRadius: "50%",
                        background: color.value,
                        border: formData.theme_color === color.value ? "3px solid #fff" : "3px solid transparent",
                        cursor: "pointer",
                        position: "relative",
                      }}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "6px", color: "#aaa" }}>简介描述</label>
                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3}
                  style={{ width: "100%", padding: "10px", background: "#0A1628", border: "1px solid #333", borderRadius: "8px", color: "#fff", resize: "vertical" }} />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "6px", color: "#aaa" }}>项目详情</label>
                <textarea value={formData.content_cases} onChange={(e) => setFormData({...formData, content_cases: e.target.value})} rows={4}
                  style={{ width: "100%", padding: "10px", background: "#0A1628", border: "1px solid #333", borderRadius: "8px", color: "#fff", resize: "vertical" }} />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "6px", color: "#aaa" }}>项目成果</label>
                <textarea value={formData.project_achievements_cases} onChange={(e) => setFormData({...formData, project_achievements_cases: e.target.value})} rows={4}
                  style={{ width: "100%", padding: "10px", background: "#0A1628", border: "1px solid #333", borderRadius: "8px", color: "#fff", resize: "vertical" }} />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "6px", color: "#aaa" }}>封面图片URL</label>
                <input value={formData.image_url1} onChange={(e) => setFormData({...formData, image_url1: e.target.value})} 
                  style={{ width: "100%", padding: "10px", background: "#0A1628", border: "1px solid #333", borderRadius: "8px", color: "#fff" }} />
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input type="checkbox" checked={formData.is_published} onChange={(e) => setFormData({...formData, is_published: e.target.checked})} />
                <label>发布</label>
              </div>
            </div>
            
            <div style={{ display: "flex", gap: "12px", marginTop: "24px", justifyContent: "flex-end" }}>
              <button onClick={() => { setShowModal(false); resetForm(); }} style={{ padding: "10px 20px", background: "#333", color: "#fff", borderRadius: "8px", border: "none", cursor: "pointer" }}>
                取消
              </button>
              <button onClick={handleSubmit} style={{ padding: "10px 20px", background: "#00D4FF", color: "#000", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "bold" }}>
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

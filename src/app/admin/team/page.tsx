"use client";

import { useState, useEffect } from "react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  avatar_url: string;
  sort_order: number;
  created_at: string;
}

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    description: "",
    avatar_url: "",
    sort_order: 0,
  });

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/team");
      const result = await res.json();
      if (result.success) {
        setMembers(result.data || []);
      }
    } catch (error) {
      console.error("加载失败:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSubmit = async () => {
    try {
      const url = editingId ? `/api/team/${editingId}` : "/api/team";
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
        fetchMembers();
      } else {
        alert(result.error || "操作失败");
      }
    } catch (error) {
      console.error("提交失败:", error);
      alert("提交失败");
    }
  };

  const handleDelete = async (id: string) => {
    
    try {
      const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
      const result = await res.json();
      
      if (result.success) {
        alert("删除成功");
        fetchMembers();
      } else {
        alert(result.error || "删除失败");
      }
    } catch (error) {
      console.error("删除失败:", error);
      alert("删除失败");
    }
  };

  const handleEdit = (item: TeamMember) => {
    setEditingId(item.id);
    setFormData({
      name: item.name || "",
      role: item.role || "",
      description: item.description || "",
      avatar_url: item.avatar_url || "",
      sort_order: item.sort_order ?? 0,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      role: "",
      description: "",
      avatar_url: "",
      sort_order: 0,
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
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>师资管理</h1>
        <button
          onClick={openNew}
          style={{ background: "#00D4FF", color: "#000", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "bold" }}
        >
          + 新增成员
        </button>
      </div>

      {/* 列表 */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>加载中...</div>
      ) : members.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>暂无成员</div>
      ) : (
        <div style={{ display: "grid", gap: "16px" }}>
          {members.map((item) => (
            <div key={item.id} style={{ background: "#1a2744", borderRadius: "12px", padding: "20px", display: "flex", gap: "16px", alignItems: "center" }}>
              {item.avatar_url && (
                <img src={item.avatar_url} alt={item.name} style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover" }} />
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "4px" }}>{item.name}</div>
                <div style={{ color: "#00D4FF", fontSize: "14px" }}>{item.role}</div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => handleEdit(item)} style={{ background: "#2563eb", color: "#fff", padding: "8px 16px", borderRadius: "6px", border: "none", cursor: "pointer" }}>
                  编辑
                </button>
                <button onClick={() => handleDelete(item.id)} style={{ background: "#dc2626", color: "#fff", padding: "8px 16px", borderRadius: "6px", border: "none", cursor: "pointer" }}>
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
            <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>{editingId ? "编辑成员" : "新增成员"}</h2>
            
            <div style={{ display: "grid", gap: "16px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "6px", color: "#aaa" }}>姓名</label>
                <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  style={{ width: "100%", padding: "10px", background: "#0A1628", border: "1px solid #333", borderRadius: "8px", color: "#fff" }} />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "6px", color: "#aaa" }}>职位</label>
                <input value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} 
                  style={{ width: "100%", padding: "10px", background: "#0A1628", border: "1px solid #333", borderRadius: "8px", color: "#fff" }} />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "6px", color: "#aaa" }}>简介</label>
                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={4}
                  style={{ width: "100%", padding: "10px", background: "#0A1628", border: "1px solid #333", borderRadius: "8px", color: "#fff", resize: "vertical" }} />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "6px", color: "#aaa" }}>头像URL</label>
                <input value={formData.avatar_url} onChange={(e) => setFormData({...formData, avatar_url: e.target.value})} 
                  style={{ width: "100%", padding: "10px", background: "#0A1628", border: "1px solid #333", borderRadius: "8px", color: "#fff" }} />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "6px", color: "#aaa" }}>排序</label>
                <input type="number" value={formData.sort_order} onChange={(e) => setFormData({...formData, sort_order: parseInt(e.target.value) || 0})} 
                  style={{ width: "100%", padding: "10px", background: "#0A1628", border: "1px solid #333", borderRadius: "8px", color: "#fff" }} />
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

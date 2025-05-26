// src/components/admin/adminpage/AdminPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/auth/AxiosConfig";
import Dashboard   from "@/components/admin/adminpage/Dashboard";
import MemberList  from "@/components/admin/adminpage/MemberList";
import BoardList   from "@/components/admin/adminpage/BoardList";
import CommentList from "@/components/admin/adminpage/CommentList";
import "@/components_css/admin/adminpage/AdminPage.css";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  // 1) 로그인 유저 정보 가져오기
  useEffect(() => {
    axios
      .get("/api/member/me", { withCredentials: true })
      .then((res) => {
        setUserInfo(res.data);
        /*if (res.data.roleId !== 1) {
          // 관리자가 아니면 마이페이지로
          navigate("/member/mypage");
        }*/
      })
      .catch(() => {
        // 토큰 만료 등
        navigate("/member");
      });
  }, [navigate]);

  // 2) 로딩 중
  if (!userInfo) {
    return <div className="adminpage-loading">로딩 중…</div>;
  }

  // 3) 탭별 콘텐츠
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":   return <Dashboard />;
      case "memberList":  return <MemberList />;
      case "boardList":   return <BoardList />;
      case "commentList": return <CommentList />;
      default:            return null;
    }
  };

  return (
    <div className="adminpage-container">
      <div className="adminpage-tabs">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={activeTab === "dashboard" ? "active" : ""}
        >
          대시보드
        </button>
        <button
          onClick={() => setActiveTab("memberList")}
          className={activeTab === "memberList" ? "active" : ""}
        >
          회원 관리
        </button>
        <button
          onClick={() => setActiveTab("boardList")}
          className={activeTab === "boardList" ? "active" : ""}
        >
          게시글 관리
        </button>
        <button
          onClick={() => setActiveTab("commentList")}
          className={activeTab === "commentList" ? "active" : ""}
        >
          댓글 관리
        </button>
      </div>
      <div className="adminpage-content">{renderContent()}</div>
    </div>
  );
}

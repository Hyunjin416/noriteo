/*
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdateUser from "@/components/member/myPage/UpdateUser";
import BoardList from "@/components/member/myPage/BoardList";
import CommentList from "@/components/member/myPage/CommentList";
import BoardSaveList from "@/components/member/myPage/BoardSaveList";
import BoardLikeList from "@/components/member/myPage/BoardLikeList";
import "@/components_css/member/mypage/MyPage.css";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <UpdateUser mode="edit" />;
      case "myPosts":
        return <BoardList type="myPosts" />;
      case "myComments":
        return <CommentList type="myComments" />;
      case "savedPosts":
        return <BoardSaveList type="saved" />;
      case "likedPosts":
        return <BoardLikeList type="liked" />;
      default:
        return null;
    }
  };

  return (
    <div className="mypage-container">
      <div className="mypage-tabs">
        <button
          onClick={() => setActiveTab("profile")}
          className={activeTab === "profile" ? "active" : ""}
        >
          내 정보 수정
        </button>

        <button
          onClick={() => setActiveTab("myPosts")}
          className={activeTab === "myPosts" ? "active" : ""}
        >
          내가 쓴 게시글
        </button>
        <button
          onClick={() => setActiveTab("myComments")}
          className={activeTab === "myComments" ? "active" : ""}
        >
          내가 쓴 댓글
        </button>
        <button
          onClick={() => setActiveTab("savedPosts")}
          className={activeTab === "savedPosts" ? "active" : ""}
        >
          저장한 게시글
        </button>
        <button
          onClick={() => setActiveTab("likedPosts")}
          className={activeTab === "likedPosts" ? "active" : ""}
        >
          좋아요한 게시글
        </button>
        <button
          onClick={() => navigate("/member/myPage/cancelAccount")}
          className="cancelAccount-btn"
        >
          회원 탈퇴
        </button>
      </div>
      <div className="mypage-content">{renderContent()}</div>
    </div>
  );
};

export default MyPage;
*/

// MyPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateUser from '@/components/member/myPage/UpdateUser';
import BoardList from '@/components/member/myPage/BoardList';
import CommentList from '@/components/member/myPage/CommentList';
import BoardSaveList from '@/components/member/myPage/BoardSaveList';
import BoardLikeList from '@/components/member/myPage/BoardLikeList';
import '@/components_css/member/mypage/MyPage.css';

const tabTitles = {
  profile: '내 정보 수정',
  myPosts: '내가 쓴 게시글',
  myComments: '내가 쓴 댓글',
  savedPosts: '저장한 게시글',
  likedPosts: '좋아요한 게시글',
};

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  return (
    <div className="mypage-container">
      <nav className="mypage-tabs">
        {Object.entries(tabTitles).map(([key, label]) => (
          <button
            key={key}
            className={activeTab === key ? 'active' : ''}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
        <button
          className="cancelAccount-btn"
          onClick={() => navigate('/member/myPage/cancelAccount')}
        >
          회원 탈퇴
        </button>
      </nav>

      <div className="mypage-content">
        <div className="section-card">
          <div className="section-card-title">{tabTitles[activeTab]}</div>
          <div className="section-card-body">
            {activeTab === 'profile' && <UpdateUser mode="edit" />}
            {activeTab === 'myPosts' && <BoardList type="myPosts" />}
            {activeTab === 'myComments' && <CommentList type="myComments" />}
            {activeTab === 'savedPosts' && <BoardSaveList type="saved" />}
            {activeTab === 'likedPosts' && <BoardLikeList type="liked" />}
          </div>
        </div>
      </div>
    </div>
  );
}
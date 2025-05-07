import React, { useState } from "react";
import UpdateUser from "@/components/member/myPage/UpdateUser";
import BoardList from "@/components/member/myPage/BoardList";
import CommentList from "@/components/member/myPage/CommentList";
import ProductList from "@/components/member/myPage/ProductList";
import BoardSaveList from "@/components/member/myPage/BoardSaveList";
import ProductLikeList from "@/components/member/myPage/ProductLikeList";
import "@/components_css/member/mypage/MyPage.css";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <UpdateUser mode="edit" />;
      case "myPosts":
        return <BoardList type="myPosts" />;
      case "myComments":
        return <CommentList type="myComments" />;
      case "myProducts":
        return <ProductList type="myProducts" />;
      case "savedPosts":
        return <BoardSaveList type="saved" />;
      case "likedProducts":
        return <ProductLikeList type="liked" />;
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
          onClick={() => setActiveTab("myProducts")}
          className={activeTab === "myProducts" ? "active" : ""}
        >
          내가 올린 상품
        </button>
        <button
          onClick={() => setActiveTab("savedPosts")}
          className={activeTab === "savedPosts" ? "active" : ""}
        >
          저장한 게시글
        </button>
        <button
          onClick={() => setActiveTab("likedProducts")}
          className={activeTab === "likedProducts" ? "active" : ""}
        >
          찜한 상품
        </button>
      </div>
      <div className="mypage-content">{renderContent()}</div>
    </div>
  );
};

export default MyPage;

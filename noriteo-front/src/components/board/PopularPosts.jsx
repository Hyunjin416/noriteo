// src/components/board/PopularPosts.jsx
import React, { useEffect, useState } from "react";
import "./css/PopularPosts.css";

// 라우팅 연동 예시 (주석)
// import { useNavigate } from "react-router-dom";

export default function PopularPosts() {
  const [posts, setPosts] = useState([]);

  // 라우팅 예시 (주석)
  /*
  const navigate = useNavigate();

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };
  */

  const handlePostClickMock = (postId) => {
    alert(`인기글 ID: ${postId} 상세 페이지로 이동 (DB 연동 시)`);
  };

  useEffect(() => {
    // API 예시 (주석)
    /*
    fetch("/api/posts/popular")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
    */

    // 임시 mock 데이터 13개
    const mockData = Array.from({ length: 13 }, (_, i) => ({
      id: i + 1,
      title: `인기글 ${i + 1}`,
      likes: Math.floor(Math.random() * 100),
    }));

    setPosts(mockData);
  }, []);

  const handleViewAll = () => {
    alert("인기글 전체보기 (추후 라우팅)");
    // navigate("/board/popular");
  };

  return (
    <div className="popularContainer">
      <div className="popularHeader">
        <h4 className="popularTitle">인기글</h4>
        <button className="popularButtonTopRight" onClick={handleViewAll}>
          전체보기
        </button>
      </div>

      <ul className="popularList">
        {posts.slice(0, 10).map((post) => (
          <li
            key={post.id}
            className="popularItem"
            onClick={() => handlePostClickMock(post.id)}
          >
            <span className="popularItemTitle">{post.title}</span>
            <span className="popularItemLikes">좋아요: {post.likes}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

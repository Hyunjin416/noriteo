import React, { useEffect, useState } from "react";
import "../../../components_css/index/board/PopularPosts.css";
import { useNavigate } from "react-router-dom";

export default function PopularPosts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 추후 실제 API로 변경
    fetch("http://localhost:8080/api/board")
      .then((res) => res.json())
      .then((data) => {
        const sortedByViews = data
          .sort((a, b) => b.board_views - a.board_views)
          .slice(0, 10); // 조회수 기준 상위 10개
        setPosts(sortedByViews);
      })
      .catch((err) => {
        console.error("인기글 불러오기 실패:", err);
      });
  }, []);

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleViewAll = () => {
    navigate("/PostBoard?sort=views"); // 전체보기: 조회수 기준 정렬된 글 목록
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
        {posts.map((post) => (
          <li
            key={post.board_id}
            className="popularItem"
            onClick={() => handlePostClick(post.board_id)}
          >
            <span className="popularItemTitle">{post.board_title}</span>
            <span className="popularItemLikes">조회수: {post.board_views}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

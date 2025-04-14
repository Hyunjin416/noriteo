import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../../components_css/RightSideBarCSS/PopularList.css";
import { useNavigate } from "react-router-dom";

export default function PopularList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularList = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/board"); // ✅ 백엔드 API
        const sortedByViews = response.data
          .sort((a, b) => b.board_views - a.board_views)
          .slice(0, 10);
        setPosts(sortedByViews);
      } catch (err) {
        console.error("인기글 불러오기 실패:", err);
      }
    };

    fetchPopularList();
  }, []);

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleViewAll = () => {
    navigate("/PostBoard?sort=views"); // ✅ 조회수 기준 전체보기
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
            <span className="popularItemTitle" title={post.board_title}>
              {post.board_title.length > 30
                ? post.board_title.slice(0, 30) + "..."
                : post.board_title}
            </span>
            <span className="popularItemLikes">조회수: {post.board_views}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

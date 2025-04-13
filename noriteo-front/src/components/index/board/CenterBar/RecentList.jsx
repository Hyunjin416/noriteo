import React, { useEffect, useState } from "react";
import "../../../../components_css/CenterBarCSS/RecentList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RecentList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchLatestPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/board"); // ✅ 백엔드 api
      const sorted = response.data
        .sort(
          (a, b) => new Date(b.board_regdate) - new Date(a.board_regdate)
        )
        .slice(0, 10); // 최신 10개
      setPosts(sorted);
    } catch (err) {
      console.error("최신글 불러오기 실패:", err);
    }
  };

  // 10초마다 최신글 새로고침
  useEffect(() => {
    fetchLatestPosts();
    const interval = setInterval(fetchLatestPosts, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleViewAll = () => {
    navigate("/PostBoard"); // 전체 글 보기로 이동
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className="RecentListContainer">
      <div className="RecentListHeader">
        <h4 className="RecentListTitle">최신글</h4>
        <button className="RecentListButton" onClick={handleViewAll}>
          전체보기
        </button>
      </div>

      <ul className="RecentListList">
        {posts.map((post) => (
          <li
            key={post.board_id}
            className="RecentListItem"
            onClick={() => handlePostClick(post.board_id)}
          >
            <span className="newPostTitle" title={post.board_title}>
              {post.board_title.length > 40
                ? post.board_title.slice(0, 40) + "..."
                : post.board_title}
            </span>
            <div className="newPostInfo">
              <div className="newPostTime">
                {new Date(post.board_regdate).toLocaleString()}
              </div>
              <div className="newPostUserViews">
                <span className="newPostUser">작성자: {post.user_id}</span>
                <span className="newPostViews">조회수: {post.board_views}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

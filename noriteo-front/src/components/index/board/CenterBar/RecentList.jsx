import React, { useEffect, useState } from "react";
import "@/components_css/index/board/centerBar/RecentList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RecentList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchLatestPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/board/list"); // 수정된 API 경로
      const sorted = response.data
        .sort((a, b) => new Date(b.boardRegdate) - new Date(a.boardRegdate)) 
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
    navigate("/boardPage"); // 전체 글 보기로 이동
  };

  // 글 상세보기
  const handlePostClick = (postId) => {
    navigate(`/board/detail/${postId}`); // 경로도 BoardList와 통일
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
            key={post.boardId}
            className="RecentListItem"
            onClick={() => handlePostClick(post.boardId)}
          >
            <span className="newPostTitle" title={post.boardTitle}>
              {post.boardTitle.length > 40
                ? post.boardTitle.slice(0, 40) + "..."
                : post.boardTitle}
            </span>
            <div className="newPostInfo">
              <div className="newPostTime">
                {new Date(post.boardRegdate).toLocaleString("ko-KR")}
              </div>
              <div className="newPostUserViews">
                <span className="newPostUser">작성자: {post.userId}</span>
                <span className="newPostViews">조회수: {post.boardViews}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

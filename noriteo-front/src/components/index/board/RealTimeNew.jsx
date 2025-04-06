import React, { useEffect, useState } from "react";
import "../../../components_css/index/board/RealTimeNew.css";
import { useNavigate } from "react-router-dom";

export default function RealTimePopular() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // 최신글 가져오는 함수
  const fetchLatestPosts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/board");
      const data = await response.json();

      // 최신순 정렬: 등록일 기준 내림차순
      const sorted = data
        .sort(
          (a, b) => new Date(b.board_regdate) - new Date(a.board_regdate)
        )
        .slice(0, 10); // 상위 10개만

      setPosts(sorted);
    } catch (err) {
      console.error("최신글 불러오기 실패:", err);
    }
  };

  // 컴포넌트 마운트 시 + 10초마다 자동 업데이트
  useEffect(() => {
    fetchLatestPosts();
    const interval = setInterval(fetchLatestPosts, 10000); // 10초 간격
    return () => clearInterval(interval);
  }, []);

  const handleViewAll = () => {
    navigate("/PostBoard"); // 카테고리 상관없이 전체글 보기
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className="realtimeNewContainer">
      <div className="realtimeNewHeader">
        <h4 className="realtimeNewTitle">최신글</h4>
        <button className="realtimeNewButton" onClick={handleViewAll}>
          전체보기
        </button>
      </div>

      <ul className="realtimeNewList">
        {posts.map((post) => (
          <li
            key={post.board_id}
            className="realtimeNewItem"
            onClick={() => handlePostClick(post.board_id)}
          >
            <span className="newPostTitle">{post.board_title}</span>
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

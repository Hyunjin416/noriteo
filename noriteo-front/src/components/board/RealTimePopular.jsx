// src/components/board/RealTimePopular.jsx
import React, { useEffect, useState } from "react";
import "./css/RealTimePopular.css";

// ★ DB 연결 및 라우팅 시 사용할 수 있는 예시 코드 (주석 처리) ★
// import { useNavigate } from "react-router-dom";

export default function RealTimePopular() {
  const [posts, setPosts] = useState([]);

  // ★ 라우팅 예시 (주석 처리) ★
  /*
  const navigate = useNavigate();

  // 실제로 글을 클릭했을 때 상세 페이지로 이동하는 로직
  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };
  */

  // 임시 클릭 함수 (목업)
  const handlePostClickMock = (postId) => {
    alert(`글 ID: ${postId} 상세 페이지로 이동 (DB 연결 시 라우팅 예정)`);
  };

  // ★ 추후 DB에서 인기글 API로 불러올 예시 (주석 처리) ★
  /*
  useEffect(() => {
    fetch("/api/posts/realtime-popular")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);
  */

  // 임시 mock 데이터
  useEffect(() => {
    const mockData = [
      { id: 1,  title: "실시간 인기글 1",  user: "사용자A", time: "2025-01-01 10:30", likes: 15 },
      { id: 2,  title: "실시간 인기글 2",  user: "사용자B", time: "2025-01-01 11:00", likes: 10 },
      { id: 3,  title: "실시간 인기글 3",  user: "사용자C", time: "2025-01-01 11:15", likes: 8  },
      { id: 4,  title: "실시간 인기글 4",  user: "사용자D", time: "2025-01-01 11:20", likes: 8  },
      { id: 5,  title: "실시간 인기글 5",  user: "사용자E", time: "2025-01-01 11:25", likes: 11 },
      { id: 6,  title: "실시간 인기글 6",  user: "사용자F", time: "2025-01-01 11:30", likes: 13 },
      { id: 7,  title: "실시간 인기글 7",  user: "사용자G", time: "2025-01-01 11:35", likes: 10 },
      { id: 8,  title: "실시간 인기글 8",  user: "사용자H", time: "2025-01-01 11:40", likes: 7  },
      { id: 9,  title: "실시간 인기글 9",  user: "사용자I", time: "2025-01-01 11:45", likes: 9  },
      { id: 10, title: "실시간 인기글 10", user: "사용자J", time: "2025-01-01 11:50", likes: 12 },
      { id: 11, title: "실시간 인기글 11", user: "사용자K", time: "2025-01-01 11:55", likes: 6  },
      { id: 12, title: "실시간 인기글 12", user: "사용자L", time: "2025-01-01 12:00", likes: 5  },
    ];
    setPosts(mockData);
  }, []);

  // 전체보기 버튼
  const handleViewAll = () => {
    alert("실시간 인기글 전체보기 (DB 연결 시 라우팅 예정)");
  };

  return (
    <div className="realtimePopularContainer">
      {/* 상단 헤더: 가운데 제목 + 오른쪽 전체보기 버튼 */}
      <div className="realtimePopularHeader">
        <h4 className="realtimePopularTitle">실시간 인기글</h4>
        <button className="realtimePopularButton" onClick={handleViewAll}>
          전체보기
        </button>
      </div>

      <ul className="realtimePopularList">
        {/* 최대 10개만 표시 */}
        {posts.slice(0, 10).map((post) => (
          <li
            key={post.id}
            className="realtimePopularItem"
            onClick={() => handlePostClickMock(post.id)}
          >
            {/* 왼쪽: 글 제목 / 오른쪽: 작성일, 작성자, 좋아요 */}
            <span className="popularPostTitle">{post.title}</span>
            <div className="popularPostInfo">
              <div className="popularPostTime">{post.time}</div>
              <div className="popularPostUserLikes">
                <span className="popularPostUser">{post.user}</span>
                <span className="popularPostLikes">좋아요: {post.likes}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// src/components/board/CrawlingContent.jsx
import React, { useEffect, useState } from "react";
import "../../../components_css/index/board/Notice.css";

export default function NoticeContent() {
  const [posts, setPosts] = useState([]);

  // 추후 실제 크롤링 API로부터 데이터 받아올 수도 있음
  useEffect(() => {
    // 예: fetch("/api/crawling/posts") ...
    // 현재는 임시 mock 데이터 (6개)
    const mockData = [
      { id: 1, title: "공지사항 1", imageUrl: "https://via.placeholder.com/150" },
      { id: 2, title: "공지사항 2", imageUrl: "https://via.placeholder.com/150" },
      { id: 3, title: "공지사항 3", imageUrl: "https://via.placeholder.com/150" },
      { id: 4, title: "공지사항 4", imageUrl: "https://via.placeholder.com/150" },
      { id: 5, title: "공지사항 5", imageUrl: "https://via.placeholder.com/150" },
      { id: 6, title: "공지사항 6", imageUrl: "https://via.placeholder.com/150" },
    ];
    setPosts(mockData);
  }, []);

  return (
    <div className="NoticeContainer">
      <h4 className="noticeTitle">공지사항</h4>

      <div className="noticeGrid">
        {posts.map((post) => (
          <div className="noticeCard" key={post.id}>
            <img src={post.imageUrl} alt={post.title} />
            <p>{post.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

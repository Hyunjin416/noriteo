// src/components/board/CrawlingContent.jsx
import React, { useEffect, useState } from "react";
import "./css/CrawlingContent.css";

export default function CrawlingContent() {
  const [posts, setPosts] = useState([]);

  // 추후 실제 크롤링 API로부터 데이터 받아올 수도 있음
  useEffect(() => {
    // 예: fetch("/api/crawling/posts") ...
    // 현재는 임시 mock 데이터 (6개)
    const mockData = [
      { id: 1, title: "크롤링 글 1", imageUrl: "https://via.placeholder.com/150" },
      { id: 2, title: "크롤링 글 2", imageUrl: "https://via.placeholder.com/150" },
      { id: 3, title: "크롤링 글 3", imageUrl: "https://via.placeholder.com/150" },
      { id: 4, title: "크롤링 글 4", imageUrl: "https://via.placeholder.com/150" },
      { id: 5, title: "크롤링 글 5", imageUrl: "https://via.placeholder.com/150" },
      { id: 6, title: "크롤링 글 6", imageUrl: "https://via.placeholder.com/150" },
    ];
    setPosts(mockData);
  }, []);

  return (
    <div className="crawlingContainer">
      <h4 className="crawlingTitle">크롤링 게시글</h4>

      <div className="crawlingGrid">
        {posts.map((post) => (
          <div className="crawlingCard" key={post.id}>
            <img src={post.imageUrl} alt={post.title} />
            <p>{post.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

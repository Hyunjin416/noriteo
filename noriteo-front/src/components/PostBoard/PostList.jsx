// 파일 위치: noriteo/noriteo-front/src/components/PostBoard/PostList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../components_css/PostBoard/PostList.css';

const PostList = ({ filterCategory }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 백엔드 API로부터 전체 게시글 목록을 가져옴.
    // API는 POSTS 테이블을 조회하여 JSON 배열을 반환해야 함.
    axios.get('http://localhost:8080/api/posts')
      .then(response => {
        // response.data는 각 게시글 객체 배열로 가정.
        // 예: { post_id, title, content, category, created_at, ... }
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  // filterCategory가 지정되면 해당 말머리의 글만 필터링.
  const filteredPosts = filterCategory 
    ? posts.filter(post => post.category === filterCategory)
    : posts;

  return (
    <div className="post-list">
      {filteredPosts.length > 0 ? (
        filteredPosts.map(post => (
          <div key={post.post_id} className="post-item">
            <div className="post-header">
              <span className="post-category">{post.category}</span>
              <span className="post-title">{post.title}</span>
            </div>
            <div className="post-content">{post.content}</div>
            <div className="post-meta">
              <span className="post-date">{new Date(post.created_at).toLocaleString()}</span>
              {/* 추가 정보 (예: 조회수 등) 표시 가능 */}
            </div>
          </div>
        ))
      ) : (
        <p>등록된 글이 없습니다.</p>
      )}
    </div>
  );
};

export default PostList;

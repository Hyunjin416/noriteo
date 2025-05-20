// import "@/components_css/member/myPage/BoardList.css";

// const BoardList = () => {};

// export default BoardList;

// axios.get("http://localhost:8080/api/board/my", {withCredentials: true})

// axios.get("http://localhost:8080/api/comments/my", { withCredentials: true })

// axios.get("http://localhost:8080/api/board/my/saved", { withCredentials: true })

// axios.get("http://localhost:8080/api/board/my/liked", { withCredentials: true })

// axios.get("http://localhost:8080/api/board/my", {withCredentials: true})

// axios.get("http://localhost:8080/api/board/my/comments", { withCredentials: true })

// axios.get("http://localhost:8080/api/comments/my", { withCredentials: true })

//       .then(res => setMyComments(res.data))
//       .catch(err => console.error("댓글 로딩 실패:", err));

//     // 내가 저장한 글

//     axios.get("http://localhost:8080/api/board/my/saved", { withCredentials: true })

//       .then(res => setSavedBoards(res.data))
//       .catch(err => console.error("저장한 글 로딩 실패:", err));

//     // 내가 좋아요한 글

//     axios.get("http://localhost:8080/api/board/my/liked", { withCredentials: true })

//       .then(res => setLikedBoards(res.data))
//       .catch(err => console.error("좋아요 글 로딩 실패:", err));
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyPageActivity() {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    // 내가 쓴 게시글
    axios
      .get("http://localhost:8080/api/board/my", { withCredentials: true })
      .then((res) => setMyPosts(res.data))
      .catch((err) => console.error("내가 쓴 글 로딩 실패:", err));
  }, []);

      return (
    <div style={{ padding: "1rem" }}>
      <h2>🗒️ 내가 쓴 게시글</h2>
      <ul>
        {myPosts.length > 0 ? (
          myPosts.map((post) => (
            <li key={post.boardId}>{post.boardTitle}</li>
          ))
        ) : (
          <li>작성한 게시글이 없습니다.</li>
        )}
      </ul>
    </div>
  );
}
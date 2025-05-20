// import "@/components_css/member/myPage/BoardLikeList.css";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BoardLikeList() {
    const [likedBoards, setLikedBoards] = useState([]);

    useEffect(() => {
        axios
        .get("http://localhost:8080/api/board/my/liked", { withCredentials: true })
        .then((res) => setLikedBoards(res.data))
        .catch((err) => console.error("좋아요 글 로딩 실패:", err));
    }, []);

    return (
        <div>
        <h2>❤️ 좋아요한 게시글</h2>
        <ul>
            {likedBoards.length > 0 ? (
            likedBoards.map((post) => (
                <li key={post.boardId}>{post.boardTitle}</li>
            ))
            ) : (
            <li>좋아요한 게시글이 없습니다.</li>
            )}
        </ul>
        </div>
    );
}
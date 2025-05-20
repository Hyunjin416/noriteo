// import "@/components_css/member/myPage/BoardList.css";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BoardSaveList() {
    const [savedBoards, setSavedBoards] = useState([]);

    useEffect(() => {
        axios
        .get("http://localhost:8080/api/board/my/saved", { withCredentials: true })
        .then((res) => setSavedBoards(res.data))
        .catch((err) => console.error("저장한 글 로딩 실패:", err));
    }, []);

    return (
        <div>
        <h2>📌 저장한 게시글</h2>
        <ul>
            {savedBoards.length > 0 ? (
            savedBoards.map((post) => (
            <li key={post.boardId}>{post.boardTitle}</li>
            ))
            ) : (
            <li>저장한 게시글이 없습니다.</li>
            )}
        </ul>
        </div>
    );
}
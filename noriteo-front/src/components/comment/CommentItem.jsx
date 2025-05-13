// components/comment/CommentItem.jsx
import React, { useState } from "react";
import axios from "axios";
import CommentForm from "./CommentForm";

export default function CommentItem({ comment, onRefresh, currentUser, replies }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isReplying, setIsReplying] = useState(false);

    const isAuthor = currentUser?.userId === comment.userId;
    const isAdmin = currentUser?.role === "admin";

    const handleDelete = async () => {
        if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

        try {
            await axios.delete(`/api/comments/${comment.commentId}`); /* 예시 api */
            onRefresh();
        } 
        catch (err) {
            console.error("댓글 삭제 실패:", err);
            alert("삭제 실패");
        }
    };

    return (
        <li className="comment-item">
        {isEditing ? (
            <CommentForm
                editTarget={comment}
                boardId={comment.boardId}
                onSuccess={onRefresh}
                onCancel={() => setIsEditing(false)}
                currentUser={currentUser}
            />
        ) : (
            <>
            {/* 상단: 작성자, 댓글 내용, 시간 (가로 정렬) */}
            <div className="comment-top">
                <span className="comment-writer">{comment.userId}</span>
                <div className="comment-content">{comment.content}</div>
                <span className="comment-time">{comment.regDate}</span>
            </div>

            {/* 하단: 버튼 */}
            <div className="comment-actions">
                {/* 작성자 본인 또는 관리자만 수정 가능 */}
                {(isAuthor || isAdmin) && <button onClick={() => setIsEditing(true)}>수정</button>}
                
                {/* 작성자 본인 또는 관리자만 삭제 가능 */}
                {(isAuthor || isAdmin) && <button onClick={handleDelete}>삭제</button>}
                
                {/* 로그인 사용자만 답글 작성 가능 */}
                {currentUser && <button onClick={() => setIsReplying(!isReplying)}>답글</button>}
            </div>

            {/* 대댓글 입력창 */}
            {isReplying && (
                <CommentForm
                    boardId={comment.boardId}
                    onSuccess={onRefresh}
                    onCancel={() => setIsReplying(false)}
                    currentUser={currentUser}
                    parentId={comment.commentId}
                />
            )}

            {/* 대댓글 리스트 */}
            {replies && replies.length > 0 && (
                <ul className="comment-replies">{replies}</ul>
            )}
            </>
        )}
        </li>
    );
}

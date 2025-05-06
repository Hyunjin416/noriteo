// components/comment/CommentList.jsx
import React from "react";
import CommentItem from "./CommentItem";

export default function CommentList({ comments, onRefresh, currentUser }) {
    const renderComments = (parentId = null) => {
        return comments
        .filter((c) => c.parentId === parentId)
        .map((c) => (
            <CommentItem
                key={c.commentId}
                comment={c}
                onRefresh={onRefresh}
                currentUser={currentUser}
                replies={renderComments(c.commentId)}
            />
        ));
    };

    return <ul className="comment-list">{renderComments()}</ul>;
}
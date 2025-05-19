// components/comment/CommentList.jsx
import React from "react";
import CommentItem from "./CommentItem";

export default function CommentList({ comments, onRefresh, currentUser }) {
  //   const renderComments = (parentId = null) => {
  //     return comments
  //       .filter((c) => c.parentId === parentId)
  //       .map((c) => (
  //         <CommentItem
  //           key={c.commentId}
  //           comment={c}
  //           onRefresh={onRefresh}
  //           currentUser={currentUser}
  //           replies={renderComments(c.commentId)}
  //         />
  //       ));

  const renderComments = (parentId = null) => {
    return comments
      .filter((c) => c.parentId === parentId)
      .map((c) => (
        <CommentItem
          key={c.boardCommentId}
          comment={c}
          onRefresh={onRefresh}
          currentUser={currentUser}
          replies={renderComments(c.boardCommentId)}
        />
      ));
  };

  return <ul className="comment-list">{renderComments()}</ul>;
}

// export default function CommentList({ comments, onRefresh, currentUser }) {
//   return (
//     <ul className="comment-list">
//       {comments.map((c) => (
//         <CommentItem
//           key={c.boardCommentId}
//           comment={c}
//           onRefresh={onRefresh}
//           currentUser={currentUser}
//           replies={[]} // 대댓글 없음
//         />
//       ))}
//     </ul>
//   );
// }

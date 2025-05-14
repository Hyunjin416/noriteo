/*

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "@/components_css/board/BoardDetail.css";

const BoardDetail = () => {
  const { boardId } = useParams(); // URL에서 게시글 ID 추출
  const [board, setBoard] = useState(null);
  const [pics, setPics] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/board/detail/${boardId}`)
      .then((res) => {
        console.log("📦 응답 데이터:", res.data); // ← 이거 추가
        // setBoard(res.data.board);
        // setPics(res.data.pics);
        setBoard(res.data);
        setPics([]);
      })

      .catch((err) => {
        console.error("게시글 상세 불러오기 실패:", err);
      });
  }, [boardId]);

  if (!board) return <div>로딩 중...</div>;

  return (
    <div className="board-detail">
      <h2 className="title">{board.board_title}</h2>
      <div className="meta">
        <span>작성자: {board.userId}</span>
        <span>등록일: {new Date(board.boardRegdate).toLocaleString()}</span>
        <span>조회수: {board.boardViews}</span>
      </div>

      <div className="images">
        {pics.map((pic, index) => (
          <img key={index} src={pic.boardPicUrl} alt={`이미지 ${index + 1}`} />
        ))}
      </div>

      <div className="content">{board.boardContent}</div>

      <div className="address">
        <p>📍 주소: {board.boardAddress}</p>
        <p>
          🧭 위도: {board.boardLat}, 경도: {board.boardLng}
        </p>
      </div>
    </div>
  );
};

export default BoardDetail;

*/

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "@/components_css/board/BoardDetail.css";
import CommentSection from "@/components/comment/CommentSection";

const BoardDetail = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [pics, setPics] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/board/detail/${boardId}`)
      .then((res) => {
        setBoard(res.data);
        setPics(res.data.pics || []);
      })
      .catch((err) => console.error("게시글 상세 불러오기 실패:", err));
  }, [boardId]);

  if (!board) return <div className="loading">로딩 중...</div>;

  const formattedDate = new Date(board.boardRegdate).toLocaleString();

  // 좋아요 API 호출 → DB 업데이트 및 UI 반영
  const handleLike = () => {
    axios
      .post(`http://localhost:8080/api/board/${boardId}/like`)
      .then((res) => {
        // 서버에서 반환한 최신 좋아요 수로 state 업데이트
        setBoard((prev) => ({ ...prev, likes: res.data.likes }));
      })
      .catch((err) => console.error("좋아요 실패:", err));
  };

   // 스크랩 API 호출 → DB 저장
  const handleSave = () => {
    axios
      .post(`http://localhost:8080/api/board/${boardId}/save`)
      .then(() => alert("게시글이 저장되었습니다."))
      .catch((err) => console.error("저장 실패:", err));
  };

  const handleEdit = () =>
    navigate(`/boardwrite/${boardId}`, { state: { board } });

  const handleDelete = () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    axios
      .delete(`http://localhost:8080/api/board/${boardId}`)
      .then(() => navigate("/boardpage"))
      .catch((err) => console.error("삭제 실패:", err));
  };

  return (
    <article className="board-detail container">
      {/* 게시판 종류 */}
      {board.boardType && (
        <div className="board-type">{board.boardType}</div>
      )}

      {/* 제목 */}
      <header className="detail-header">
        <h1 className="title">{board.board_title}</h1>
      </header>

      {/* 구분선 */}
      <div className="divider" />

      {/* 메타 헤더 */}
      <div className="meta-header">
        <span className="post-badge">ID {boardId}</span>
        <span className="post-info">📌 타입: {board.boardType}</span>
        <span className="post-info">👤 작성자: {board.userId}</span>
        <span className="post-info">📅 {formattedDate}</span>
        <span className="post-info">👁️ 조회수: {board.boardViews}</span>
      </div>

      {/* 메인 이미지 (첫 번째) */}
      {pics[0] && (
        <img
          src={pics[0].boardPicUrl}
          alt="게시글 이미지"
          className="main-image"
        />
      )}

      {/* 본문 버블 */}
      <div className="content-bubble">
        {board.boardContent.split("\n").map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>

      {/* 위치 정보 카드 */}
      {board.boardAddress && (
        <section className="address-card">
          <h2>위치 정보</h2>
          <p>📍 장소 이름: {board.boardAddressName}</p>
          <p>🏠 도로명 주소: {board.boardAddress}</p>
          <p>
            🧭 좌표: 위도 {board.boardLat}, 경도: {board.boardLng}
          </p>
        </section>
      )}

      {/* 댓글 섹션 */}
      <CommentSection boardId={boardId} />

      {/* 액션 버튼 그룹 */}
      <div className="actions">
        <button className="btn btn-like" onClick={handleLike}>
          ❤️ 좋아요 ({board.likes || 0})
        </button>
        <button className="btn btn-save" onClick={handleSave}>
          💾 게시글 저장
        </button>
        <button className="btn btn-edit" onClick={handleEdit}>
          ➡️ 수정하기
        </button>
        <button className="btn btn-delete" onClick={handleDelete}>
          🗑️ 삭제하기
        </button>
      </div>
    </article>
  );
};

export default BoardDetail;


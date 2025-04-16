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

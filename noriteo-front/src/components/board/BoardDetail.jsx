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
      .get(http://localhost:8080/api/board/detail/${boardId})
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
          <img key={index} src={pic.boardPicUrl} alt={이미지 ${index + 1}} />
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
  const [currentUser, setCurrentUser] = useState(null);
  const [liked, setLiked] = useState(false);
  // const [likeCount, setLikeCount] = useState(0);
  const [saved, setSaved] = useState(false); // 저장 상태

  useEffect(() => {
    // 게시글 정보
    axios
      .get(`http://localhost:8080/api/board/detail/${boardId}`)
      .then((res) => {
        setBoard(res.data);
        setPics(/*res.data.pics || []*/res.data.boardPics || []);
      })
      .catch((err) => console.error("게시글 상세 불러오기 실패:", err));

    // 로그인한 사용자 정보 + 좋아요 여부
    axios
      .get(`http://localhost:8080/api/member/me`, { withCredentials: true })
      .then((res) => {
        setCurrentUser(res.data);

        // ⭐ 좋아요 상태 가져오기
        axios
          .get(`http://localhost:8080/api/board/${boardId}/liked`, {
            withCredentials: true,
          })
          .then((res) => {
            setLiked(res.data); // true or false
          })
          .catch((err) => {
            console.warn("좋아요 여부 확인 실패:", err);
          });

        //저장상태
        axios
          .get(`http://localhost:8080/api/board/${boardId}/saved`, {
            withCredentials: true,
          })
          .then((res) => {
            setSaved(res.data); // true or false
          })
          .catch((err) => {
            console.warn("저장 여부 확인 실패:", err);
          });
      })
      .catch((err) => {
        console.warn("로그인된 유저 없음:", err);
        setCurrentUser(null);
      });
  }, [boardId]);

  useEffect(() => {
    console.log("▶ initMap useEffect 호출", { board });
    if (!board || board.boardLat == null || board.boardLng == null) {
      console.log("   ⇒ board 데이터가 아직 준비되지 않았습니다.");
      return;
    }

    const initMap = () => {
      const container = document.getElementById("detail-map");
      console.log("▶ map 컨테이너 조회", container);
      const options = {
        center: new window.kakao.maps.LatLng(board.boardLat, board.boardLng),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);
      new window.kakao.maps.Marker({
        position: map.getCenter(),
        map,
      });
    };

    if (!window.kakao) {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&autoload=false`;
      script.async = true;
      script.onload = () => window.kakao.maps.load(initMap);
      document.head.appendChild(script);
    } else {
      window.kakao.maps.load(initMap);
    }
  }, [board]);

  if (!board) return <div className="loading">로딩 중...</div>;

  const formattedDate = new Date(board.boardRegdate).toLocaleString();

  // 좋아요 API 호출 → DB 업데이트 및 UI 반영
  // const handleLike = async () => {
  //   try {
  //     const res = await axios.post(
  //       http://localhost:8080/api/board/${boardId}/like,
  //       {},
  //       { withCredentials: true }
  //     );
  //     setLikeCount(res.data.likes);
  //     setLiked(!liked); // 상태 반전 (toggle)
  //   } catch (err) {
  //     console.error("좋아요 실패: ", err);
  //     alert("좋아요 처리 중 오류가 발생했어요.");
  //   }

  const handleLike = () => {
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      return;
    }

    axios
      .post(`http://localhost:8080/api/board/${boardId}/like`, null, {
        withCredentials: true,
      })
      .then((res) => {
        setBoard((prev) => ({ ...prev, likes: res.data.likes }));
        setLiked((prev) => !prev);
      })
      .catch((err) => console.error("좋아요 실패:", err));
  };

  // 스크랩 API 호출 → DB 저장
  // const handleSave = () => {
  //   if (!currentUser) {
  //     alert("로그인이 필요합니다.");
  //     return;
  //   }

  //   axios
  //     .post(`http://localhost:8080/api/board/${boardId}/save`, null, {
  //       withCredentials: true,
  //     })
  //     .then(() => alert("게시글이 저장되었습니다."))
  //     .catch((err) => console.error("저장 실패:", err));
  // };
  const handleSave = () => {
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      return;
    }

    axios
      .post(`http://localhost:8080/api/board/${boardId}/save`, null, {
        withCredentials: true,
      })
      .then(() => {
        setSaved((prev) => !prev); // 상태 토글
      })
      .catch((err) => console.error("저장 실패:", err));
  };

  const handleEdit = () => 
    navigate(`/boardwrite/${boardId}`, { state: { board } });

  const handleDelete = () => {
  // 1) 사용자 확인
  if (!window.confirm("정말 삭제하시겠습니까?")) return;

  // 2) DELETE 요청 보내기 (쿠키 기반 인증이면 withCredentials 추가)
  axios
    .delete(`http://localhost:8080/api/board/delete/${boardId}`, {
      withCredentials: true,
    })
    .then(() => {
      // 3) 성공했을 때 알림 및 페이지 이동
      alert("게시글이 삭제되었습니다.");
      navigate("/boardpage");   // 목록 또는 원하는 라우트
    })
    .catch((err) => {
      console.error("삭제 실패:", err);
      alert("삭제 중 오류가 발생했습니다.");
    });
};
  return (
    <article className="board-detail container">
      {/* 게시판 종류 */}
      {board.boardType && <div className="board-type">{board.boardType}</div>}

      {/* 제목 */}
      <header className="detail-header">
        <h1 className="title">{board.boardTitle}</h1>
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
        /*<img
          src={pics[0].boardPicUrl}
          alt="게시글 이미지"
          className="main-image"
        />*/
        <img
          src={`http://localhost:8080${pics[0].boardPicUrl}`}
          alt="게시글 이미지"
          className="main-image"
          onError={(e) => {
            // 혹시 로드 실패 시 처리 (원한다면)
            e.target.style.display = "none";
          }}
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

      {/* ──────────── 지도 표시 영역 ──────────── */}
      {board.boardLat != null && board.boardLng != null && (
        <>
          {/* ─── 위치 텍스트 ─── */}
          {(board.placeName || board.roadAddressName) && (
            <div className="detail-location-text" style={{ margin: "1rem 0", fontSize: "0.9rem" }}>
              {board.placeName && <span>📍 {board.placeName}</span>}
              {board.placeName && board.roadAddressName && <span> — </span>}
              {board.roadAddressName && <span>{board.roadAddressName}</span>}
            </div>
          )}

          <div
            id="detail-map"            // ← 이 ID를 initMap에서 참조합니다
            style={{
              width: "100%",
              height: "300px",
              borderRadius: "8px",
              margin: "1.5rem 0",
            }}
          />
        </>
      )}
      {/* ─────────────────────────────────────── */}


      {/* 댓글 섹션 */}
      <CommentSection boardId={boardId} />

      {/* 액션 버튼 그룹 */}
      <div className="actions">
        {/* <button className="btn btn-like" onClick={handleLike}>
          ❤️ 좋아요 ({board.likes || 0})
        </button> */}
        <button className="btn btn-like" onClick={handleLike}>
          {liked ? "❤️ 좋아요 취소" : "🤍 좋아요"} ({board.likes || 0})
        </button>

        {/* <button className="btn btn-save" onClick={handleSave}>
          💾 게시글 저장
        </button> */}
        <button className="btn btn-save" onClick={handleSave}>
          {saved ? "📤 저장 취소" : "💾 게시글 저장"}
        </button>
         {/* 작성자일 때만 수정/삭제 버튼 */}
         {currentUser?.userId === board.userId && (
          <>
          <button className="btn btn-edit" onClick={handleEdit}>
          ➡️ 수정하기
        </button>
        <button className="btn btn-delete" onClick={handleDelete}>
          🗑️ 삭제하기
        </button>
          </>
         )}
        

      </div>
    </article>
  );
};

export default BoardDetail;

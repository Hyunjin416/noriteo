/*
// ImageSlider.jsx
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios"; // 실제 API 연결 시 사용할 예정
import "@/components_css/index/board/centerBar/ImageSlider.css";

const SCROLL_AMOUNT = 200;

export default function ImageSlider() {
  const sliderRef = useRef(null);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // API 연결 후 axios로 대체 예정
    // axios.get("http://localhost:8080/api/boardpic")
    //   .then((response) => setCards(response.data))
    //   .catch((error) => console.error("Error fetching images:", error));

    const dummyData = [
      {
        board_pic_id: 1,
        board_id: 100,
        board_pic_url: "https://picsum.photos/id/1018/300/300",
        board_pic_order: 1
      },
      {
        board_pic_id: 2,
        board_id: 101,
        board_pic_url: "https://picsum.photos/id/1020/300/300",
        board_pic_order: 2
      },
      {
        board_pic_id: 3,
        board_id: 102,
        board_pic_url: "https://picsum.photos/id/1025/300/300",
        board_pic_order: 3
      },
      {
        board_pic_id: 4,
        board_id: 103,
        board_pic_url: "https://picsum.photos/id/1033/300/300",
        board_pic_order: 4
      },
      {
        board_pic_id: 5,
        board_id: 104,
        board_pic_url: "https://picsum.photos/id/1040/300/300",
        board_pic_order: 5
      },
      {
        board_pic_id: 6,
        board_id: 105,
        board_pic_url: "https://picsum.photos/id/1050/300/300",
        board_pic_order: 6
      },
      {
        board_pic_id: 7,
        board_id: 106,
        board_pic_url: "https://picsum.photos/id/1060/300/300",
        board_pic_order: 7
      },
      {
        board_pic_id: 8,
        board_id: 107,
        board_pic_url: "https://picsum.photos/id/1074/300/300",
        board_pic_order: 8
      },
      {
        board_pic_id: 9,
        board_id: 108,
        board_pic_url: "https://picsum.photos/id/1084/300/300",
        board_pic_order: 9
      },
      {
        board_pic_id: 10,
        board_id: 109,
        board_pic_url: "https://picsum.photos/id/1002/300/300",
        board_pic_order: 10
      }
    ];
  
    setCards(dummyData);

     // 드래그 기능 추가
    const slider = sliderRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      slider.classList.remove('active');
    };

    const handleMouseUp = () => {
      isDown = false;
      slider.classList.remove('active');
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener('mousedown', handleMouseDown);
    slider.addEventListener('mouseleave', handleMouseLeave);
    slider.addEventListener('mouseup', handleMouseUp);
    slider.addEventListener('mousemove', handleMouseMove);

    return () => {
      slider.removeEventListener('mousedown', handleMouseDown);
      slider.removeEventListener('mouseleave', handleMouseLeave);
      slider.removeEventListener('mouseup', handleMouseUp);
      slider.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleCardClick = (boardId) => {
    navigate(`/detail/${boardId}`);
  };

  const handlePrev = () => {
    const slider = sliderRef.current;
    if (slider) {
      const isAtStart = slider.scrollLeft <= 0;
  
      if (isAtStart) {
        // 1번째 사진에서 왼쪽 버튼 누르면 마지막으로 이동
        slider.scrollLeft = slider.scrollWidth;
      } else {
        slider.scrollLeft -= SCROLL_AMOUNT;
      }
    }
  };

  const handleNext = () => {
    const slider = sliderRef.current;
    if (slider) {
      const isEndReached = slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 10;
  
      if (isEndReached) {
        // 10번째 사진에서 오른쪽 버튼 누르면 처음으로 이동
        slider.scrollLeft = 0; // 처음으로 리셋
      } else {
        slider.scrollLeft += SCROLL_AMOUNT;
      }
    }
  };

  return (
    <div className="sliderContainer">
      <button className="arrowButton arrowLeft" onClick={handlePrev}>
        &lt;
      </button>

      <div className="sliderTrack" ref={sliderRef}>
        {cards.map((card) => (
          <div
            className="cardItem"
            key={card.board_pic_id}
            onClick={() => handleCardClick(card.board_id)}
          >
            {card.board_pic_url ? (
              <img src={card.board_pic_url} alt={`게시글 ${card.board_id}`} />
            ) : (
              <div className="noImageText">사진 없음</div>
            )}
          </div>
        ))}
      </div>

      <button className="arrowButton arrowRight" onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
}
*/

// src/components/index/board/centerBar/ImageSlider.jsx
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "@/components_css/index/board/centerBar/ImageSlider.css";

const SCROLL_AMOUNT = 300;

export default function ImageSlider() {
  const sliderRef = useRef(null);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/board/list", { withCredentials: true })
      .then((res) => {
        console.log("▶ /api/board/list 응답 전체:", res.data);
        // res.data는 Board 객체들의 배열. 
        // Board 객체 안에 boardPics 라는 List<BoardPic>가 포함되어 있다.
        // boardPics.length > 0 인 게시글만 필터링한다.
        const boardsWithValidPics = res.data.filter((board) => {
          // board.boardPics가 배열인지 먼저 체크
          if (!Array.isArray(board.boardPics) || board.boardPics.length === 0) {
            return false;
          }
          // boardPics[0].boardPicUrl이 문자열인지, 비어 있지 않은지 체크
          const url = board.boardPics[0].boardPicUrl;
          return typeof url === "string" && url.trim() !== "";
        });

        console.log("▶ 사진이 실제로 있는 글만 필터링:", boardsWithValidPics);

        // ② 각 게시글마다 첫 번째 사진 URL만 뽑아서 cards 배열 생성
        //    board.boardPics[0].boardPicUrl 은 
        //    DB에 저장된 “/uploads/…” 형태의 상대경로일 수 있다.
        //    따라서 반드시 “http://localhost:8080” 같은 서버 호스트를 붙여야 한다.
        const items = boardsWithValidPics.map((board) => ({
          boardId: board.boardId,
          url: `http://localhost:8080${board.boardPics[0].boardPicUrl}`,
        }));


        setCards(items);
      })
      .catch((err) => {
        console.error("사진 있는 게시글만 불러오기 실패:", err);
      });
  }, []);

  const scroll = (direction) => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft +=
        (direction === "left" ? -1 : 1) * SCROLL_AMOUNT;
    }
  };

  const handleClick = (boardId) => {
    navigate(`/board/detail/${boardId}`);
  };

  return (
    <div className="sliderContainer">
      <button
        className="arrowButton arrowLeft"
        onClick={() => scroll("left")}
      />
      <div className="sliderTrack" ref={sliderRef}>
        {cards.map((card) => (
          <div
            key={card.boardId}
            className="cardItem"
            onClick={() => handleClick(card.boardId)}
          >
            <img src={card.url} alt={`post-${card.boardId}`} />
          </div>
        ))}
      </div>
      <button
        className="arrowButton arrowRight"
        onClick={() => scroll("right")}
      />
    </div>
  );
}

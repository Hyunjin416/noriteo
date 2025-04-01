// src/components/board/CardSlider.jsx
import React, { useEffect, useState, useRef } from "react";
import "./css/CardSlider.css";

const SCROLL_AMOUNT = 200; 

// 기본 카드 목록 (1~10)
const BASE_CARDS = [
  { id: 1, title: "게시글 1",  imageUrl: "https://via.placeholder.com/200" },
  { id: 2, title: "게시글 2",  imageUrl: "https://via.placeholder.com/200" },
  { id: 3, title: "게시글 3",  imageUrl: "https://via.placeholder.com/200" },
  { id: 4, title: "게시글 4",  imageUrl: "https://via.placeholder.com/200" },
  { id: 5, title: "게시글 5",  imageUrl: "https://via.placeholder.com/200" },
  { id: 6, title: "게시글 6",  imageUrl: "https://via.placeholder.com/200" },
  { id: 7, title: "게시글 7",  imageUrl: "https://via.placeholder.com/200" },
  { id: 8, title: "게시글 8",  imageUrl: "https://via.placeholder.com/200" },
  { id: 9, title: "게시글 9",  imageUrl: "https://via.placeholder.com/200" },
  { id: 10, title: "게시글 10", imageUrl: "https://via.placeholder.com/200" }
];

export default function CardSlider() {
  // 실제 렌더링할 카드 목록. 맨 처음엔 BASE_CARDS 한 번만 들어감.
  const [cards, setCards] = useState([]);
  
  // 슬라이더 참조
  const sliderRef = useRef(null);

  // 드래그 로직을 위한 ref
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // 페이지 로딩 시 초기에 1~10만 set
  useEffect(() => {
    setCards(BASE_CARDS);
  }, []);

  // 카드 클릭 시 상세로 이동(임시)
  const handleCardClick = (id) => {
    alert(`게시글 ID: ${id} 상세 페이지로 이동`);
  };

  // 좌우 버튼 클릭
  const handlePrev = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollLeft -= SCROLL_AMOUNT;
  };
  const handleNext = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollLeft += SCROLL_AMOUNT;
  };

  // 드래그 시작
  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX;
    scrollLeftRef.current = sliderRef.current.scrollLeft;
  };

  // 드래그 중
  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const x = e.pageX - startXRef.current;
    sliderRef.current.scrollLeft = scrollLeftRef.current - x;
  };

  // 드래그 끝
  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  // 스크롤 이벤트:
  //    - 사용자 시야의 오른쪽 끝이 전체 영역 끝에 가까워지면
  //      새로운 1~10 카드를 뒤에 붙여준다.
  const handleScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

    // "오른쪽 끝에 가까워지는지" 판별 (임의로 50px 여유)
    if (scrollLeft + clientWidth >= scrollWidth - 50) {
      // 뒤에 BASE_CARDS 추가 => 1~10이 다시 이어짐
      setCards((prev) => [...prev, ...BASE_CARDS]);
    }
  };

  return (
    <div className="sliderContainer">
      {/* 좌측 화살표 버튼 */}
      <button className="arrowButton arrowLeft" onClick={handlePrev}>
        &lt;
      </button>

      {/* 슬라이더 트랙 (스크롤, 드래그 이벤트 처리) */}
      <div
        className="sliderTrack"
        ref={sliderRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {cards.map((card, index) => (
          <div
            className="cardItem"
            key={`${card.id}-${index}`}
            onClick={() => handleCardClick(card.id)}
          >
            <img src={card.imageUrl}/> {/*alt={card.title} 이 코드를 쓰면 이미지와 이미지 제목도 함께 출력됨, p태그와 중복되니 쓰지 않음*/}
            <p>{card.title}</p>
          </div>
        ))}
      </div>

      {/* 우측 화살표 버튼 */}
      <button className="arrowButton arrowRight" onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
}

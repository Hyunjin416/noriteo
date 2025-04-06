import React, { useEffect, useState, useRef } from "react";
import "../../../components_css/index/board/CardSlider.css";
import axios from "axios";

const SCROLL_AMOUNT = 200;

export default function CardSlider() {
  const [cards, setCards] = useState([]);
  const [baseCards, setBaseCards] = useState([]);
  const sliderRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/card-slider")
      .then((res) => {
        setCards(res.data);
        setBaseCards(res.data);
      })
      .catch((err) => {
        console.error("카드 이미지 불러오기 실패:", err);
      });
  }, []);

  const handleCardClick = (id) => {
    alert(`게시글 ID: ${id} 상세 페이지로 이동`);
  };

  const handlePrev = () => {
    if (sliderRef.current) sliderRef.current.scrollLeft -= SCROLL_AMOUNT;
  };

  const handleNext = () => {
    if (sliderRef.current) sliderRef.current.scrollLeft += SCROLL_AMOUNT;
  };

  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX;
    scrollLeftRef.current = sliderRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const x = e.pageX - startXRef.current;
    sliderRef.current.scrollLeft = scrollLeftRef.current - x;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

    if (scrollLeft + clientWidth >= scrollWidth - 50) {
      setCards((prev) => [...prev, ...baseCards]);
    }
  };

  return (
    <div className="sliderContainer">
      <button className="arrowButton arrowLeft" onClick={handlePrev}>
        &lt;
      </button>

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
            key={`${card.board_id}-${index}`}
            onClick={() => handleCardClick(card.board_id)}
          >
            {card.board_pic_url ? (
              <img src={card.board_pic_url} alt={card.board_title} />
            ) : (
              <div className="noImageText">사진 없음</div>
            )}
            <p>{card.board_title}</p>
          </div>
        ))}
      </div>

      <button className="arrowButton arrowRight" onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
}

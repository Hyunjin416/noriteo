// ImageSlider.jsx
import React, { useRef } from "react";
import "@/components_css/index/board/centerBar/ImageSlider.css";
import { useNavigate } from "react-router-dom";

const SCROLL_AMOUNT = 200;

export default function ImageSlider({ cards = [] }) {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/post/${id}`);
  };

  const handlePrev = () => {
    if (sliderRef.current) sliderRef.current.scrollLeft -= SCROLL_AMOUNT;
  };

  const handleNext = () => {
    if (sliderRef.current) sliderRef.current.scrollLeft += SCROLL_AMOUNT;
  };

  return (
    <div className="sliderContainer">
      <button className="arrowButton arrowLeft" onClick={handlePrev}>
        &lt;
      </button>

      <div className="sliderTrack" ref={sliderRef}>
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

import React, { useState } from "react";
import "../../../components_css/BoardCSS/BoardWrite.css";

export default function TextEditor() {
  const [content, setContent] = useState("");

  return (
    <div className="editor-container">
      {/* 게시판 분류 */}
      <select className="editor-select">
        <option value="general">게시판 선택</option>
        <option value="notice">공지사항</option>
        <option value="free">자유</option>
        <option value="food">맛집</option>
        <option value="hobby">취미</option>
        <option value="play">놀거리</option>
        <option value="sell">거래</option>
      </select>

      {/* 제목 */}
      <input className="editor-title" type="text" placeholder="제목을 입력하세요..." />

      {/* 해시태그 */}
      <input className="editor-hashtag" type="text" placeholder="#해시태그 입력" />

      {/* 툴바 */}
      <div className="editor-toolbar">
        <button>B</button>
        <button>I</button>
        <button>U</button>
        <select>
          <option>폰트</option>
          <option>나눔고딕</option>
          <option>돋움</option>
        </select>
        <input type="color" />
        <select>
          <option>정렬</option>
          <option value="left">왼쪽</option>
          <option value="center">가운데</option>
          <option value="right">오른쪽</option>
        </select>
        <button>" 인용구</button>
        <button>😊 스티커</button>
        <button>📅 일정</button>
        <input type="file" />
        <button onClick={() => alert("카카오 지도 첨부 기능")}>📍 지도</button>
        <select>
          <option>문체</option>
          <option>일기체</option>
          <option>공손체</option>
        </select>
      </div>

      {/* 텍스트 에디터 영역 */}
      <textarea
        className="editor-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요..."
      />

      {/* 저장 버튼 */}
      <button className="editor-save">저장</button>
    </div>
  );
}
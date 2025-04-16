// import React, { useEffect } from "react";
// import "@/components_css/board/BoardWrite.css";

// function KakaoMapComponent() {
//   useEffect(() => {
//     if (window.kakao && window.kakao.maps) {
//       const container = document.getElementById("map");
//       const options = {
//         center: new window.kakao.maps.LatLng(33.450701, 126.570667),
//         level: 3,
//       };
//       new window.kakao.maps.Map(container, options);
//     } else {
//       console.error("Kakao Maps SDK가 로드되지 않았습니다.");
//     }
//   }, []);

//   return <div id="map" className="kakao-map"></div>;
// }

// export default KakaoMapComponent;
import React, { useEffect } from "react";
import "@/components_css/board/BoardWrite.css";

function KakaoMapComponent() {
  useEffect(() => {
    const loadMap = () => {
      // maps SDK가 완전히 로딩된 후에만 실행됨
      if (window.kakao && window.kakao.maps) {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        new window.kakao.maps.Map(container, options);
      } else {
        console.error("❌ Kakao Maps 객체가 준비되지 않았습니다.");
      }
    };

    if (window.kakao && window.kakao.maps) {
      // 이미 SDK가 로딩된 경우
      window.kakao.maps.load(loadMap);
    } else {
      // SDK를 처음 로딩하는 경우
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
        import.meta.env.VITE_KAKAO_MAP_API_KEY
      }&autoload=false`; // 반드시 autoload=false
      script.async = true;
      script.onload = () => {
        if (window.kakao && window.kakao.maps && window.kakao.maps.load) {
          window.kakao.maps.load(loadMap);
        } else {
          console.error("❌ kakao.maps.load가 없습니다. SDK 로딩 실패");
        }
      };
      document.head.appendChild(script);
    }
  }, []);

  return <div id="map" className="kakao-map"></div>;
}

export default KakaoMapComponent;

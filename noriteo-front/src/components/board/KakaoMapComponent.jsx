import React, { useEffect, useRef, useState } from "react";
import "@/components_css/board/BoardWrite.css";

function KakaoMapComponent({ onSelect }) {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowsRef = useRef([]);
  const [searchAddress, setSearchAddress] = useState("");
  const [places, setPlaces] = useState([]);
  const [isPlacingMarker, setIsPlacingMarker] = useState(false);

  useEffect(() => {
    const loadMap = () => {
      if (window.kakao && window.kakao.maps) {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);
        mapRef.current = map;

        const geocoder = new window.kakao.maps.services.Geocoder();

        window.kakao.maps.event.addListener(map, "click", function (mouseEvent) {
          if (!isPlacingMarker) return;

          const latlng = mouseEvent.latLng;

          const marker = new window.kakao.maps.Marker({
            position: latlng,
            map: map,
          });

          markersRef.current.push(marker);

          geocoder.coord2Address(latlng.getLng(), latlng.getLat(), function (result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
              const detailAddr = result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name;

              const ps = new window.kakao.maps.services.Places();
              ps.keywordSearch(detailAddr, function (results, status) {
                let name = "";
                let category = "";
                if (status === window.kakao.maps.services.Status.OK && results.length > 0) {
                  name = results[0].place_name;
                  category = results[0].category_name;
                }

                const iwContent = `<div class="kakao-info-window">📍 장소: ${name || "알 수 없음"}<br/>🏷 카테고리: ${category || "정보 없음"}<br/>📌 주소: ${detailAddr}</div>`;
                const infowindow = new window.kakao.maps.InfoWindow({
                  content: iwContent,
                  removable: true,
                });
                infowindow.open(map, marker);
                infoWindowsRef.current.push(infowindow);

                setPlaces(prev => [...prev, { name: name || detailAddr, address: detailAddr, category: category || "-", position: latlng }]);

                // ← 추가: 부모 콜백으로 선택 정보 전달
                    if (onSelect) {
                      onSelect({
                        lat: latlng.getLat(),
                        lng: latlng.getLng(),
                        address: detailAddr,
                        name,
                        kakaoId: results[0]?.id || "",
                      });
                    }
              });
            }
          });
        });
      }
    };

    if (window.kakao && window.kakao.maps && window.kakao.maps.load) {
      window.kakao.maps.load(loadMap);
    } else {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
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
  }, [isPlacingMarker]);

  const handleSearch = () => {
    if (!window.kakao || !window.kakao.maps.services) return;
    const geocoder = new window.kakao.maps.services.Geocoder();
    const ps = new window.kakao.maps.services.Places();

    const query = searchAddress.trim();

    // 1차: 주소 검색
    geocoder.addressSearch(query, function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        const map = mapRef.current;
        map.setCenter(coords);
      } else {
        // 2차: 장소 검색
        ps.keywordSearch(query, function (results, placeStatus) {
          if (placeStatus === window.kakao.maps.services.Status.OK && results.length > 0) {
            const coords = new window.kakao.maps.LatLng(results[0].y, results[0].x);
            mapRef.current.setCenter(coords);
          } else {
            alert("검색 결과가 없습니다.");
          }
        });
      }
    });
  };

  const handleClearMarkers = () => {
    markersRef.current.forEach(marker => marker.setMap(null));
    infoWindowsRef.current.forEach(info => info.close());
    markersRef.current = [];
    infoWindowsRef.current = [];
    setPlaces([]);
  };

  const handleZoomToMarker = (position) => {
    if (mapRef.current) {
      mapRef.current.setCenter(position);
      mapRef.current.setLevel(3);
    }
  };

  const handleRemovePlace = (index) => {
    if (markersRef.current[index]) markersRef.current[index].setMap(null);
    if (infoWindowsRef.current[index]) infoWindowsRef.current[index].close();
    markersRef.current.splice(index, 1);
    infoWindowsRef.current.splice(index, 1);
    setPlaces(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="kakao-map-wrapper">
      <div className="address-search">
        <input
          type="text"
          placeholder="주소를 입력하세요"
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
        />
        {/*<button onClick={handleSearch}>검색</button>*/}
        <button type="button" onClick={handleSearch}>검색</button>

        {/*<button onClick={() => setIsPlacingMarker(true)}>마커 찍기</button>*/}
        <button type="button" onClick={() => setIsPlacingMarker(true)}>마커 찍기</button>

        {/*<button onClick={handleClearMarkers}>전체 삭제</button>*/}
        <button type="button" onClick={handleClearMarkers}>전체 삭제</button>
      </div>

      <div id="map" className="kakao-map"></div>

      {places.length > 0 && (
        <div className="place-list">
          <h4>📍 추가된 장소 목록</h4>
          <ul>
            {places.map((place, idx) => (
              <li key={idx} className="place-item">
                <div onClick={() => handleZoomToMarker(place.position)} className="place-info">
                  <strong>{place.name}</strong> ({place.category})<br />
                  <small>{place.address}</small>
                </div>
                {/*<button onClick={() => handleRemovePlace(idx)} className="place-remove">*/}
                <button type="button" onClick={() => handleRemovePlace(idx)} className="place-remove">
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default KakaoMapComponent;

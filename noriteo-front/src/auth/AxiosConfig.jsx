import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Vite에서는 import.meta.env 사용
  withCredentials: true, // ✅ 쿠키 전송 허용
});

// 요청 인터셉터: 쿠키에서 토큰 가져와 헤더에 설정
instance.interceptors.request.use(
  (config) => {
    // ✅ 일반 로그인 토큰
    const normalAccessToken = Cookies.get("normalAccessToken");
    // const normalRefreshToken = Cookies.get("normalRefreshToken");

    // ✅ 카카오 로그인 토큰
    const kakaoAccessToken = Cookies.get("kakaoAccessToken");
    // const kakaoRefreshToken = Cookies.get("kakaoRefreshToken");

    // ✅ 일반 토큰 우선 사용 (없으면 카카오 토큰 사용)
    if (normalAccessToken) {
      config.headers.Authorization = `Bearer ${normalAccessToken}`;
      console.log("📌 Axios Header 설정 - normalAccessToken 사용");
    } else if (kakaoAccessToken) {
      config.headers.Authorization = `Bearer ${kakaoAccessToken}`;
      console.log("📌 Axios Header 설정 - kakaoAccessToken 사용");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

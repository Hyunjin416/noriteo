// import axios from "axios";
// import Cookies from "js-cookie";

// const AxiosConfig = axios.create({
//   baseURL: import.meta.env.VITE_API_URL, // Vite에서는 import.meta.env 사용
//   withCredentials: true, // ✅ 쿠키 전송 허용
// });

// // 요청 인터셉터: 쿠키에서 토큰 가져와 헤더에 설정
// AxiosConfig.interceptors.request.use(
//   (config) => {
//     // ✅ 일반 로그인 토큰
//     const normalAccessToken = Cookies.get("normalAccessToken");
//     // const normalRefreshToken = Cookies.get("normalRefreshToken");

//     // ✅ 카카오 로그인 토큰
//     const kakaoAccessToken = Cookies.get("kakaoAccessToken");
//     // const kakaoRefreshToken = Cookies.get("kakaoRefreshToken");

//     // ✅ 일반 토큰 우선 사용 (없으면 카카오 토큰 사용)
//     if (normalAccessToken) {
//       config.headers.Authorization = `Bearer ${normalAccessToken}`;
//       console.log("📌 Axios Header 설정 - normalAccessToken 사용");
//     } else if (kakaoAccessToken) {
//       config.headers.Authorization = `Bearer ${kakaoAccessToken}`;
//       console.log("📌 Axios Header 설정 - kakaoAccessToken 사용");
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default AxiosConfig;

// import axios from "axios";
// import Cookies from "js-cookie";

// const AxiosConfig = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true,
// });

// // 요청 인터셉터 - 쿠키에서 accessToken 자동 설정
// AxiosConfig.interceptors.request.use(
//   (config) => {
//     const normalToken = Cookies.get("normalAccessToken");
//     const kakaoToken = Cookies.get("kakaoAccessToken");
//     const naverToken = Cookies.get("naverAccessToken");

//     if (normalToken) {
//       config.headers.Authorization = `Bearer ${normalToken}`;
//     } else if (kakaoToken) {
//       config.headers.Authorization = `Bearer ${kakaoToken}`;
//     } else if (naverToken) {
//       config.headers.Authorization = `Bearer ${naverToken}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // 응답 인터셉터 - accessToken 만료 시 refreshToken으로 교체
// AxiosConfig.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const res = await axios.post(
//           "/api/member/refresh",
//           {},
//           {
//             withCredentials: true,
//           }
//         );

//         const { accessToken, provider } = res.data;
//         const tokenName = `${provider}AccessToken`;

//         // 새 accessToken 쿠키 저장
//         Cookies.set(tokenName, accessToken, {
//           path: "/",
//           secure: false,
//           sameSite: "Lax",
//         });

//         // 헤더 다시 설정하고 재요청
//         originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//         return AxiosConfig(originalRequest);
//       } catch (refreshErr) {
//         console.error("🔁 Refresh Token 만료 또는 실패:", refreshErr);
//         window.location.href = "/login"; // 재로그인 유도
//         return Promise.reject(refreshErr);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default AxiosConfig;

// import axios from "axios";
// import Cookies from "js-cookie";

// // 인스턴스 생성
// const AxiosConfig = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true, // 모든 요청에 쿠키 자동 포함
// });

// // 요청 인터셉터: AccessToken 자동 삽입
// AxiosConfig.interceptors.request.use(
//   (config) => {
//     const normalAccessToken = Cookies.get("normalAccessToken");
//     const kakaoAccessToken = Cookies.get("kakaoAccessToken");
//     const naverAccessToken = Cookies.get("naverAccessToken");

//     // 일반 > 카카오 > 네이버 순서로 우선 적용
//     if (normalAccessToken) {
//       config.headers.Authorization = `Bearer ${normalAccessToken}`;
//     } else if (kakaoAccessToken) {
//       config.headers.Authorization = `Bearer ${kakaoAccessToken}`;
//     } else if (naverAccessToken) {
//       config.headers.Authorization = `Bearer ${naverAccessToken}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // 응답 인터셉터: accessToken 만료시 자동 재발급
// AxiosConfig.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // accessToken 만료 + 아직 재시도 안했으면
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const res = await axios.post(
//           `${import.meta.env.VITE_API_URL}/api/member/refresh`,
//           {},
//           { withCredentials: true } // refreshToken은 쿠키에 있으므로
//         );

//         const newAccessToken = res.data.accessToken;
//         const tokenName = res.data.tokenName; // 예: "normalAccessToken"

//         // 쿠키에 accessToken 저장
//         Cookies.set(tokenName, newAccessToken, {
//           secure: true,
//           sameSite: "Lax",
//         });

//         // 헤더에 새 accessToken 적용 후 재요청
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return AxiosConfig(originalRequest);
//       } catch (refreshError) {
//         console.error("리프레시 실패:", refreshError);
//         // 토큰 재발급 실패 → 로그아웃 유도 가능
//         window.location.href = "/login";
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default AxiosConfig;

import axios from "axios";
import Cookies from "js-cookie";

const AxiosConfig = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// 요청 인터셉터: 쿠키에서 accessToken 읽어와 설정
AxiosConfig.interceptors.request.use(
  (config) => {
    const normalAccessToken = Cookies.get("normalAccessToken");
    const kakaoAccessToken = Cookies.get("kakaoAccessToken");
    const naverAccessToken = Cookies.get("naverAccessToken");

    if (normalAccessToken) {
      config.headers.Authorization = `Bearer ${normalAccessToken}`;
    } else if (kakaoAccessToken) {
      config.headers.Authorization = `Bearer ${kakaoAccessToken}`;
    } else if (naverAccessToken) {
      config.headers.Authorization = `Bearer ${naverAccessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401일 경우 refresh 요청 후 재시도
AxiosConfig.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/member/refresh`,
          {},
          { withCredentials: true }
        );

        const { accessToken, provider } = res.data;

        // 쿠키에 다시 저장
        Cookies.set(`${provider}AccessToken`, accessToken, {
          path: "/",
        });

        if (provider && accessToken) {
          Cookies.set(`${provider}AccessToken`, accessToken, {
            path: "/",
          });
        } else {
          console.warn("🚨 provider 값이 undefined 또는 null입니다!");
        }

        // Authorization 재설정 후 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return AxiosConfig(originalRequest);
      } catch (refreshError) {
        console.error("❌ 리프레시 실패:", refreshError);
        // 로그아웃 처리나 경고창 등을 여기서 해도 됨
      }
    }

    return Promise.reject(error);
  }
);

export default AxiosConfig;

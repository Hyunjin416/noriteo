import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/auth/AxiosConfig";
import Cookies from "js-cookie";

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      axios
        .post("/api/kakao/login", { code }, { withCredentials: true })

        .then((response) => {
          console.log("✅ 카카오 로그인 성공!", response.data);

          const { kakaoAccessToken, kakaoRefreshToken } = response.data.tokens;

          // ✅ 쿠키에 저장 (만료 시간 설정)
          Cookies.set("kakaoAccessToken", kakaoAccessToken, {
            expires: 7,
            path: "/",
          });
          Cookies.set("kakaoRefreshToken", kakaoRefreshToken, {
            expires: 30,
            path: "/",
          });
          console.log("📌 저장된 카카오 토큰 (쿠키):", {
            kakaoAccessToken,
            kakaoRefreshToken,
          });

          // ✅ 메인 페이지로 리다이렉트
          const redirectUrl = response.data.redirect || "/";
          console.log("📌 리디렉트할 URL:", redirectUrl);

          navigate(redirectUrl);
        })
        .catch((error) => {
          console.error(
            "❌ 카카오 로그인 에러:",
            error.response?.data || error.message
          );
          navigate("/member/login");
        });
    } else {
      console.error("❌ 카카오 로그인 코드 없음");
      navigate("/member/login");
    }
  }, [navigate]);

  // return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoCallback;

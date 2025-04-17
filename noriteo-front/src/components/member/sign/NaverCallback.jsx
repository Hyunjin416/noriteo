import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NaverCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    // console.log("받은 네이버 로그인 코드:", code);

    if (code) {
      axios
        .post("http://localhost:8080/api/naver/login", { code })
        // .then((res) => {
        .then(() => {
          //   console.log("네이버 로그인 성공!", res.data);
          navigate("/");
        })
        .catch((err) => {
          console.error(
            "네이버 로그인 실패:",
            err.response?.data || err.message
          );
          navigate("/member/login");
        });
    }
  }, [navigate]);

  //   return <div>네이버 로그인중</div>;
};

export default NaverCallback;

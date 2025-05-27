import React, { useEffect, useState } from "react";
// import axios from "axios";
import Cookies from "js-cookie";
import DaumPostcode from "react-daum-postcode";
import "@/components_css/member/mypage/UpdateUser.css";
import axios from "@/auth/AxiosConfig";

export default function UpdateUser() {
  const [userInfo, setUserInfo] = useState({
    userEmail: "",
    userName: "",
    provider: "",

    gender: "",
    birth: "",
    mobile: "",
    phone: "",

    zipcode: "",
    address1: "",
    address2: "",

    originUser: "",
    sysUser: "",
  });

  const [preview, setPreview] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get("/api/member/me", {
        // withCredentials: true,
      })
      .then((res) => {
        setUserInfo(res.data);
        if (res.data.sysUser) {
          // setPreview(`/uploads/${res.data.sysUser}`);
          setPreview(res.data.sysUser);
        }
      })
      .catch((err) => {
        console.error("유저 정보 조회 실패", err);
        alert("회원 정보를 불러오지 못했습니다.");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleComplete = (data) => {
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") extraAddress += data.bname;
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
    }

    setUserInfo((prev) => ({
      ...prev,
      zipcode: data.zonecode, // ✅
      address1: `${data.roadAddress} ${extraAddress}`, // ✅
    }));
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "user",
      new Blob([JSON.stringify(userInfo)], { type: "application/json" })
    );
    if (newImage) formData.append("profileImage", newImage);

    try { /*
      await axios.put("/api/member/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // withCredentials: true,
      });*/

      await axios.put("/api/member/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      alert("회원정보가 수정되었습니다.");
    } catch (err) {
      console.error("회원정보 수정 실패", err);
      alert("수정 실패");
    }
  };

  const isKakao = userInfo.provider === "kakao";
  const isNaver = userInfo.provider === "naver";
  const isNormal = userInfo.provider === "normal";

  return (
    <div className="update-user-container">
      <h2>내 정보 수정</h2>
      <form onSubmit={handleSubmit}>
        {/* 이메일 (모든 provider 공통, 수정 불가) */}
        <div>
          <label>이메일</label>
          <input
            type="email"
            name="userEmail"
            value={userInfo.userEmail}
            onChange={handleChange}
            readOnly={isNormal || isNaver}
          />
        </div>

        {isNormal && (
          <>
            <div>
              <label>비밀번호</label>
              <input
                type="password"
                name="password"
                // value={userInfo.password || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>비밀번호 확인</label>
              <input
                type="password"
                name="repassword"
                // value={userInfo.repassword || ""}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {/* 이름 (normal만 수정 가능) */}
        {isNormal && (
          <div>
            <label>이름</label>
            <input
              type="text"
              name="userName"
              value={userInfo.userName}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {(isKakao || isNaver) && (
          <div>
            <label>이름</label>
            <input
              type="text"
              name="usersName"
              value={userInfo.usersName}
              readOnly
            />
          </div>
        )}

        {/* 성별 */}
        {(isNormal || isKakao) && (
          <div>
            <label>성별</label>
            <select
              name="gender"
              value={userInfo.gender || ""}
              onChange={handleChange}
            >
              <option value="">선택</option>
              <option value="남성">남성</option>
              <option value="여성">여성</option>
            </select>
          </div>
        )}
        {isNaver && (
          <div>
            <label>성별</label>
            <input type="text" name="gender" value={userInfo.gender} readOnly />
          </div>
        )}

        {/* 생일 */}
        {(isNormal || isKakao) && (
          <div>
            <label>생년월일</label>
            <input
              type="date"
              name="birth"
              value={userInfo.birth}
              onChange={handleChange}
            />
          </div>
        )}
        {isNaver && (
          <div>
            <label>생년월일</label>
            <input type="date" name="birth" value={userInfo.birth} readOnly />
          </div>
        )}

        {/* 휴대폰 */}
        {(isNormal || isKakao) && (
          <div>
            <label>휴대폰</label>
            <input
              type="text"
              name="mobile"
              value={userInfo.mobile}
              onChange={handleChange}
            />
          </div>
        )}
        {isNaver && (
          <div>
            <label>휴대폰</label>
            <input type="text" name="mobile" value={userInfo.mobile} readOnly />
          </div>
        )}

        {/* 전화번호 (모든 사용자 editable) */}
        <div>
          <label>전화번호</label>
          <input
            type="text"
            name="phone"
            value={userInfo.phone}
            onChange={handleChange}
          />
        </div>

        {/* 주소 입력 (모든 provider 공통) */}
        <div>
          <label>우편번호</label>
          <input
            type="text"
            name="zipcode" // ✅
            value={userInfo.zipcode}
            readOnly
          />
          <button type="button" onClick={() => setIsOpen(true)}>
            주소찾기
          </button>
        </div>

        <div>
          <label>도로명 주소</label>
          <input
            type="text"
            name="address1" // ✅
            value={userInfo.address1}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>상세 주소</label>
          <input
            type="text"
            name="address2" // ✅
            value={userInfo.address2}
            onChange={handleChange}
          />
        </div>

        {/* 프로필 이미지 (normal, kakao만) */}
        {(isNormal || isKakao) && (
          <div>
            <label>프로필 이미지</label>
            {preview && <img src={preview} alt="preview" width="120" />}
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileChange}
            />
          </div>
        )}

        {isOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button onClick={() => setIsOpen(false)}>닫기</button>
              <DaumPostcode onComplete={handleComplete} />
            </div>
          </div>
        )}

        <button type="submit">수정 완료</button>
      </form>
    </div>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useInput } from "../Hooks/UseTarget";
import { useRef } from "react";
// 회원가입

function Join() {
  const navigate = useNavigate();
  const [userId, setUserId] = useInput("");
  const [password, setPassword] = useInput("");
  const [pwcheck, setPwcheck] = useInput("");
  const trimUserId = userId.trim();
  const trimPassword = password.trim();
  const trimPwcheck = pwcheck.trim();
  const userIdRef = useRef(null);
  const passwordRef = useRef(null);
  const pwcheckRef = useRef(null);

  //   const userIdhandleChange = (e) => {
  //     setUserId(e.target.value);
  //   };
  //   const passwordhandleChange = (e) => {
  //     setPassword(e.target.value);
  //   };

  //   const pwcheckhandleChange = (e) => {
  //     setPwcheck(e.target.value);
  //   };

  // 아이디 중복 검사

  const checkUserId = async () => {
    try {
      const res = await axios.get("/api/user/check", {
        params: {
          userId: trimUserId,
        },
      });
      console.log(res.data);
      if (res.data.length > 0) {
        alert("이미 존재하는 아이디입니다.");
        userIdRef.current.focus();
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 리액트 쿼리 바꿔야함
  const handleSubmit = async (event) => {
    event.preventDefault();
    // 유효성 검사
    if (!trimUserId) {
      alert("아이디를 입력해주세요");
      userIdRef.current.focus();
      return;
    }
    if (!trimPassword) {
      alert("비밀번호를 입력해주세요");
      passwordRef.current.focus();
      return;
    }
    if (trimPassword.includes(trimUserId)) {
      alert("비밀번호에 아이디를 포함할 수 없습니다.");
      passwordRef.current.focus();
      return;
    }

    if (trimUserId.length > 10) {
      alert("아이디는 10자 이상이어야 합니다.");
      userIdRef.current.focus();
      return;
    }

    if (trimPassword.length < 6) {
      alert("비밀번호는 6자 이상이어야 합니다.");
      passwordRef.current.focus();
      return;
    }
    if (trimUserId.length === 0 && trimPassword.length === 0) {
      alert("아이디와 비밀번호를 입력해주세요");
      userIdRef.current.focus();
      return;
    }
    if (trimPassword !== trimPwcheck) {
      alert("비밀번호가 일치하지 않습니다.");
      pwcheckRef.current.focus();
      return;
    }

    try {
      const response = await axios.post("http://3.38.191.164/register", {
        // 바꿔임마
        id: userId,
        password,
      });
      alert("회원가입이 되었습니다.");
      navigate("/");
      console.log(response);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <div>
        <h1>PPhysical99</h1>
      </div>
      <div>가입하고 삐지컬99를 이용해보세요</div>
      <div>
        <div>
          <input
            type="text"
            placeholder="중복 체크해주세요"
            value={userId}
            onChange={setUserId}
            ref={userIdRef}
          />
          <span>
            <button onClick={checkUserId}>확인</button>
          </span>
        </div>
        <div>
          <input
            type="text"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={setPassword}
            ref={passwordRef}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="비밀번호를 체크해주세요"
            value={pwcheck}
            onChange={setPwcheck}
            ref={pwcheckRef}
          />
        </div>
      </div>
      <div>
        {/* 긍정  */}
        <button onClick={handleSubmit}>등록하기</button>
      </div>
    </div>
  );
}

export default Join;

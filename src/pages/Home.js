import React from "react";
// import Answer from "../components/Answer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../api/user";
import { useMutation } from "react-query";

// 로그인

function Home() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const userIdhandleChange = (e) => {
    setUserId(e.target.value);
  };
  const passwordhandleChange = (e) => {
    setPassword(e.target.value);
  };

  // 리액트 쿼리
  const { mutate } = useMutation(loginUser, {
    onSuccess: () => {
      navigate("/register");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleSubmit = async () => {
    // 유효성 검사
    if (!userId) {
      alert("아이디를 입력해주세요");
      return;
    }
    if (!password) {
      alert("비밀번호를 입력해주세요");
      return;
    }

    if (userId.length === 0 || password.length === 0) {
      alert("회원가입 후 아이디와 비밀번호를 입력해주세요");
      return;
    }
    mutate({ userId, password });
  };
  return (
    <div>
      <div>
        <h1>PPhysical99</h1>
      </div>
      <div>문제 풀러 가볼까요?</div>
      <div>
        <div>
          <input
            type="text"
            placeholder="아이디를 입력하세요"
            value={userId}
            onChange={userIdhandleChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={passwordhandleChange}
          />
        </div>
      </div>
      <div>
        <button onClick={() => handleSubmit}>가입하기</button>
      </div>
      <div>
        <button
          onClick={() => {
            navigate("/join");
          }}
        >
          취소
        </button>
      </div>
    </div>
  );
}

export default Home;

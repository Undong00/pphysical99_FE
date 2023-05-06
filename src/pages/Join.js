import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUpUser } from "../api/user";
import { useMutation } from "react-query";

// 회원가입

function Join() {
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
  const { mutate } = useMutation(signUpUser, {
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      alert(error);
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
    if (password.includes(userId)) {
      alert("비밀번호에 아이디를 포함할 수 없습니다.");
      return;
    }

    if (userId.length > 10) {
      alert("아이디는 10자 이상이어야 합니다.");
      return;
    }

    if (password.length < 6) {
      alert("비밀번호는 6자 이상이어야 합니다.");
      return;
    }
    if (userId.length === 0 && password.length === 0) {
      alert("아이디와 비밀번호를 입력해주세요");
      return;
    }

    mutate({ userId, password });
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
            onChange={userIdhandleChange}
          />
          <span>
            <button>확인</button>
          </span>
        </div>
        <div>
          <input
            type="text"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={passwordhandleChange}
          />
        </div>
        <div>
          {/* <input type="text" placeholder="비밀번호를 체크해주세요" /> */}
        </div>
      </div>
      <div>
        {/* 긍정  */}
        <button onClick={() => handleSubmit}>등록하기</button>
      </div>
    </div>
  );
}

export default Join;

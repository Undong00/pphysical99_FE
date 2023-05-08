import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from 'react-query';
import { useInput } from "../Hooks/UseTarget";
import { useRef } from "react";
import { login } from "../api/user"
import { getCookie, setCookie } from "../cookie/Cookie"
// 로그인

function Home() {
  const navigate = useNavigate();
  const [userId, setUserId] = useInput("");
  const [password, setPassword] = useInput("");
  const trimUserId = userId.trim();
  const trimPassword = password.trim();
  const userIdRef = useRef(null);
  const passwordRef = useRef(null);

  // 서버에 요청 (로그인)
  const loginMutate = useMutation(login, {
    onSuccess: (response) => {
      if (response.data.Authorization) {
        setCookie('Authorization', response.data.Authorization, {
          path: "/",
        })
      }
      const jwt = getCookie("Authorization");
      if (jwt) {
        alert(`${trimUserId}님 환영합니다.`)
        setCookie('userId', trimUserId)
        navigate('/list')
      }
    },
    onError: (error) => {
      alert(`일치하는 계정정보를 찾을 수 없습니다.\n입력하신 ID, 혹은 비밀번호를 확인해주세요.`)
    }
  })

  // 로그인 api call
  const loginMutateCall = () => {
    console.log(':::: 로그인 최종 값, ',{ id: trimUserId, password: trimPassword })
    loginMutate.mutate({ id: trimUserId, password: trimPassword })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
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
    if (trimPassword.length === 0 || trimPassword.length === 0) {
      alert("아이디와 비밀번호를 입력해주세요");
      userIdRef.current.focus();
      return;
    }

    loginMutateCall()
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
            onChange={setUserId}
            ref={userIdRef}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={setPassword}
            ref={passwordRef}
          />
        </div>
      </div>
      <div>
        <button onClick={handleSubmit}>로그인하기</button>
      </div>
      <div>
        <button
          onClick={() => {
            navigate("/join");
          }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}

export default Home;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useInput } from "../Hooks/UseTarget";
import { useRef } from "react";
import { login } from "../api/user";
import { setCookie } from "../cookie/Cookie";
import * as CSS from "../style/commonStyle";
import swal from "sweetalert2";
import logoPPhysical99 from "../assets/logo_pphysical99.png";
import timer1 from "../assets/timer-1.png";

// 로그인
function Home() {
  const navigate = useNavigate();
  const [userId, setUserId] = useInput("");
  const [password, setPassword] = useInput("");
  const trimUserId = userId.trim();
  const trimPassword = password.trim();
  const userIdRef = useRef(null);
  const passwordRef = useRef(null);

  const swalAlert = (msg, type)=>{
    swal.fire({
      icon: type,
      title: msg,
      allowOutsideClick: false, // 화면 밖을 눌러도 화면이 안꺼짐
		});
  }

  // 서버에 요청 (로그인)
  const loginMutate = useMutation(login, {
    onSuccess: (response) => {
      console.log("[INFO] 로그인 요청 후 응답값", response)
      swalAlert(`${trimUserId}님 환영합니다.`,'success')
      setCookie("userId", trimUserId);
      navigate("/list");
    },
    onError: (error) => {      
      alert(error.data.message);
    },
  });

  // 로그인 api call
  const loginMutateCall = () => {
    console.log("[INFO] 로그인 요청 값, ", {
      userId: trimUserId,
      password: trimPassword,
    });
    loginMutate.mutate({ userId: trimUserId, password: trimPassword });
  };

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

    loginMutateCall();
  };

  return (
    <CSS.HomeWrapDiv>
      <CSS.HomeImgHeaderDiv>
        <img alt="timer1" width="160" height="68.5" src={timer1} />
        <img
          alt="pphysical99Logo"
          width="220"
          height="40"
          src={logoPPhysical99}
        />
      </CSS.HomeImgHeaderDiv>
      <CSS.HomeMessageDiv>문제 풀러 가볼까요?🔥</CSS.HomeMessageDiv>
      <CSS.HomeWrapHomeForm>
        <CSS.HomeInputWrapDiv>
          <CSS.HomeInput
            type="text"
            placeholder="아이디를 입력하세요"
            value={userId}
            onChange={setUserId}
            ref={userIdRef}
          />
        </CSS.HomeInputWrapDiv>
        <CSS.HomeInputWrapDiv>
          <CSS.HomeInput
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={setPassword}
            ref={passwordRef}
          />
        </CSS.HomeInputWrapDiv>
      </CSS.HomeWrapHomeForm>
      <CSS.HomeButtonWrapDiv>
        <CSS.Button onClick={handleSubmit}>로그인하기</CSS.Button>
      </CSS.HomeButtonWrapDiv>
      <CSS.HomeSpankWrapDiv>
        <CSS.HomeSpan
          onClick={() => {
            navigate("/join");
          }}
        >
          회원가입
        </CSS.HomeSpan>
      </CSS.HomeSpankWrapDiv>
    </CSS.HomeWrapDiv>
  );
}

export default Home;

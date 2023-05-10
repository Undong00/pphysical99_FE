import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInput } from "../Hooks/UseTarget";
import { useMutation } from "react-query";
import { useRef } from "react";
import Swal from "sweetalert2";
import { validId, signUp } from "../api/user";
import * as CSS from "../style/commonStyle"
import logoPPhysical99 from "../assets/logo_pphysical99.png"

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

  // 아이디 중복여부를 담는 내부 스테이트
  const [valiedId, setValiedId] = useState(false); // 체크하고 다시

  // 아이디 중복체크 선언
  const validIdMutate = useMutation(validId, {
    onSuccess: (response) => {
      setValiedId(true);
      
      alert(`${userId}은(는) 사용가능한 아이디 입니다.`);
    },
    onError: (error) => {
      setValiedId(false);
      alert("이미 존재하는 아이디입니다.");
      userIdRef.current.focus();
    },
  });


  // 아이디 중복체크 함수
  const validIdMutateCall = () => {
    console.log(":::: signup/valid/ 최종전달값,", { userId: trimUserId });
    validIdMutate.mutate({ userId: trimUserId });
  };

  const checkUserId = () => {
    try {
      validIdMutateCall();
    } catch (err) {
      console.log(err);
    }
  };

  // 회원가입 요청 선언
  const signUpMutate = useMutation(signUp, {
    onSuccess: (response) => {
      alert(`${userId}님 가입이 완료되었습니다.\n로그인 후 이용해 주세요.`);
      navigate("/home");
    },
    onError: (error) => {
      alert(error + "\n회원가입이 실패했습니다.");
    },
  });

  // 회원가입 요청
  const signUpMutateCall = () => {
    console.log(":::: signup/ 최종전달값,", { userId: trimUserId, password });
    signUpMutate.mutate({ userId: trimUserId, password });
  };


  // 리액트 쿼리 바꿔야함
  const handleSubmit = (event) => {
    event.preventDefault();
    // 유효성 검사
    if (!trimUserId) {
      Swal.fire({
        imageUrl: "https://unsplash.it/400/200",
        icon: "error",
        title: "Oops...",
        text: "아이디를 입력해주세요",
        confirmButtonColor: "black", // 버튼 색상
        confirmButtonText: "확인",
        allowOutsideClick: false, // 화면 밖을 눌러도 화면이 안꺼짐
      });
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
      alert("아이디는 10자 이하이어야 합니다.");
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
    if (!valiedId) {
      alert("아이디 중복체크는 필수입니다.");
      return;
    }

    try {
      signUpMutateCall();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <CSS.HomeWrapDiv>
      <CSS.HomeImgHeaderDiv>
        <img alt="pphysical99Logo" width="220" height="40" src={logoPPhysical99} />
      </CSS.HomeImgHeaderDiv>
      <CSS.HomeMessageDiv>가입하고 삐지컬99 💪</CSS.HomeMessageDiv>
      <CSS.HomeWrapHomeForm>
      <CSS.JoinIptBtnWrap>
        <CSS.HomeInputWrapDiv>
          <CSS.HomeInput
            type="text"
            placeholder="중복 체크해주세요"
            value={userId}
            onChange={setUserId}
            ref={userIdRef}
          />
        </CSS.HomeInputWrapDiv>
        <CSS.JoinButton onClick={checkUserId}>
          확인
        </CSS.JoinButton>
        </CSS.JoinIptBtnWrap>
        <CSS.HomeInputWrapDiv>
          <CSS.HomeInput
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={setPassword}
            ref={passwordRef}
          />
        </CSS.HomeInputWrapDiv>
        <CSS.HomeInputWrapDiv>
          <CSS.HomeInput
            type="password"
            placeholder="비밀번호를 체크해주세요"
            value={pwcheck}
            onChange={setPwcheck}
            ref={pwcheckRef}
          />
        </CSS.HomeInputWrapDiv>
      </CSS.HomeWrapHomeForm>
      <CSS.HomeButtonWrapDiv>
        <CSS.Button onClick={handleSubmit}>회원가입</CSS.Button>
      </CSS.HomeButtonWrapDiv>
      <CSS.HomeSpankWrapDiv>
        <CSS.HomeSpan onClick={() => { navigate("/home") }}>
          로그인
        </CSS.HomeSpan>
      </CSS.HomeSpankWrapDiv>
    </CSS.HomeWrapDiv>
  );
}

export default Join;

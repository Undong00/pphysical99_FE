import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInput } from "../Hooks/UseTarget";
import { useMutation } from 'react-query';
import { useRef } from "react";
import { validId, signUp } from "../api/user";
// 회원가입
function Join() {
  const navigate = useNavigate();
  // TODO 언동님 커스텀훅 제가 잘 모르겟어서 ㅠㅠ 혹시 지금 입력되면 값 바뀌는거
  // 커스텀 훅으로 다 해주셨는데.. 새로 입력되면.. valiedId 다시 false로 리셋하는거 해주실수 있나요>
  // 커스텀 훅으로 다 안해도 괜찮아욥!! 저는 지금 하라고 하면 커스텀 훅 한거 풀고 여기 내부에서 스테이트 하고 온 체인지 이밴트 선언해서 할거 같은데
  // 언동님이 커스텀 훅 하셨으니까.. 괜히 풀기 그래서..
  // 한번 확인하고 언동님이 해주시면 감사할것 같아요...
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
  const [valiedId, setValiedId] = useState(false)
  
  // 아이디 중복체크 선언
  const validIdMutate = useMutation(validId, {
    onSuccess: (response) => {
        setValiedId(true)
        alert(`${userId}님 가입이 완료되었습니다.\n로그인 후 이용해 주세요.`)
        navigate('/')
    },
    onError : (error) => {
        setValiedId(false)
        alert("이미 존재하는 아이디입니다.");
        userIdRef.current.focus();
    }
  })

  // 아이디 중복체크 함수
  const validIdMutateCall = () => {
    console.log(":::: signup/valid/ 최종전달값,", {id:trimUserId})
    validIdMutate.mutate({id: trimUserId})
  }

  const checkUserId = () => {
    try {
      validIdMutateCall()
    } catch (err) {
      console.log(err);
    }
  };

  // 회원가입 요청 선언
  const signUpMutate = useMutation(signUp, {
    onSuccess: (response) => {
        alert(`${userId}님 가입이 완료되었습니다.\n로그인 후 이용해 주세요.`)
        navigate('/')
    },
    onError : (error) => {
        alert(error + '\n회원가입이 실패했습니다.')
    }
  })

  // 회원가입 요청
  const signUpMutateCall = () => {
    console.log(":::: signup/ 최종전달값,", {id:trimUserId, password})
    signUpMutate.mutate({id: trimUserId, password})
  }

  // 리액트 쿼리 바꿔야함
  const handleSubmit = (event) => {
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
    if(!valiedId){
      alert("아이디 중복체크는 필수입니다.");
      return;
    }

    try {
      signUpMutateCall()
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
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={setPassword}
            ref={passwordRef}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="비밀번호를 체크해주세요"
            value={pwcheck}
            onChange={setPwcheck}
            ref={pwcheckRef}
          />
        </div>
      </div>
      <div>
        <button onClick={handleSubmit}>등록하기</button>
      </div>
    </div>
  );
}

export default Join;

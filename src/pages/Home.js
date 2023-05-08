import React from "react";
// import Answer from "../components/Answer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useInput } from "../Hooks/UseTarget";
import { useRef } from "react";
// 로그인

function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const [userId, setUserId] = useInput("");
  const [password, setPassword] = useInput("");
  const trimUserId = userId.trim();
  const trimPassword = password.trim();
  const userIdRef = useRef(null);
  const passwordRef = useRef(null);

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const userIdhandleChange = (e) => {
  //   setUserId(e.target.value);
  // };
  // const passwordhandleChange = (e) => {
  //   setPassword(e.target.value);
  // };

  // 리액트 쿼리
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
    try {
      const response = await axios.post("http://3.38.191.164/login", {
        // 바꿔임마
        id: userId,
        password,
      });
      // alert("로그인 되었습니다.");

      navigate("/List");
      setCookie("userId", trimUserId, {
        path: "/",
      });

      // setIsLoggedIn(true);
      // 유효성 검사
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate("/", { replace: true }); // isLoggedIn값이 true이면 이동 전에 페이지 이동 x
  //   }
  // }, [isLoggedIn, navigate]);
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

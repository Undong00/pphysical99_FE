import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as CSS from "../../style/commonStyle";

function Navi() {
  const location = useLocation();
  const navigate = useNavigate();
  const goRegister = ()=>{
    navigate('/register')
  }
  return (
    <>
      {
      (location.pathname === '/join' || location.pathname === '/') ? <></> :
        <CSS.ComNavi>
          {(location.pathname === '/register' || location.pathname.includes('/quiz/'))? <></> : <button onClick={goRegister}>등록하기</button>}
          <button>로그아웃</button>
        </CSS.ComNavi>
      }
    </>
  );
}

export default Navi;

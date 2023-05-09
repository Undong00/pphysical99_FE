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
          <NaviBtnWrapdDiv>
          {(location.pathname === '/register' || location.pathname.includes('/quiz/'))? <></> : <NaviPrimaryBtn onClick={goRegister}>등록하기</NaviPrimaryBtn>}
          <NaviNagativeBtn>로그아웃</NaviNagativeBtn>
          </NaviBtnWrapdDiv>
        </CSS.ComNavi>
      }
    </>
  );
}


export default Navi;

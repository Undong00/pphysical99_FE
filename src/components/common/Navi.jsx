import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as CSS from "../../style/commonStyle";

function Navi() {
  const location = useLocation();
  const navigate = useNavigate();
  const goRegister = () => {
    navigate("/register");
  };
  return (
    <>
      {location.pathname === "/join" || location.pathname === "/" ? (
        <></>
      ) : (
        <CSS.ComNavi>
          <CSS.NaviBtnWrapdDiv>
            {location.pathname === "/register" ||
            location.pathname.includes("/quiz/") ? (
              <></>
            ) : (
              <CSS.NaviPrimaryBtn onClick={goRegister}>
                등록하기
              </CSS.NaviPrimaryBtn>
            )}
            <CSS.NaviNagativeBtn>로그아웃</CSS.NaviNagativeBtn>
          </CSS.NaviBtnWrapdDiv>
        </CSS.ComNavi>
      )}
    </>
  );
}

export default Navi;

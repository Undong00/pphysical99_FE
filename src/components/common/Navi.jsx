import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as CSS from "../../style/commonStyle";
import { removeCookie } from "../../cookie/Cookie";

function Navi() {
  const handleLogout = () => {
    removeCookie("userId");
    navigate("/");
  };

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
            <CSS.NaviNagativeBtn onClick={handleLogout}>
              로그아웃
            </CSS.NaviNagativeBtn>
          </CSS.NaviBtnWrapdDiv>
        </CSS.ComNavi>
      )}
    </>
  );
}

export default Navi;

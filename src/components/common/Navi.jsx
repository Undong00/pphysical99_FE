import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as CSS from "../../style/commonStyle";
import { removeCookie } from "../../cookie/Cookie";
import Swal from "sweetalert2";

function Navi() {
  const swalAlert = (msg, type, answer, color) => {
    Swal.fire({
      icon: type,
      title: msg,
      allowOutsideClick: false, // 화면 밖을 눌러도 화면이 안꺼짐
      confirmButtonText: answer,
      confirmButtonColor: color,
    });
  };

  // 로그아웃
  const handleLogout = () => {
    removeCookie("token");
    removeCookie("userId");
    swalAlert("로그아웃 되었습니다.", "success", "확인", "#E8344D");
    navigate("/home");
  };

  const location = useLocation();
  const navigate = useNavigate();
  const goRegister = () => {
    navigate("/register");
  };
  return (
    <>
      {location.pathname === "/join" ||
      location.pathname === "/home" ||
      location.pathname === "/" ? (
        <></>
      ) : (
        <CSS.ComNavi>
          {location.pathname === "/register" ||
          location.pathname.includes("/quiz/") ? (
            // 목록을 제외하고 등록, 퀴즈상세보기 페이지에서 보인다
            <CSS.NaviBtnWrapdDiv>
              <CSS.NaviNagativeBtn onClick={() => navigate("/list")}>
                뒤로가기
              </CSS.NaviNagativeBtn>
            </CSS.NaviBtnWrapdDiv>
          ) : (
            // 목록에서만 보인다
            <CSS.NaviBtnWrapdDiv>
              <CSS.NaviPrimaryBtn onClick={goRegister}>
                등록하기
              </CSS.NaviPrimaryBtn>
            </CSS.NaviBtnWrapdDiv>
          )}
          {/* 로그인 이후 항상 보임 */}
          <CSS.NaviBtnWrapdDiv>
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

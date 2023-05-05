import React from "react";
import { useLocation } from "react-router-dom";

function Navi() {
  const location = useLocation();

  return (
    <>
      {
      (location.pathname === '/join' || location.pathname === '/') ? <></> :
        <div>
          {location.pathname === '/register' ? <></> : <button>등록하기</button>}
          <button>로그아웃</button>
        </div>
      }
    </>
  );
}

export default Navi;

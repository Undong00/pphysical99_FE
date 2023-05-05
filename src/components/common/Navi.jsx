import React from "react";

import { useLocation } from "react-router-dom";
import styled from "styled-components";

function Navi() {
  const location = useLocation();

  return (
    <>
      {
      (location.pathname === '/join' || location.pathname === '/') ? <></> :
        <ComNavi>
          {(location.pathname === '/register' || location.pathname === '/quiz')? <></> : <button>등록하기</button>}
          <button>로그아웃</button>
        </ComNavi>
      }
    </>
  );
}

const ComNavi = styled.div`
position: fixed;
top: 80px;
left: 0;
right: 0;
height: 80px;
background-color: pink;
color: black;
z-index: 98;
display: flex;
justify-content: center;
`
export default Navi;

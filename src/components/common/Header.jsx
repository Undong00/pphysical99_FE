import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

function Header() {
const location = useLocation();
  
  return (
    <>
      {
        (location.pathname === '/join' || location.pathname === '/') ? <></> :
          <div>
            <ComHeader><h1>PPhysical99</h1></ComHeader>
          </div>
      }
    </>
  )
}

const ComHeader = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
height: 80px;
background-color: #0084ff;
color: black;
z-index: 98;
display: flex;
justify-content: center;
`

export default Header;

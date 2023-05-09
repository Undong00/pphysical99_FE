import React from "react";
import { useLocation } from "react-router-dom";
import * as CSS from "../../style/commonStyle";
import logoPphysical99 from "../../assets/logo_pphysical99.png"

function Header() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/join" || location.pathname === "/" ? (
        <></>
      ) : (
        <CSS.ComHeaderWrapDiv>
          <CSS.ComHeader>
            <div>
              <span><img alt="pphysical99Logo" width="220" height="40" src={logoPphysical99}/></span>
            </div>
          </CSS.ComHeader>
        </CSS.ComHeaderWrapDiv>
      )}
    </>
  );
}

export default Header;

import React from "react";
import { useLocation } from "react-router-dom";
import * as CSS from "../../style/commonStyle";

function Header() {
const location = useLocation();
  
  return (
    <>
      {
        (location.pathname === '/join' || location.pathname === '/') ? <></> :
          <div>
            <CSS.ComHeader><h1>PPhysical99</h1></CSS.ComHeader>
          </div>
      }
    </>
  )

}

export default Header;

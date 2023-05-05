import React from "react";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  return (
    <>
      {
        (location.pathname === '/join' || location.pathname === '/') ? <></> :
          <div>
            <div>PPhysical99</div>
          </div>
      }
    </>
  )
}

export default Header;

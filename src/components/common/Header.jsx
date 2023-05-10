import React from "react";
import { useLocation } from "react-router-dom";
import * as CSS from "../../style/commonStyle";
import logoPphysical99 from "../../assets/logo_pphysical99.png";
import { useNavigate } from "react-router-dom";
function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      {location.pathname === "/join" ||
      location.pathname === "/home" ||
      location.pathname === "/" ? (
        <></>
      ) : (
        <CSS.ComHeaderWrapDiv>
          <CSS.ComHeader>
            <div>
              <span onClick={() => navigate("/list")}>
                <img
                  alt="pphysical99Logo"
                  width="220"
                  height="40"
                  src={logoPphysical99}
                />
              </span>
            </div>
          </CSS.ComHeader>
        </CSS.ComHeaderWrapDiv>
      )}
    </>
  );
}

export default Header;

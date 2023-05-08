import React from "react";
import { getCookie, setCookie, removeCookie } from "../cookie/Cookie"
import * as CSS from "../style/commonStyle";

function Test() {
//쿠키테스트
  const testSetCk = () =>{
    setCookie('test', '벨류벨류')
  }
  const testGetCk = () =>{
    console.log(getCookie('test'))
  }
  const testRmCk = () => {
    removeCookie('test')
  }
  return (
    <CSS.Main>
      <h1>TEST</h1>
      <button onClick={testSetCk} >setCookie</button>
      <button onClick={testGetCk} >getCookie</button>
      <button onClick={testRmCk} >removeCookie</button>
    </CSS.Main>
  );
}

export default Test;

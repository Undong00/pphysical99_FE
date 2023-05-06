import React from "react";
import { useState, useEffect } from "react";
// 내용
function Body(props) {
  const [body, setBody] = useState("");
  const Bodychange = (e) => {
    setBody(e.target.value);
  };
  
  /** 부모컴포넌트의 스테이트 변경을 위한 useEffect */
  useEffect(()=>{
    props.getQuestinObj({content:body})
  },[body])
  
  return (
    <div>
      <textarea
        placeholder="내용을 입력하세요."
        type="text"
        value={body}
        onChange={Bodychange}
      />
    </div>
  );
}

export default Body;

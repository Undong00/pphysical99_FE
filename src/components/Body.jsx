import React from "react";
import { useState } from "react";
// 내용
function Body() {
  const [body, setBody] = useState("");
  const Bodychange = (e) => {
    setBody(e.target.value);
  };
  return (
    <div>
      <textarea
        placeholder="내용을 입력하세요 "
        type="text"
        value={body}
        onChange={Bodychange}
      />
    </div>
  );
}

export default Body;

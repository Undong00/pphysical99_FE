import React from "react";
import { useState } from "react";
// 제목
function Title() {
  const [title, setTitle] = useState("");
  const titlechange = (e) => {
    setTitle(e.target.value);
  };
  return (
    <div>
      <input
        placeholder="제목을 입력하세요"
        type="text"
        value={title}
        onChange={titlechange}
      />
    </div>
  );
}

export default Title;

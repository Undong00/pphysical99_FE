import React from "react";
import { useState, useEffect } from "react";
// 제목
function Title(props) {
  const [title, setTitle] = useState("");

  /** 부모컴포넌트의 스테이트 변경을 위한 useEffect */
  useEffect(() => {
    if (props.getQuestinObj) {
      props.getQuestinObj({ title });
    }
  }, [title]);

  const titlechange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      {!props.isEditMode ? (
        <div>{title}</div>
      ) : (
        <input
          placeholder="제목을 입력하세요"
          type="text"
          value={title}
          onChange={titlechange}
        />
      )}
    </div>
  );
}

export default Title;

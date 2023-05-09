import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
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

  useEffect(() => {
    if (props.data) {
      setTitle(props.data.data.data.quizTitle);
    }
  }, [props.data]);

  return (
    <div>
      {!props.isEdit ? (
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

import React from "react";
import { useState, useEffect } from "react";
import * as CSS from "../style/commonStyle"
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
    <CSS.TitleInputWrapDiv>
      {!props.isEdit ? (
        <CSS.TitleInput readOnly placeholder="당신의 퀴즈 제목을 입력하세요." type="text" value={title}/>
      ) : (
        <CSS.TitleInput placeholder="당신의 퀴즈 제목을 입력하세요." type="text" value={title} onChange={titlechange}/>
      )}
    </CSS.TitleInputWrapDiv>
  );
}


export default Title;


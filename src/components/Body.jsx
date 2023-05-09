import React from "react";
import { useState, useEffect } from "react";
import * as CSS from "../style/commonStyle"
// 내용
function Body(props) {
  const [body, setBody] = useState("");
  const Bodychange = (e) => {
    setBody(e.target.value);
  };

  /** 부모컴포넌트의 스테이트 변경을 위한 useEffect */
  useEffect(() => {
    if (props.getQuestinObj) {
      props.getQuestinObj({ content: body });
    }
  }, [body]);

  useEffect(() => {
    if (props.data) {
      setBody(props.data.data.data.quizContent);
      console.log(props.data.data.data.quizContent);
    }
  }, [props.data]);

  return (
    <div>
      {!props.isEdit ? (
        <CSS.BodyTextarea
        placeholder="내용을 입력하세요."
        type="text"
        value={body}
        readOnly
        />
      ) : (
        <CSS.BodyTextarea
          placeholder="내용을 입력하세요."
          type="text"
          value={body}
          onChange={Bodychange}
        />
      )}
    </div>
  );
}

export default Body;

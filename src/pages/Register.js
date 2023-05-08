import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import Body from "../components/Body";
import QuizRegister from "../components/QuizRegister";
import * as CSS from "../style/commonStyle";

function Register() {
  // 서버에 담을 값들
  const [questionObj, setQuestionObj] = useState({
    title: "",
    content: "",
    correct: "",
    incorrect1: null,
    incorrect2: null,
    incorrect3: null,
  });

  const getQuestinObj = (x) => {
    const resolve = { x };
    setQuestionObj({ ...questionObj, ...resolve.x });
  };

  useEffect(() => {
    console.log(questionObj);
  }, [questionObj]);

  return (
    <CSS.Main>
      <Title getQuestinObj={getQuestinObj} isEdit={true} />
      <Body getQuestinObj={getQuestinObj} isEdit={true} />
      <QuizRegister getQuestinObj={getQuestinObj} questionObj={questionObj} />
    </CSS.Main>
  );
}

export default Register;

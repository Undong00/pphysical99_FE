import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import Body from "../components/Body";
import QuizRegister from "../components/QuizRegister";
import * as CSS from "../style/commonStyle";
import styled from "styled-components";

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
      <Container>
        <QuizRegisterLogo>퀴즈를 등록해보세요</QuizRegisterLogo>
        <Title getQuestinObj={getQuestinObj} isEdit={true} />
        <Body getQuestinObj={getQuestinObj} isEdit={true} />
        <QuizRegister getQuestinObj={getQuestinObj} questionObj={questionObj} />
      </Container>
    </CSS.Main>
  );
}

export default Register;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: black;
  font-size: 20px;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  margin: 10px;
`;

const QuizRegisterLogo = styled.div`
  font-size: 25px;
  margin-bottom: 30px;
`;

import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import Body from "../components/Body";
import Gap from "../components/common/Gap"
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
      <InnerMain>

        <PageHaderWrapDiv>
          <PageHaderContentWrapDiv>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.6298 20.1106C10.8607 20.6301 11.5969 20.6331 11.8319 20.1155L14.0135 15.3114C14.0797 15.1657 14.1965 15.0491 14.3424 14.9833L19.1206 12.8261C19.6377 12.5926 19.6377 11.8583 19.1206 11.6249L14.3424 9.46772C14.1965 9.40189 14.0797 9.28526 14.0135 9.13959L11.8319 4.3355C11.5969 3.81789 10.8607 3.82085 10.6298 4.34034L8.49893 9.13475C8.43288 9.28337 8.3142 9.40231 8.16573 9.46869L3.34545 11.6239C2.82546 11.8564 2.82546 12.5946 3.34545 12.8271L8.16573 14.9823C8.3142 15.0487 8.43288 15.1676 8.49893 15.3162L10.6298 20.1106Z" fill="#1F8648"></path><path d="M20.4964 26.6468C20.7273 27.1663 21.4635 27.1692 21.6985 26.6516L23.0542 23.6663C23.1203 23.5206 23.2372 23.404 23.3831 23.3382L26.3514 21.9981C26.8685 21.7646 26.8685 21.0303 26.3514 20.7969L23.3831 19.4568C23.2372 19.391 23.1203 19.2744 23.0542 19.1287L21.6985 16.1434C21.4635 15.6258 20.7273 15.6287 20.4964 16.1482L19.1738 19.1239C19.1078 19.2725 18.9891 19.3914 18.8407 19.4578L15.8479 20.7959C15.3279 21.0284 15.3279 21.7666 15.8479 21.9991L18.8407 23.3372C18.9891 23.4036 19.1078 23.5225 19.1738 23.6711L20.4964 26.6468Z" fill="#1F8648"></path><circle cx="25.7226" cy="12.8846" r="1.97689" fill="#1F8648"></circle></svg>
            <div>당신을 궁금해하는 사람들이 많아요!
              <br/>퀴즈를 등록해보세요!
            </div>
          </PageHaderContentWrapDiv>
        </PageHaderWrapDiv>
        
        
        <Title getQuestinObj={getQuestinObj} isEdit={true} />
        <Body getQuestinObj={getQuestinObj} isEdit={true} />
        <Gap/>
        <QuizRegister getQuestinObj={getQuestinObj} questionObj={questionObj} />
      </InnerMain>
    </CSS.Main>
  );
}

export const PageHaderWrapDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`

export const PageHaderContentWrapDiv = styled.div`
  font-size: 18px;
  font-weight: 700;
  border-radius: 8px;
  background-color: rgb(175, 211, 189);
  padding: 20px;
  align-items: center;
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 16px;
`

export const InnerMain = styled.div`
  margin-right: 15vh;
  margin-left: 15vh;
`

export default Register;


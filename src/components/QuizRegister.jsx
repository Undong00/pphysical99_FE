import React, { useEffect, useState, useRef } from "react";
import { useMutation } from "react-query";
import { quizRegister } from "../api/quiz";
import styled from "styled-components";
import * as CSS from "../style/commonStyle"
import { useNavigate } from "react-router-dom";
function QuizRegister(props) {
  const navigate = useNavigate();
  const correctInput = useRef();

  const [answerObj, setAnswerObj] = useState({
    correct: null,
    incorrect1: null,
    incorrect2: null,
    incorrect3: null,
  });

  const [circleClr, setCircleClr] = useState({
    correct: '#ced4da',
    incorrect1: '#ced4da',
    incorrect2: '#ced4da',
    incorrect3: '#ced4da',
  })


  /** 부모컴포넌트의 스테이트 변경을 위한 useEffect */
  useEffect(() => {
    props.getQuestinObj(answerObj);
  }, [answerObj]);

  const answersOnChangeEventHandler = (e) => {
    const target = e.target.id;
    switch (target) {
      case "correct":
        setAnswerObj({ ...answerObj, ...{ correct: e.target.value } })
        if (e.target.value.trim()) {
          setCircleClr({ ...circleClr, ...{ correct: '#1F8648' } })
        } else {
          setCircleClr({ ...circleClr, ...{ correct: '#ced4da' } })
        }

        break;
      case "incorrect1":
        setAnswerObj({ ...answerObj, ...{ incorrect1: e.target.value } })
        if (e.target.value.trim()) {
          setCircleClr({ ...circleClr, ...{ incorrect1: '#e8344e' } })
        } else {
          setCircleClr({ ...circleClr, ...{ incorrect1: '#ced4da' } })
        }
        break;
      case "incorrect2":
        setAnswerObj({ ...answerObj, ...{ incorrect2: e.target.value } })
        if (e.target.value.trim()) {
          setCircleClr({ ...circleClr, ...{ incorrect2: '#e8344e' } })
        } else {
          setCircleClr({ ...circleClr, ...{ incorrect2: '#ced4da' } })
        }
        break;
      case "incorrect3":
        setAnswerObj({ ...answerObj, ...{ incorrect3: e.target.value } })
        if (e.target.value.trim()) {
          setCircleClr({ ...circleClr, ...{ incorrect3: '#e8344e' } })
        } else {
          setCircleClr({ ...circleClr, ...{ incorrect3: '#ced4da' } })
        }
        break;
    }
  };

  const quizRegisterBtnEventHander = () => {
    if (!answerObj.correct || !answerObj.correct.trim()) {
      alert("정답 선택지는 필수입니다.")
      correctInput.current.focus()
      setAnswerObj({ ...answerObj, ...{ correct: "" } })
    } else {
      // 내가 등록한 게시글로 이동하기
      quizRegisterMutateCall(props.questionObj)

    }
  };

  const quizRegisterMutate = useMutation(quizRegister, {
    onSuccess: (response) => {
      // TODO 등록 다되고 등록 게시글로 바로 이동
      navigate("/list")
      console.log(response.data)
    },
    onError: () => {
      console.log("등록에러")
    },
  });

  const quizRegisterMutateCall = (finalValue) => {
    console.info("[INFO] 최종적으로 서버에 등록될 게시글 : ", props.questionObj)
    console.info("[INFO] 입력된 답안", finalValue)
    quizRegisterMutate.mutate(finalValue)
  };

  return (
    <div>
      <RegiInputWrapDiv>
        <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill={circleClr.correct} stroke={circleClr.correct} stroke-width="2"></circle><path d="M8 12.5271L10.5 14.7998L16 9.7998" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
        <RegiInput
          autoComplete='off'
          ref={correctInput}
          id="correct"
          type="text"
          value={answerObj.correct}
          onChange={answersOnChangeEventHandler}
          placeholder="정답 선택지를 입력해주세요."
        />
      </RegiInputWrapDiv>
      <RegiInputWrapDiv>
        <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill={circleClr.incorrect1} stroke={circleClr.incorrect1} stroke-width="2"></circle><path d="M8 12.5271L10.5 14.7998L16 9.7998" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
        <RegiInput
          autoComplete='off'
          id="incorrect1"
          type="text"
          value={answerObj.incorrect1}
          onChange={answersOnChangeEventHandler}
          placeholder="다른 선택지를 입력해주세요. 입력 시 객관식문제를 낼 수 있습니다."
        />
      </RegiInputWrapDiv>
      <RegiInputWrapDiv>
        <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill={circleClr.incorrect2} stroke={circleClr.incorrect2} stroke-width="2"></circle><path d="M8 12.5271L10.5 14.7998L16 9.7998" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
        <RegiInput
          autoComplete='off'
          id="incorrect2"
          type="text"
          value={answerObj.incorrect2}
          onChange={answersOnChangeEventHandler}
          placeholder="다른 선택지를 입력해주세요. 입력 시 객관식문제를 낼 수 있습니다."
        />
      </RegiInputWrapDiv>
      <RegiInputWrapDiv>
        <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill={circleClr.incorrect3} stroke={circleClr.incorrect3} stroke-width="2"></circle><path d="M8 12.5271L10.5 14.7998L16 9.7998" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
        <RegiInput
          autoComplete='off'
          id="incorrect3"
          type="text"
          value={answerObj.incorrect3}
          onChange={answersOnChangeEventHandler}
          placeholder="다른 선택지를 입력해주세요. 입력 시 객관식문제를 낼 수 있습니다."
        />
      </RegiInputWrapDiv>
      {/* TODO 긍정버튼 */}
      <div>
        <button onClick={quizRegisterBtnEventHander}>등록</button>
      </div>
    </div>
  );
}

export const RegiInputWrapDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  gap: 10px;
  height: 56px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(219, 221, 224);
  border-radius: 4px;
  margin-bottom: 4px;
`

export const RegiInput = styled.input`  
  background-color: rgb(255, 255, 255);
  width: 90%;
  border-bottom : none;
  border-top: none;
  border-left: none;
  border-right: none;
`

export default QuizRegister;

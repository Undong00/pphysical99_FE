import React, { useEffect, useState, useRef } from "react";
import { useMutation } from "react-query";
import { quizRegister } from "../api/quiz";
import styled from "styled-components";
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

  /** 부모컴포넌트의 스테이트 변경을 위한 useEffect */
  useEffect(() => {
    props.getQuestinObj(answerObj);
  }, [answerObj]);

  const answersOnChangeEventHandler = (e) => {
    const target = e.target.id;
    switch (target) {
      case "correct":
        setAnswerObj({ ...answerObj, ...{ correct: e.target.value } });
        break;
      case "incorrect1":
        setAnswerObj({ ...answerObj, ...{ incorrect1: e.target.value } });
        break;
      case "incorrect2":
        setAnswerObj({ ...answerObj, ...{ incorrect2: e.target.value } });
        break;
      case "incorrect3":
        setAnswerObj({ ...answerObj, ...{ incorrect3: e.target.value } });
        break;
    }
  };

  const quizRegisterBtnEventHander = () => {
    if (!answerObj.correct || !answerObj.correct.trim()) {
      // null.undeifined..  || ''
      alert("정답 선택지는 필수입니다.");
      correctInput.current.focus();
      setAnswerObj({ ...answerObj, ...{ correct: "" } });
    } else {
      quizRegisterMutateCall(props.questionObj);
      // 게시글로 이동하기
    }
  };

  const quizRegisterMutate = useMutation(quizRegister, {
    onSuccess: (response) => {
      // TODO 등록 다되고 등록 게시글로 바로 이동

      navigate("/list");
      console.log(response.data);
    },
    onError: () => {
      console.log("등록에러");
    },
  });

  const quizRegisterMutateCall = (finalValue) => {
    console.log(
      "서버에 보낼 최종값. 부모컴포넌트로 부터 받음 : ",
      props.questionObj
    );
    console.log(":::: 퀴즈 등록 최종 전달값, ", finalValue);
    quizRegisterMutate.mutate(finalValue);
  };

  return (
    <div>
      <div>
        <div>정답</div>
        <input
          ref={correctInput}
          id="correct"
          type="text"
          value={answerObj.correct}
          onChange={answersOnChangeEventHandler}
          placeholder="정답 선택지를 입력해주세요."
        />
      </div>
      <div>
        <div>첫번째 오답</div>
        <input
          id="incorrect1"
          type="text"
          value={answerObj.incorrect1}
          onChange={answersOnChangeEventHandler}
          placeholder="다른 선택지를 입력해주세요. 입력 시 객관식문제를 낼 수 있습니다."
        />
      </div>
      <div>
        <div>두번째 오답</div>
        <input
          id="incorrect2"
          type="text"
          value={answerObj.incorrect2}
          onChange={answersOnChangeEventHandler}
          placeholder="다른 선택지를 입력해주세요. 입력 시 객관식문제를 낼 수 있습니다."
        />
      </div>
      <div>
        <div>세번째 오답</div>
        <input
          id="incorrect3"
          type="text"
          value={answerObj.incorrect3}
          onChange={answersOnChangeEventHandler}
          placeholder="다른 선택지를 입력해주세요. 입력 시 객관식문제를 낼 수 있습니다."
        />
      </div>
      {/* TODO 긍정버튼 */}
      <div>
        <button onClick={quizRegisterBtnEventHander}>등록</button>
      </div>
    </div>
  );
}

export default QuizRegister;

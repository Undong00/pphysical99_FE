import React, { useEffect, useState, useRef } from "react";
import { useMutation } from "react-query";
import { quizRegister } from "../api/quiz";
import * as CSS from "../style/commonStyle"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function QuizRegister(props) {
  
  // 얼럿 함수 정의
  const swalAlert = (msg, type, callbackFun)=>{
    Swal.fire({
      icon: type,
      title: msg,
      allowOutsideClick: false, // 화면 밖을 눌러도 화면이 안꺼짐
		}).then((result) => {
      if (result.isConfirmed) {
        callbackFun()
      }
    })
  }
  const swalComfirm = (msg, type, callbackFun)=>{
    Swal.fire({
      icon: type,
      title: msg,
      allowOutsideClick: false, // 화면 밖을 눌러도 화면이 안꺼짐
      showCancelButton: false,
      confirmButtonColor: '#E8344D',
      confirmButtonText: '확인'
		}).then((result) => {
      if (result.isConfirmed && callbackFun) {
        callbackFun()
      }
    })
  }


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
      //alert("정답 선택지는 필수입니다.")
      swalComfirm('정답 선택지는 필수입니다.', 'warning')
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
      console.info('[INFO] 퀴즈 등록 서버 응답 데이터',response.data)
    },
    onError: () => {
      console.error("[ERROR] 서버 통신 에러 - 퀴즈게시글 등록 에러")

    },
  });

  const quizRegisterMutateCall = (finalValue) => {
    console.info("[INFO] 최종적으로 서버에 등록될 게시글 : ", props.questionObj)
    console.info("[INFO] 입력된 답안", finalValue)
    quizRegisterMutate.mutate(finalValue)
  };

  return (
    <div>
      <CSS.RegiInputWrapDiv>
        <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill={circleClr.correct} stroke={circleClr.correct} stroke-width="2"></circle><path d="M8 12.5271L10.5 14.7998L16 9.7998" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
        <CSS.RegiInput
          autoComplete='off'
          ref={correctInput}
          id="correct"
          type="text"
          value={answerObj.correct}
          onChange={answersOnChangeEventHandler}
          placeholder="정답 선택지를 입력해주세요."
        />
      </CSS.RegiInputWrapDiv>
      <CSS.RegiInputWrapDiv>
        <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill={circleClr.incorrect1} stroke={circleClr.incorrect1} stroke-width="2"></circle><path d="M8 12.5271L10.5 14.7998L16 9.7998" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
        <CSS.RegiInput
          autoComplete='off'
          id="incorrect1"
          type="text"
          value={answerObj.incorrect1}
          onChange={answersOnChangeEventHandler}
          placeholder="다른 선택지를 입력해주세요. 입력 시 객관식문제를 낼 수 있습니다."
        />
      </CSS.RegiInputWrapDiv>
      <CSS.RegiInputWrapDiv>
        <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill={circleClr.incorrect2} stroke={circleClr.incorrect2} stroke-width="2"></circle><path d="M8 12.5271L10.5 14.7998L16 9.7998" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
        <CSS.RegiInput
          autoComplete='off'
          id="incorrect2"
          type="text"
          value={answerObj.incorrect2}
          onChange={answersOnChangeEventHandler}
          placeholder="다른 선택지를 입력해주세요. 입력 시 객관식문제를 낼 수 있습니다."
        />
      </CSS.RegiInputWrapDiv>
      <CSS.RegiInputWrapDiv>
        <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill={circleClr.incorrect3} stroke={circleClr.incorrect3} stroke-width="2"></circle><path d="M8 12.5271L10.5 14.7998L16 9.7998" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
        <CSS.RegiInput
          autoComplete='off'
          id="incorrect3"
          type="text"
          value={answerObj.incorrect3}
          onChange={answersOnChangeEventHandler}
          placeholder="다른 선택지를 입력해주세요. 입력 시 객관식문제를 낼 수 있습니다."
        />
      </CSS.RegiInputWrapDiv>
      <div>
        <CSS.ComentAddBtn onClick={quizRegisterBtnEventHander}>등록</CSS.ComentAddBtn>
      </div>
    </div>
  );
}

export default QuizRegister;

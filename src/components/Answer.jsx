import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query"; // 서버요청, 쿼리 키 값으로 관리
import { useParams, useNavigate } from "react-router-dom"; // 패치의 파람
import { quizSolving } from "../api/quiz";
import { useRef } from "react";
import { getCookie } from "../cookie/Cookie";
import * as CSS from "../style/commonStyle"
import Swal from "sweetalert2"

function Answer(props) {
  // 얼럿 함수 정의
  const swalComfirm = (msg, type, textmsg, callbackFun) => {
    Swal.fire({
      icon: type,
      title: msg,
      text: textmsg,
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

  //리액트 쿼리 관련
  const queryClient = useQueryClient();

  //퀴즈 아이디를 가져오기 위한 파람
  const params = useParams();

  //네비게이터
  const navigate = useNavigate()

  // 내부상태
  const [answerArr, setAnswerArr] = useState(); // 정답목록
  const [answer, setAnswer] = useState(""); // 제출할 정답
  const [userId, setUserId] = useState("") // 문제 출제자 아이디
  const [isSovled, setIsSovled] = useState(false) // 맞춘문제여부

  // 주관식 답 포커스 하기위한 useRef
  const answerInput = useRef();

  useEffect(() => {
    if (props.data) {
      console.info("[INFO] Answer.jsx : ", props.data.data.data.solved)
      setIsSovled(props.data.data.data.solved)
      setUserId(props.data.data.data.userId)
      setAnswerArr(props.data.data.data.answerList);
    }
  }, [props.data]);

  // 주관식 답 변경 시 체인지 이벤트
  const onChangeEventHandler = (e) => {
    setAnswer(e.target.value);
  };

  // 정답 카드 클릭 이벤트
  const onClickEventHandler = (e) => {
    const chooseAnswer = e.target.innerText;
    submitAnswer(chooseAnswer);
  };

  // 정답 제출 이벤트
  const submitAnswer = (finalAnswer) => {
    if (finalAnswer.trim().length === 0) {
      swalComfirm(`정답을 입력해주세요.`, 'warning');
      setAnswer("");
    } else {
      quizSolvingMutateCall(finalAnswer.trim())
      setAnswer("");
    }
  };

  // 서버와 통신하는 뮤테이트 성공, 실패시 동작 세팅
  const quizSolvingMutate = useMutation(quizSolving, {
    onSuccess: (res) => {
      // 서버 통신 성공
      if (res.data.success) {
        if (res.data.message === '틀렸습니다!') {
          swalComfirm(`아쉽게 틀렸습니다.\n다시 시도해보세요.`, 'info')
        }

        if (res.data.message === '정답입니다~!') {
          swalComfirm(`정답을 맞추셨어요!`, 'info', `${userId}\n님과 조금더 가까워지셨어요.`)
        }

      } else {
        swalComfirm(`이미 삭제된 퀴즈입니다.`, 'error', ``, ()=>{navigate("/list");})
      }
      queryClient.invalidateQueries("quizDetails");
    },
    onError: () => {
      // 서버 통신 실패
      console.error("[ERROR] /quiz/{quiz_id}/solving 에러")
    }
  })

  // 서버로 정답 보내기
  const quizSolvingMutateCall = (finalAnswer) => {
    console.info("[INFO] /quiz/{quiz_id}/solving 최종 전달 값 ", { quizId: params.id, correct: finalAnswer })
    quizSolvingMutate.mutate({ quizId: params.id, correct: finalAnswer })
  }

  return (
    <>
      {
        (userId === getCookie("userId")) ? (
          <CSS.AlertWrapDiv>
            <CSS.ContentDiv>🔑자기가 낸 문제는 풀 수 없어요!</CSS.ContentDiv>
          </CSS.AlertWrapDiv>
        ) : (
          props.isEdit ? (
            <CSS.AlertWrapDiv>
              <CSS.ContentDiv>정답은 수정할 수 없습니다!😮</CSS.ContentDiv>
            </CSS.AlertWrapDiv>
          ) : (
            isSovled ? (
              <CSS.AlertWrapDiv>
                <CSS.ContentDiv>💡이미 푸신 문제에요!!<br />{userId} 님과 한결 가까워 지셨나요?</CSS.ContentDiv>
              </CSS.AlertWrapDiv>
            ) : (
              (answerArr && answerArr.length <= 1) ?
                (
                  <CSS.AnswerInputWrapDiv>
                    <CSS.AnswerDiv per="50">
                      <CSS.TitleInputWrapDiv>
                        <CSS.TitleInput ref={answerInput} onChange={onChangeEventHandler} type="text" value={answer}></CSS.TitleInput>
                      </CSS.TitleInputWrapDiv>
                    </CSS.AnswerDiv>
                    <CSS.AnswerButtonDiv per="1">
                      <CSS.NaviPrimaryBtn onClick={() => submitAnswer(answer)}>제출</CSS.NaviPrimaryBtn>
                    </CSS.AnswerButtonDiv>
                  </CSS.AnswerInputWrapDiv>
                )
                : (
                  <CSS.AnswerCardWrap>
                    {answerArr && answerArr.map((answer) => {
                      return (
                        <CSS.AnswerCard onClick={onClickEventHandler}>
                          {answer}
                        </CSS.AnswerCard>
                      );
                    })}
                  </CSS.AnswerCardWrap>
                )
            )
          )
        )
      }
    </>
  )
}

export default Answer;

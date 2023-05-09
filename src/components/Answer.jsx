import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query"; // 서버요청, 쿼리 키 값으로 관리
import { useParams } from "react-router-dom"; // 패치의 파람
import { quizSolving } from "../api/quiz";
import { useRef } from "react";
import * as CSS from "../style/commonStyle"

function Answer(props) {
  //리액트 쿼리 관련
  const queryClient = useQueryClient();
  
  //퀴즈 아이디를 가져오기 위한 파람
  const params = useParams();
  // 내부상태
  const [answerArr, setAnswerArr] = useState(); // 정답목록
  const [answer, setAnswer] = useState(""); // 제출할 정답
  const [userId, setUserId] = useState("") // 문제 출제자 아이디
  const [isSovled, setIsSovled]= useState(false) // 맞춘문제여부

  useEffect(() => {
    if (props.data) {
      console.log(">>>>>>>>",props.data.data.data.solved)
      setIsSovled(props.data.data.data.solved)
      setUserId(props.data.data.data.userId)
      setAnswerArr(props.data.data.data.answerList);
    }
  }, [props.data]);

  const answerInput = useRef();

  const onChangeEventHandler = (e) => {
    setAnswer(e.target.value);
    console.log("제출한 정답은 " + answer + " 입니다.");
  };

  // div 클릭 이벤트
  const onClickEventHandler = (e) => {
    const chooseAnswer = e.target.innerText;
    submitAnswer(chooseAnswer);
  };

  const submitAnswer = (finalAnswer) => {
    console.log("정답을 제출합니다.");
    console.log("최종 제출 답안 : " + finalAnswer);
    if (finalAnswer.trim().length === 0) {
      alert("정답을 입력해주세요.");
      answerInput.current.focus();
      return;
    } else {
      alert("정답을 제출합니다. 과연 맞출수 있을까요?!");
      quizSolvingMutateCall(finalAnswer.trim())
      setAnswer("");
    }
  };

  const quizSolvingMutate = useMutation(quizSolving, {
    onSuccess: (res) => {
      if(res.data.success){
        // 서버 통신 성공
        if(res.data.message === '틀렸습니다!'){
          alert("아쉽게 틀렸습니다. 다시 시도해보세요.")
        }

        if(res.data.message ==='또할거야?'){
          alert(`${userId}\n님에 대해 좀더 알아봅시다! 다음번엔 맞추실 수 있을꺼에요.`)
        }

        if(res.data.message ==='정답입니다~!'){
          alert(`정답을 맞추셨어요! 혹시 ${userId}\n님과 조금더 가까워지셨어요.`)
        }

      }else{
        // 서버 통신 실패
        alert(res.data.message)
      }
      queryClient.invalidateQueries("quizDetails");
      
    },
    onError: () => {
      console.log("답안제출통신에러")
    }
  })

  const quizSolvingMutateCall = (finalAnswer) => {
    console.log(":::: 퀴즈 답안제출 최종 전달값, ", { quizId: params.id, correct: finalAnswer })
    quizSolvingMutate.mutate({ quizId: params.id, correct: finalAnswer })
  }

  return (
    <>
      {
        props.isEdit ? (
          <div>수정중 게시글</div>
        ):(
          (answerArr && answerArr.length <= 1) ?
          (
              <CSS.AnswerInputWrapDiv>
                <CSS.AnswerDiv per="14">
                  <CSS.TitleInputWrapDiv>
                    <CSS.TitleInput ref={answerInput} onChange={onChangeEventHandler} type="text" value={answer}></CSS.TitleInput>
                  </CSS.TitleInputWrapDiv>
                </CSS.AnswerDiv>
                <CSS.AnswerDiv per="1">
                  <button onClick={() => submitAnswer(answer)}>제출</button>
                </CSS.AnswerDiv>
            </CSS.AnswerInputWrapDiv>
            )
           :(
            <div className="answerContainer" style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              {answerArr && answerArr.map((answer) => {
                return (
                  <div onClick={onClickEventHandler} style={{ flex: 1, background: "green",height: `calc(100vh - 90vh)`,}}>
                    {answer}
                  </div>
                  );
                })}
            </div>
           ) 
        )
      }
    </>
    )
  }



export default Answer;

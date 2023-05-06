import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from "react-query"; // 서버요청, 쿼리 키 값으로 관리
import { useParams } from 'react-router-dom'; // 패치의 파람
import { useDispatch } from 'react-redux'; //리듀서 실행
import { quizQuiz } from '../api/quiz';

function Answer(props) {
    const params = useParams();
    const dispatcher = useDispatch()

    // 리액트 쿼리 관련
    const queryClient = useQueryClient();
    const { isLoading, isError, data } = useQuery("quizQuiz", ()=>(quizQuiz(1)))
    
    // 내부상태
    const [answerArr, setAnswerArr] = useState()
    const [answer, setAnswer] = useState('')
    useEffect(()=>{
        if(data){
            setAnswerArr(data.data.data.answerList)
        }
    },[data])
    

    const onChangeEventHandler = (e) => {
        setAnswer(e.target.value)
        console.log("제출한 정답은 "+answer+" 입니다.")
    }

    // div 클릭 이벤트
    const onClickEventHandler = (e) => {
        const chooseAnswer = e.target.innerText
        submitAnswer(chooseAnswer)
    }

    const submitAnswer = (finalAnswer) =>{
        console.log("정답을 제출합니다.")
        console.log("최종 제출 답안 : "+finalAnswer)
        setAnswer('')
    }
    

    return (
        <>
        <div className='answerContainer' style={{ display : 'flex', flexDirection : 'row', gap: '10px'}}>
        {(answerArr&&answerArr.length>1)?answerArr.map((answer)=>{ return <div onClick={onClickEventHandler} style={{flex: 1,background:'green', height : `calc(100vh - 90vh)`}}>{answer}</div>}):<><input onChange={onChangeEventHandler} type="text" value={answer}></input><button onClick={()=>(submitAnswer(answer))}>제출</button></>}
        </div>
        </>

    );
}

export default Answer;
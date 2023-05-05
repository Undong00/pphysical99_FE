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
    let answerArr = []
    // useEffect(()=>{
    //     if(data){
    //         console.log("useEffec ", data.data.data.correct)
    //         console.log("useEffec ", data.data.data.incorrect1)
    //         console.log("useEffec ", data.data.data.incorrect2)
    //         console.log("useEffec ", data.data.data.incorrect3)
    //         answerArr.push(data.data.data.correct)
    //         answerArr.push(data.data.data.incorrect1)
    //         answerArr.push(data.data.data.incorrect2)
    //         answerArr.push(data.data.data.incorrect3)
    //     }
    // },[data])

    // data의 data를 프롭스로 넘겨받았다고 가정
    // console.log(">>>>>>>정답",data.data)
    // console.log(">>>>>>>오답",data.data.incorrect1)
    // console.log(">>>>>>>오답",data.data.incorrect2)
    // console.log(">>>>>>>오답",data.data.incorrect3)

    console.log("!!!",answerArr.length)
    return (
        <>
        {answerArr.length>1?answerArr.map((answer)=>(<div>{answer}</div>)):<><input></input><button>제출</button></>}
        </>

    );
}

export default Answer;
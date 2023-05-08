import React, { useState, useEffect } from "react";
//import axios from "axios";
import * as CSS from "../style/commonStyle";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query"
import { quizList } from "../api/quiz"

const List = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]); // 퀴즈 목록을 담을 상태
  const { isLoading, isError, data } = useQuery('quizList', quizList)

  useEffect(()=>{
    if(data){
      setQuizzes(data);  // 가져온 데이터를 상태에 저장
    }
  },[data])

  // useEffect(() => {
  //   const fetchQuizzes = async () => {
  //     const { data: response } = await axios.get(
  //       "https://0a98f1f5-0d64-4224-be67-8457351a3d32.mock.pstmn.io/quiz"
  //     ); // quizList 함수로 퀴즈 목록 가져오기
  //     console.log(response.data);
  //     setQuizzes(response.data);
  //     // 가져온 데이터를 상태에 저장
  //   };
  //   fetchQuizzes();
  // }, []);

  return (
    <CSS.Main>
      <div>
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            onClick={() => {
              navigate(`/quiz/${quiz.id}`);
            }}
          >
            <div>{quiz.title}</div>
            <div>{quiz.content}</div>
            <div>{quiz.solved}</div>
          </div>
        ))}
      </div>
    </CSS.Main>
  );
};

export default List;

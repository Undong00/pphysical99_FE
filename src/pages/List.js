import React, { useState, useEffect } from "react";
//import axios from "axios";
import * as CSS from "../style/commonStyle";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { quizList } from "../api/quiz";

const List = (props) => {
  const navigate = useNavigate();
  // 비동기

  const [quizzes, setQuizzes] = useState([]); // 퀴즈 목록을 담을 상태
  const { isLoading, isError, data } = useQuery("quizList", quizList);
  // const [isdone, setIsDone] = useState(props.data.data.data.solved);

  useEffect(() => {
    if (data) {
      setQuizzes(data.data.data); // 가져온 데이터를 상태에 저장
    }
  }, [data]);

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
        {data ? (
          quizzes.map((quiz) => (
            <div
              key={quiz.id}
              onClick={() => {
                navigate(`/quiz/${quiz.id}`);
              }}
            >
              {console.log(quiz)}
              <div>{quiz.title}</div>
              <div>{quiz.content}</div>
              {quiz.solved ? <div>푼 문제</div> : <div>안 푼 문제</div>}
            </div>
          ))
        ) : (
          <div>로딩중..</div>
        )}
      </div>
    </CSS.Main>
  );
};
export default List;

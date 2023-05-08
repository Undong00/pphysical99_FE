import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useQueryClient } from "react-query"; // 서버요청 및 미들웨어
import { quizList } from "../api/quiz";
import * as CSS from "../style/commonStyle";

function Test() {
  // 리액트 쿼리 관련
  const queryClient = useQueryClient();
  const { isLoading, isError, data } = useQuery("quizList", () => quizList());

  // 데이터를 받아올 내부 상태 선언
  const [quizs, setQuizs] = useState([]);

  useEffect(() => {
    if (data) {
      setQuizs(data);
    }
  }, [data]);

  return (
    <CSS.Main>
      <h1>TEST</h1>
      <div>{!data && quizs.data}</div>
    </CSS.Main>
  );
}

export default Test;

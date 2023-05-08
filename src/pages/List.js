import React, { useState, useEffect } from "react";
// quizList 함수를 import
import axios from "axios";
const List = () => {
  const [quizzes, setQuizzes] = useState([]); // 퀴즈 목록을 담을 상태

  useEffect(() => {
    const fetchQuizzes = async () => {
      const { data: response } = await axios.get(
        "https://0a98f1f5-0d64-4224-be67-8457351a3d32.mock.pstmn.io/quiz"
      ); // quizList 함수로 퀴즈 목록 가져오기
      console.log(response.data);
      setQuizzes(response.data);
      // 가져온 데이터를 상태에 저장
    };
    fetchQuizzes();
  }, []);

  return (
    <div>
      <div>
        {quizzes.map((quiz) => (
          <div key={quiz.id}>
            <div>{quiz.title}</div>
            <div>{quiz.content}</div>
            <div>{quiz.solved}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;

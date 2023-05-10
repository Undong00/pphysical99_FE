import React, { useState, useEffect } from "react";
//import axios from "axios";
import * as CSS from "../style/commonStyle";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { quizList } from "../api/quiz";
import styled from "styled-components";
import { addComment } from "../api/comment";

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
      <ListLayout>
        <Listframe>
          {data ? (
            quizzes.map((quiz) => (
              <div
                key={quiz.id}
                onClick={() => {
                  navigate(`/quiz/${quiz.id}`);
                }}
              >
                {console.log(quiz)}
                <Listboxframe>
                  <Listbox>
                    <div>
                      <ListTitle>
                        <div>{quiz.title}</div>
                        <div>
                          {quiz.solved ? (
                            <div>푼 문제</div>
                          ) : (
                            <div>안 푼 문제</div>
                          )}
                        </div>
                      </ListTitle>
                      <div>{quiz.content}</div>
                    </div>
                  </Listbox>
                </Listboxframe>
              </div>
            ))
          ) : (
            <div>로딩중..</div>
          )}
        </Listframe>
      </ListLayout>
    </CSS.Main>
  );
};
export default List;

const ListLayout = styled.div`
  max-width: 1192px px;
  padding: 28px 20px 0;
`;

const Listframe = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 89%;
  width: 100%;
`;

const Listboxframe = styled.div`
  padding: 0px;
`;

const Listbox = styled.div`
  :hover {
    cursor: pointer;
    box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.2s ease-in-out;
    border-radius: 24px;
    box-sizing: border-box;
    background: #fff;
    color: #f70101;
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
    margin-bottom: 16px;
    padding: 16px;
    width: 100%;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    transition: all 0.2s ease-in-out;
    border: 1px solid #f70101;
    border-radius: 24px;
    box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  align-items: center;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 16px 0;
  padding: 22px;
  width: 100%;
`;

const ListTitle = styled.div`
  font-size: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

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
        <div>
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
                              <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="23"
                                  height="23"
                                  fill="none"
                                  viewBox="0 0 23 23"
                                >
                                  <path
                                    fill="black"
                                    d="M22.25 11.938c0 2.917-1.159 5.715-3.222 7.778-2.063 2.063-4.86 3.221-7.778 3.221-2.917 0-5.715-1.158-7.778-3.221C1.409 17.653.25 14.855.25 11.937c0-2.917 1.159-5.715 3.222-7.778C5.535 2.096 8.332.938 11.25.938c2.917 0 5.715 1.158 7.778 3.221 2.063 2.063 3.222 4.861 3.222 7.779zM16.791 7.77c-.098-.098-.215-.175-.344-.226-.128-.052-.266-.077-.405-.074-.138.003-.275.033-.401.09-.127.057-.24.139-.335.24l-4.775 6.085-2.878-2.88c-.195-.181-.454-.28-.721-.276-.267.005-.522.113-.711.302-.19.189-.297.444-.302.71-.005.268.094.527.277.722l3.638 3.64c.098.098.215.175.343.226.128.052.266.078.404.075.139-.003.275-.033.402-.09.126-.056.24-.137.334-.239l5.49-6.861c.187-.195.29-.455.287-.725-.002-.27-.11-.528-.301-.719h-.002z"
                                  ></path>
                                </svg>
                              </div>
                            ) : (
                              <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="23"
                                  height="23"
                                  fill="none"
                                  viewBox="0 0 23 23"
                                >
                                  <path
                                    fill="#ced4da"
                                    d="M22.25 11.938c0 2.917-1.159 5.715-3.222 7.778-2.063 2.063-4.86 3.221-7.778 3.221-2.917 0-5.715-1.158-7.778-3.221C1.409 17.653.25 14.855.25 11.937c0-2.917 1.159-5.715 3.222-7.778C5.535 2.096 8.332.938 11.25.938c2.917 0 5.715 1.158 7.778 3.221 2.063 2.063 3.222 4.861 3.222 7.779zM16.791 7.77c-.098-.098-.215-.175-.344-.226-.128-.052-.266-.077-.405-.074-.138.003-.275.033-.401.09-.127.057-.24.139-.335.24l-4.775 6.085-2.878-2.88c-.195-.181-.454-.28-.721-.276-.267.005-.522.113-.711.302-.19.189-.297.444-.302.71-.005.268.094.527.277.722l3.638 3.64c.098.098.215.175.343.226.128.052.266.078.404.075.139-.003.275-.033.402-.09.126-.056.24-.137.334-.239l5.49-6.861c.187-.195.29-.455.287-.725-.002-.27-.11-.528-.301-.719h-.002z"
                                  ></path>
                                </svg>
                              </div>
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
        </div>
      </ListLayout>
    </CSS.Main>
  );
};
export default List;

const ListLayout = styled.div`
  max-width: 1192px px;
  padding: 28px 20px 0;

  height: 100%;
`;

const Listframe = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 89%;
  width: 100%;
  height: 700px;
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

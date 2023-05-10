import React, { useState, useEffect } from "react";
import Body from "../components/Body";
import Title from "../components/Title";
import Comment from "../components/Comment";
import { useDispatch, useSelector } from "react-redux";
import { isEdit } from "../redux/modules/componentMode";
import Answer from "../components/Answer";
import * as CSS from "../style/commonStyle";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { quizDetails, quizModify, quizDelete } from "../api/quiz";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../cookie/Cookie";

// 수정 시 버튼 바꾸기,
function Quiz() {
  const navigate = useNavigate();
  const { id } = useParams();

  // 액션객체를 시행하기 위핸 디스패쳐를 선언한다.
  const dispatch = useDispatch();

  //전역 스토어에서 현재 게시글이 수정상태인지 여부를 가져온다.
  const isEditMode = useSelector((state) => state.componentMode.isEdit);

  //내부 상태. 현재 접속된 유저아이디와 게시글을 등록한 사용자가 동일인물인지 판단.
  const [isMine, setIsMine] = useState(false)

  // 상세조회
  const queryClient = useQueryClient();
  const { isLoading, isError, data } = useQuery("quizDetails", () =>
    quizDetails(id)
  );

  // useEffect
  useEffect(() => {
    if (data) {
      console.log(`[INFO] 게시글 상세조회가 성공했습니다.`, data.data.data.userId)
      if (getCookie("userId") === data.data.data.userId) {
        setIsMine(true)
      }
    }

  }, [data])
  // 수정
  const quizModifyMutate = useMutation(quizModify, {
    onSuccess: () => {
      queryClient.invalidateQueries("quizDetails");
    },
    onError: () => {
      console.log("수정에러");
    },
  });

  // 삭제
  const quizDeleteMutate = useMutation(quizDelete, {
    onSuccess: () => {
      alert("삭제완료하였습니다.");
      navigate("/list");
    },
    onError: () => {
      console.log("삭제에러");
    },
  });

  const handleButtonClick = (e) => {
    dispatch(isEdit(!isEditMode));
    if (e.target.innerText === "수정완료") {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    console.log(":::: 퀴즈 수정 최종 전달값, ", {
      quizId: id,
      modifyValue: questionObj,
    });
    quizModifyMutate.mutate({ quizId: id, modifyValue: questionObj });
  };

  const deleteHandler = (quizId) => {
    console.log(":::: 퀴즈 삭제 최종 전달값, ", id);
    quizDeleteMutate.mutate(id);
  };

  // 서버에 담을 값들
  const [questionObj, setQuestionObj] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    if (data) {
      setQuestionObj({
        title: data.data.data.title,
        content: data.data.data.content
      })
    }
  }, [data])

  const getQuestinObj = (x) => {
    const resolve = { x };
    setQuestionObj({ ...questionObj, ...resolve.x });
  };

  useEffect(() => {
    console.log(questionObj);
  }, [questionObj]);

  if (isLoading) {
    return <h1>로딩중입니다.</h1>
  }
  if (isError) {
    return <h1>에러</h1>
  }

  return (
    <CSS.Main>
      <CSS.QuizHeaderWrapDiv>
        <CSS.QuizTitleDiv per="13">
          <Title
            isEdit={isEditMode}
            data={data}
            getQuestinObj={getQuestinObj}
          />
        </CSS.QuizTitleDiv>
        {isMine?(
        <>
          <CSS.QuizTitleDiv per="1">{isEditMode ? <CSS.QuizPraimarhyButton onClick={handleButtonClick} >수정완료</CSS.QuizPraimarhyButton> : <CSS.QuizNagativeButton onClick={handleButtonClick}>수정하기</CSS.QuizNagativeButton>}
          </CSS.QuizTitleDiv>
          <CSS.QuizTitleDiv per="1">
            <CSS.QuizNagativeButton onClick={deleteHandler}>
              삭제하기
            </CSS.QuizNagativeButton>
          </CSS.QuizTitleDiv>
        </>
        ):(
          <></>
        )}
      </CSS.QuizHeaderWrapDiv>

      <Body isEdit={isEditMode} data={data} getQuestinObj={getQuestinObj} />
      <Answer isEdit={isEditMode} data={data} />
      <Comment data={data} />
    </CSS.Main>
  );
}

export default Quiz;

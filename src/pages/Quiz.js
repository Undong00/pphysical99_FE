import React,{ useState, useEffect} from "react";
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

// 수정 시 버튼 바꾸기,
function Quiz() {
  const { id } = useParams();

  // 액션객체를 시행하기 위핸 디스패쳐를 선언한다.
  const dispatch = useDispatch();
  //전역 스토어에서 현재 게시글이 수정상태인지 여부를 가져온다.
  const isEditMode = useSelector((state) => state.componentMode.isEdit);
  
  // 상세조회
  const queryClient = useQueryClient();
  const { isLoading, isError, data } = useQuery("quizDetails", () => quizDetails(id));

  // 수정
  const quizModifyMutate = useMutation(quizModify, {
    onSuccess: () => {
      // TODO 새로 리로딩 하는 거 추가.
    },
    onError: ()=>{
      console.log("수정에러")
    }
  })

  // 삭제
  const quizDeleteMutate = useMutation(quizDelete, {
    onSuccess: () => {
      // TODO 삭제 성공후 화면 이동
      alert("삭제완료하였습니다.")
    },
    onError: ()=>{
      console.log("삭제에러")
    }
  })

  const handleButtonClick = (e) => {
    dispatch(isEdit(!isEditMode));
    if (e.target.innerText === "✅") {
      modifyHandler()
    }
  };

  const modifyHandler = () => {
    console.log(":::: 퀴즈 수정 최종 전달값, ",{quizId:id, modifyValue:questionObj})
    quizModifyMutate.mutate({quizId:id, modifyValue:questionObj})
  }

  const deleteHandler = (quizId) => {
    console.log(":::: 퀴즈 삭제 최종 전달값, ",id)
    quizDeleteMutate.mutate(id)
  }
  
  // 서버에 담을 값들
  const [questionObj, setQuestionObj] = useState({
    title: "",
    content: "",
  });

  const getQuestinObj = (x) => {
    const resolve = { x };
    setQuestionObj({ ...questionObj, ...resolve.x });
  };

  useEffect(() => {
    console.log(questionObj);
  }, [questionObj]);


  // 조회 로딩, 조회 에러시 화면에 나타날 내용 TODO 서버랑 붙이고 주석풀기
  // if (isLoading) {
  //   return <h1>로딩중입니다.</h1>
  // }
  // if (isError) {
  //   return <h1>에러</h1>
  // }

  return (
    <CSS.Main>
      <Title isEdit={isEditMode} data={data} getQuestinObj={getQuestinObj}/>
      <button onClick={deleteHandler}>삭제하기</button>
      <button onClick={handleButtonClick}>{isEditMode ? "✅" : "✍️"}</button>
      <Body isEdit={isEditMode} data={data} getQuestinObj={getQuestinObj}/>
      <Answer isEdit={isEditMode} data={data} />
      <Comment data={data}/>
    </CSS.Main>
  );
}

export default Quiz;

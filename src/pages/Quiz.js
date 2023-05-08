import React from "react";
import Body from "../components/Body";
import Title from "../components/Title";
import Comment from "../components/Comment";
import { useDispatch, useSelector } from "react-redux";
import { isEdit } from "../redux/modules/componentMode";
import Answer from "../components/Answer";
import * as CSS from "../style/commonStyle";

// 수정 시 버튼 바꾸기,
function Quiz() {
  // 액션객체를 시행하기 위핸 디스패쳐를 선언한다.
  const dispatch = useDispatch();
  //전역 스토어에서 현재 게시글이 수정상태인지 여부를 가져온다.
  const isEditMode = useSelector((state) => state.componentMode.isEdit);
  // 디스패쳐를 통해 import한 isEdit에 값을 넘겨준다.
  // true, false를 명시적으로 넘겨줌. 수정모드 하고시으면 이걸 트루로 버튼에서 바꿔준다.
  const handleButtonClick = () => {
    dispatch(isEdit(!isEditMode));
  };
  return (
    <CSS.Main>
      {/* <Title /> */}
      <button>삭제하기</button>
      <button onClick={handleButtonClick}>{isEditMode ? "✍️" : "✅"}</button>
      {/* <Body /> */}
      <Answer isEdit={isEditMode} />
      <Comment />
    </CSS.Main>
  );
}

export default Quiz;

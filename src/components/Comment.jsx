import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addComment, deleteComment } from "../api/comment";
import { useParams } from "react-router-dom";
import { getCookie } from "../cookie/Cookie";
import styled from "styled-components";

function CommentList(props) {
  //리액트 쿼리 관련
  const queryClient = useQueryClient();

  const userId = getCookie("userId");

  // 내부 스테이트
  const params = useParams();
  const [commentList, setCommentList] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [postId, setPostId] = useState("");
  const [commentId, setCommentId] = useState("");

  useEffect(() => {
    if (props.data) {
      setPostId(props.data.id);
      if (Array.isArray(props.data.data.data.commentList)) {
        setCommentList([...props.data.data.data.commentList]);
      }
    }
  }, [props.data]);

  const handleNewComment = (e) => {
    setNewComment(e.target.value);
  };
  const addCommentMutate = useMutation(addComment, {
    onSuccess: (reponse) => {
      //TODO 댓글 새로 조회 추가 window.location.reload();

      // setCommentList((reloadCommentList) => [
      //   // 붙이면서
      //   ...reloadCommentList,
      //   { id: reponse.data.data, comment: newComment }, // 댓글의 아이디
      // ]);
      queryClient.invalidateQueries("quizDetails");
      setNewComment("");
    },
    onError: () => {
      console.log("에러발생함");
    },
  });

  const addCommentMutateCall = () => {
    console.log(":::: /comment/quizId 댓글 등록 최종전달값,", {
      postId: params.id,
      comment: newComment,
    });
    addCommentMutate.mutate({ postId: params.id, comment: newComment });
  };

  const deleteCommentMutate = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("quizDetails");
      // //TODO 댓글 목록 새로 조회 추가 window.location.reload();
      // setCommentList((reloadCommentList) =>
      //   reloadCommentList.filter((comment) => comment.id !== commentId)
      // );
    },
    onError: () => {
      console.log("댓글 삭제중 에러 발생함");
    },
  });

  const deleteCommentMutateCall = (id) => {
    setCommentId(id);
    console.log(":::: /comment/commentId 댓글 삭제 최종전달값,", id);
    deleteCommentMutate.mutate(id);
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <ComentInput
            placeholder="댓글을 입력해주세요"
            type="text"
            value={newComment}
            onChange={handleNewComment}
          />
          <ComentAddBtn onClick={() => addCommentMutateCall()}>
            댓글 추가
          </ComentAddBtn>
        </div>
      </form>

      <div>
        {commentList.map((comment) => (
          <div key={comment.id}>
            <ComentLayout>
              <ComentListheader>
                <ComHeaderWrapDiv>
                  <CommentImg src="https://spartacodingclub.kr/v5/images/profile/6.png" />
                  {comment.userId}
                </ComHeaderWrapDiv>
                {comment.userId === userId ? (
                  <CommentDeleteBtn
                    onClick={() => deleteCommentMutateCall(comment.id)}
                  >
                    ❌
                  </CommentDeleteBtn>
                ) : null}
              </ComentListheader>
              {comment.comment}
            </ComentLayout>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentList;

const ComentInput = styled.input`
  height: 44px px;
  padding: 10px 14px 11px;
  letter-spacing: inherit;
  border: 1px solid rgb(234, 235, 239);
  border-radius: 4px;
  box-sizing: border-box;
  display: inline-block;
  width: 100%;
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  font-family: "Noto Sans KR", "Noto Sans CJK KR", "맑은 고딕", "Malgun Gothic",
    sans-serif;
  font-size: 15px;
  line-height: 21px;
  resize: none;
  margin: 0px;
  transition: border-color 0.1s ease 0s, background-color 0.1s ease 0s;
`;
const ComentLayout = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-align-items: flex-start;
  -webkit-box-align: flex-start;
  -ms-flex-align: flex-start;
  align-items: flex-start;
  padding: 24px 0px;
  gap: 12px;
  width: 100%;
  border-bottom: 1px solid #d7e0e6;
  position: relative;
`;

const ComentListheader = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-align-items: flex-start;
  -webkit-box-align: flex-start;
  -ms-flex-align: flex-start;
  align-items: flex-start;
  padding: 0px;
  gap: 6px;
  width: 100%;
  margin-bottom: 20px;
`;

const ComentAddBtn = styled.button`
  width: 100%;
  height: 48px;
  background-color: rgb(232, 52, 78);
  border-radius: 8px;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  color: rgb(255, 255, 255);
  line-height: 48px;
  cursor: pointer;
  border: 0px solid black;
  margin-bottom: 50px;
  transition: background-color 0.1s ease 0s;
  &:hover {
    background-color: rgb(196, 101, 101);
  }
  &:active {
    background-color: rgb(196, 101, 101);
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: rgb(232, 52, 78);
    cursor: not-allowed;
  }
  &:active {
    background-color: rgb(232, 52, 78);
  }
`;

const CommentImg = styled.img`
  width: 40px;
  border-radius: 50%;
`;

const CommentDeleteBtn = styled.button`
  border: none;
  background: none;
  font-size: 30px;
  font-weight: 700;
  color: rgb(255, 255, 255);
  cursor: pointer;
  padding: 0px;
  margin: 0px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  &:hover {
    background-color: rgb(234, 235, 239);
  }
  &:active {
    background-color: rgb(234, 235, 239);
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: rgb(234, 235, 239);
  }
  &:active {
    background-color: rgb(234, 235, 239);
  }
  &:focus {
    outline: none;
  }
`;

const ComHeaderWrapDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

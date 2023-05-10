import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addComment, deleteComment } from "../api/comment";
import { useParams } from "react-router-dom";
import { getCookie } from "../cookie/Cookie";
import * as CSS from "../style/commonStyle"

function CommentList(props) {
  //리액트 쿼리 관련
  const queryClient = useQueryClient();

  // 현재 접속한 사용자 Id
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
    console.info("[INFO] /comment/quizId 댓글 등록", {
      postId: params.id,
      comment: newComment,
    });
    if(newComment.trim()){
      addCommentMutate.mutate({ postId: params.id, comment: newComment });
    }else{
      alert("공백이나 빈 값은 댓글을 달 수 없습니다.")
      setNewComment('')
    }
    
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
      console.error("[ERROR] 서버 통신 에러 - 댓글 삭제 중 에러 발생");
    },
  });

  const deleteCommentMutateCall = (id) => {
    setCommentId(id);
    console.info("[INFO] /comment/commentId 댓글 삭제", id);
    deleteCommentMutate.mutate(id);
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <CSS.ComentInput
            placeholder="댓글을 입력해주세요"
            type="text"
            value={newComment}
            onChange={handleNewComment}
          />
          <CSS.ComGapDiv gap='5'/>
          <CSS.ComentAddBtn onClick={() => addCommentMutateCall()}>
            댓글 추가
          </CSS.ComentAddBtn>
        </div>
      </form>

      <div>
        {commentList.map((comment) => (
          <div key={comment.id}>
            <CSS.ComentLayout>
              <CSS.ComentListheader>
                <CSS.CommentHeaderWrapDiv>
                  <CSS.CommentImg src="https://spartacodingclub.kr/v5/images/profile/6.png" />
                  {comment.userId}
                </CSS.CommentHeaderWrapDiv>
                {comment.userId === userId ? (
                  <CSS.CommentDeleteBtn
                    onClick={(e) => deleteCommentMutateCall(comment.id)}
                  >
                    ❌
                  </CSS.CommentDeleteBtn>
                ) : null}
              </CSS.ComentListheader>
              {comment.comment}
            </CSS.ComentLayout>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentList;



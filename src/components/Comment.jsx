import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addComment, deleteComment } from "../api/comment";
import { useParams } from "react-router-dom";

function CommentList(props) {
  //리액트 쿼리 관련
  const queryClient = useQueryClient();

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
        <input
          placeholder="댓글을 입력해주세요"
          type="text"
          value={newComment}
          onChange={handleNewComment}
        />
        <button onClick={() => addCommentMutateCall()}>댓글 추가</button>
      </form>

      <div>
        {commentList.map((comment) => (
          <div key={comment.id}>
            {comment.comment}
            {comment.userId === props.data.data.data.userId ? (
              <button onClick={() => deleteCommentMutateCall(comment.id)}>
                삭제하기
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentList;

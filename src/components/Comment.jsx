import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { addComment, deleteComment } from "../api/comment";
import { useParams } from "react-router-dom";

function CommentList(props) {
  const params = useParams();
  const [commentList, setCommentList] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [postId, setPostId] = useState("");
  const [commentId, setCommentId] = useState("");

  useEffect(() => {
    if (props.data) {
      setPostId(props.data.data.data.id);
      setCommentList([...props.data.data.data.commentList]);
    }
  }, [props.data]);

  const handleNewComment = (e) => {
    setNewComment(e.target.value);
  };

  const addCommentMutate = useMutation(addComment, {
    onSuccess: (reponse) => {
      //TODO 댓글 새로 조회 추가 window.location.reload();
      setCommentList((reloadCommentList) => [
        ...reloadCommentList,
        { id: reponse.data, comment: newComment }, // 댓글의 아이디
      ]);
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
      //TODO 댓글 목록 새로 조회 추가 window.location.reload();
      setCommentList((reloadCommentList) => [
        reloadCommentList.fillter((comment) => comment.id !== commentId),
      ]);
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
            <button onClick={() => deleteCommentMutateCall(comment.id)}>
              삭제하기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentList;

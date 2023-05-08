import React, { useState, useEffect } from "react";
import { useMutation} from "react-query";
import { addComment, deleteComment } from "../api/comment";

function CommentList(props) {
  const [commentList, setCommentList] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [postId, setPostId] = useState('')
  
  useEffect(() => {
    if (props.data) {
      setPostId(props.data.data.data.id);
      setCommentList([...props.data.data.data.commentList]);
    }
  }, [props.data]);

  const handleNewComment = (e) => {
    setNewComment(e.target.value);
  };

  const addCommentMutate = useMutation(addComment,{
    onSuccess: () => {
      //TODO 댓글 새로 조회 추가 window.location.reload();
      setNewComment("");
    },
    onError: ()  => {
      console.log("에러발생함")
    }
  })

  const addCommentMutateCall = ()=>{
    console.log(":::: /comment/quizId 댓글 등록 최종전달값,",{postId:postId, comment:newComment})
    addCommentMutate.mutate({postId:postId, comment:newComment}) 
  }
  
  const deleteCommentMutate = useMutation(deleteComment,{
    onSuccess:()=>{
      //TODO 댓글 목록 새로 조회 추가 window.location.reload();
    },
    onError:()=>{
      console.log("댓글 삭제중 에러 발생함")
    }
  })

  const deleteCommentMutateCall = (id)=>{
    console.log(":::: /comment/commentId 댓글 삭제 최종전달값,",id)
    deleteCommentMutate.mutate(id)
  }

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
            <button onClick={() => deleteCommentMutateCall(comment.id)}>삭제하기</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentList;

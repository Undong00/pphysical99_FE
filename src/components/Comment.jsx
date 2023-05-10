import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addComment, deleteComment } from "../api/comment";
import { useParams } from "react-router-dom";
import { getCookie } from "../cookie/Cookie";
import * as CSS from "../style/commonStyle"
import Swal from "sweetalert2"

function CommentList(props) {
    // 얼럿 함수 정의
    const swalComfirm = (msg, type, callbackFun)=>{
      Swal.fire({
        icon: type,
        title: msg,
        allowOutsideClick: false, // 화면 밖을 눌러도 화면이 안꺼짐
        showCancelButton: false,
        confirmButtonColor: '#E8344D',
        confirmButtonText: '확인'
      }).then((result) => {
        if (result.isConfirmed && callbackFun) {
          callbackFun()
        }
      })
    }

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
      queryClient.invalidateQueries("quizDetails");
      setNewComment("");
    },
    onError: () => {
      console.error("[ERROR] 서버통신에러- 댓글 등록 중 에러 발생");
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
      swalComfirm("공백은 댓글로 등록할 수 없습니다.", 'warning')
      setNewComment('')
    }
    
  };

  const deleteCommentMutate = useMutation(deleteComment, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("quizDetails");
      swalComfirm(response.data.message, 'info')
    },
    onError: (error) => {
      swalComfirm(error.data.message, 'error')
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



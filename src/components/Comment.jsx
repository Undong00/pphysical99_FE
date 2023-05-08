import React, { useState, useEffect } from "react";
import axios from "axios";

function CommentList() {
  const [commentList, setCommentList] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleNewComment = (e) => {
    setNewComment(e.target.value);
  };

  const addComment = async () => {
    const response = await axios.post("http://localhost:4000/commentList", {
      comment: newComment,
    });
    console.log(response);
    setNewComment("");
    window.location.reload();
  };

  const deleteComment = async (id) => {
    const response = await axios.delete(
      `http://localhost:4000/commentList/${id}`
    );
    console.log(response);
    setCommentList(commentList.filter((comment) => comment.id !== id));
    window.location.reload();
  };

  useEffect(() => {
    const getCommentList = async () => {
      try {
        const response = await axios.get("http://localhost:4000/commentList");
        console.log(response.data);
        setCommentList(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCommentList();
  }, []);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          placeholder="댓글을 입력해주세요"
          type="text"
          value={newComment}
          onChange={handleNewComment}
        />
        <button onClick={() => addComment()}>댓글 추가</button>
      </form>

      <div>
        {commentList.map((comment) => (
          <div key={comment.id}>
            {comment.comment}
            <button onClick={() => deleteComment(comment.id)}>삭제하기</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentList;

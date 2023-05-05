import React, { useState } from "react";
// 댓글 추가, 댓글 삭제
function Comment() {
  const [users, setUser] = useState([
    {
      id: 1,
      comment: "This is a comment",
    },
  ]);

  const [comment, setComment] = useState("");

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const addcommnet = () => {
    // 추가 버튼
    const newComment = {
      id: users.length + 1,
      comment: comment,
    };
    setUser([...users, newComment]);
    setComment("");
  };
  //삭제 버튼
  const deleteComment = (id) => {
    const delComment = users.filter((comment) => comment.id !== id);
    setUser(delComment);
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          placeholder="댓글을 입력해주세요"
          type="text"
          value={comment}
          onChange={handleInputChange}
        />
        <button onClick={() => addcommnet()}>댓글 추가</button>
      </form>

      <div>
        {users.map((user) => (
          <div key={user.id}>
            {user.comment}
            <button onClick={() => deleteComment(user.id)}>삭제하기</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comment;

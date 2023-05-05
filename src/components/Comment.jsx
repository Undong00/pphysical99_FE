import React, { useState } from "react";
// 댓글
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

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" value={comment} onChange={handleInputChange} />
        <button onClick={addcommnet}>Add Comment</button>
      </form>

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.comment}</li>
        ))}
      </ul>
    </div>
  );
}

export default Comment;

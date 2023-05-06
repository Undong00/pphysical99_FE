import React from "react";
// 등록하기

const [users, setUsers] = useState([
  {
    id: 1,
    title: title,
    body: body,
  },
]);
// 퀴즈 등록
const addQuiz = () => {
  const newQuiz = {
    id: users.length + 1,
    quiz: "",
  };
  setUsers([...users, newQuiz]);
};

function Register() {
  return (
    <div>
      <h1>레지스터입니다.</h1>
    </div>
  );
}

export default Register;

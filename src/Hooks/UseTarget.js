import { useState } from "react";

// input hook
export function useInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const handlechange = (e) => setValue(e.target.value);
  return [value, handlechange];
}

// const confirmOnChangeHandler = (e) => {
//   setConfirmPostPw(e.target.value);
//   setHelpMsg("");
// };

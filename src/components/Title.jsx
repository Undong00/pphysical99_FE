import React from "react";
import { useState } from "react";
function Title() {
  const [title, setTitle] = useState("");
  const titlechange = (e) => {
    setTitle(e.target.value);
  };
  return (
    <div>
      <input type="text" value={title} onChange={titlechange} />
    </div>
  );
}

export default Title;

import React from "react";
import { useState } from "react";

function Body() {
  const [body, setBody] = useState("");
  const Bodychange = (e) => {
    setBody(e.target.value);
  };
  return (
    <div>
      <textarea type="text" value={body} onChange={Bodychange} />
    </div>
  );
}

export default Body;

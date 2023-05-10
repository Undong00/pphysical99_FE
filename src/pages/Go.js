import React, { useEffect, useRef, useState } from "react";
import YoutubeBackground from "react-youtube-background";
import styled from "styled-components";
import btn_start from "../assets/btn_start.png";
import { useNavigate } from "react-router-dom";

function Go() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerWidth > 0) {
      navigate("/go");
    }
  }, [containerWidth, navigate]);

  useEffect(() => {
    if (containerWidth > 0) {
      navigate("/go");
    }
  }, [containerWidth, navigate]);

  return (
    <YoutubeBackground
      style={{ position: "absolute", width: "100%", height: "100vh" }}
      videoId="UNJlmGrG2lM"
      className="my-class"
      onReady={() => console.log("Player is ready")}
      onEnd={() => console.log("Video has ended")}
      mute={false}
    >
      <div
        style={{
          border: "none",
          position: "fixed",
          bottom: "0",
          left: "650px",
        }}
        ref={containerRef}
      >
        <img src={btn_start} width="500px" onClick={() => navigate("/")} />
      </div>
    </YoutubeBackground>
  );
}

export default Go;

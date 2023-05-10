import React from "react";
import YoutubeBackground from "react-youtube-background";
import styled from "styled-components";
import btn_start from "../assets/btn_start.png";
import { useNavigate } from "react-router-dom";

function Go() {
  const navigate = useNavigate();

  return (
    // <YoutubeContainerStyle>
    <YoutubeBackground
      style={{ position: "absolute", width: "100%", height: "100vh" }}
      videoId="UNJlmGrG2lM"
      // aspectRatio="16.9"
      //  overlay="rgba(0,0,0,.4)"
      className="my-class"
      onReady={() => console.log("Player is ready")}
      onEnd={() => console.log("Video has ended")}
      mute="false"
    >
      <button
        onClick={() => navigate("/")}
        type="button"
        style={{
          border: "none",
          position: "fixed",
          bottom: "0",
          left: "35%",
          width: "500px",
        }}
      >
        <img src={btn_start} />
      </button>
    </YoutubeBackground>
    // </YoutubeContainerStyle>
  );
}

export default Go;

const YoutubeContainerStyle = styled.div`
  /* background-color: green; */
  width: 100%;
  height: 100vh;
`;

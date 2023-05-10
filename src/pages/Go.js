import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import YoutubeBackground from "react-youtube-background";
import btn_start from "../assets/btn_start.png";
import { useNavigate } from "react-router-dom";

// function Go() {
//   const navigate = useNavigate();
//   const containerRef = useRef(null);
//   const [containerWidth, setContainerWidth] = useState(0);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (container) {
//       setContainerWidth(container.clientWidth);
//     }
//   }, [containerRef]);

//   useEffect(() => {
//     if (containerWidth > 0) {
//       navigate("/");
//     }
//   }, [containerWidth, navigate]);

//   return (
//     <YoutubeBackground
//       style={{ position: "absolute", width: "100%", height: "100vh" }}
//       videoId="UNJlmGrG2lM"
//       className="my-class"
//       onReady={() => console.log("Player is ready")}
//       onEnd={() => console.log("Video has ended")}
//       mute={false}
//       stopOnUnmount={true}
//     >
//       <div
//         style={{
//           position: "fixed",
//           top: "90%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           border: "none"
//         }}
//         ref={containerRef}
//       >
//         <img
//           src={btn_start}
//           width="500px"
//           onClick={() => navigate("/home")}
//           alt=""
//         />
//       </div>
//     </YoutubeBackground>
//   );
// }

// function Go() {
//   const navigate = useNavigate();
//   const [browserWidth, setBrowserWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => {
//       setBrowserWidth(window.innerWidth);
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     if (browserWidth > 0) {
//       navigate("/");
//     }
//   }, [browserWidth, navigate]);

//   return (
//     <YoutubeBackground
//       style={{ position: "absolute", width: "100%", height: "100vh" }}
//       videoId="UNJlmGrG2lM"
//       className="my-class"
//       onReady={() => console.log("Player is ready")}
//       onEnd={() => console.log("Video has ended")}
//       mute={false}
//       stopOnUnmount={true}
//     >
//       <div
//         style={{
//           position: "fixed",
//           top: "90%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           border: "none",
//         }}
//       >
//         <img
//           src={btn_start}
//           width="500px"
//           onClick={() => navigate("/home")}
//         />
//       </div>
//     </YoutubeBackground>
//   );
// }

function YoutubeBackgroundWithIsMounted(props) {
  const { setIsMounted, ...rest } = props;

  useEffect(() => {
    if (setIsMounted) {
      setIsMounted(true);
      return () => setIsMounted(false);
    }
  }, [setIsMounted]);

  return <YoutubeBackground {...rest} />;
}

function Go() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted && containerWidth > 0) {
      navigate("/");
    }
  }, [containerWidth, isMounted, navigate]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      setContainerWidth(container.clientWidth);
      setIsMounted(true);
    }
  }, [containerRef, setContainerWidth, setIsMounted]);

  return (
    <YoutubeBackgroundWithIsMounted
      style={{ position: "absolute", width: "100%", height: "100vh" }}
      videoId="UNJlmGrG2lM"
      className="my-class"
      onReady={() => console.log("Player is ready")}
      onEnd={() => console.log("Video has ended")}
      mute={false}
      stopOnUnmount={true}
      setIsMounted={setIsMounted}
    >
      <div
        style={{
          position: "fixed",
          top: "90%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "none"
        }}
        ref={containerRef}
      >
        <img
          src={btn_start}
          width="500px"
          onClick={() => navigate("/home")}
          alt=""
        />
      </div>
    </YoutubeBackgroundWithIsMounted>
  );
}

export default Go;










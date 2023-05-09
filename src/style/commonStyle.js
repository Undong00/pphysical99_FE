import styled from "styled-components";

export const Main = styled.main`
  padding-top: 130px;
  min-height: calc(100vh-130px); // 헤더와 네비 높이만큼 제외
`;

export const ComHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  color: black;
  z-index: 98;
  display: flex;
  align-items: center;
  gap: 40px;
  padding-left: 0px;
  justify-content: flex-start;
`;

export const ComHeaderWrapDiv = styled.div`
  width: 90%;
  max-width: 1200px;
  height: 60px;
  -webkit-transition: all 0.4s ease;
  transition: all 0.4s ease;
  margin: auto;

  display: flex;
  width: 100%;
  height: 50px;
  transition: all 0.4s ease;
  align-items: center;
  position: relative;
  z-index: 150;
  top: 0;
  justify-content: space-between;
  padding-right: 16px;
`

export const ComNavi = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  height: 80px;
  color: black;
  z-index: 98;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: flex-end;
`;

export const NaviBtnWrapdDiv = styled.div`
  display: flex;
  gap : 5px
`
export const NaviPrimaryBtn = styled.button`
    width: 150px;
    height: 48px;
    background-color: rgb(232, 52, 78);
    border-radius: 8px;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 700;
    color: rgb(255, 255, 255);
    line-height: 48px;
    cursor: pointer;
    border: 0px solid black;
`
export const NaviNagativeBtn = styled.button`
    width: 150px;
    border-radius: 8px;
    padding: 0px 16px;
    background-color: rgb(242, 246, 248);
    height: 48px;
    font-family: Pretendard;
    font-style: normal;
    font-size: 16px;
    /* line-height: 48px; */
    font-weight: 700;
    color: rgb(20, 22, 23);
    cursor: pointer;
    border: 0px solid black;
`

/** Home.jsx */
export const HomeWrapDiv = styled.div`
    border-radius : 20px;
    overflow: hidden;
    position: absolute;
    width: 340px;
    left: 50%;
    transform: translate(-50%, 50%);
    height: 500px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    flex-direction: column;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 32px;
    
`
export const HomeMessageDiv = styled.div`
  font-family: Noto Sans KR,Source Sans Pro,sans-serif;
  color: #333;
  font-size: 25px;
  font-stretch: normal;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -1.25px;
  line-height: 1.58;
  margin: 0;
  text-align: center;
`

export const HomeImgHeaderDiv = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
`

export const HomeInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: rgb(95, 102, 107);
  font-family: Noto Sans KR,sans-serif;
  padding: 1px 2px;
`
export const HomeInputWrapDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  padding: 16px 5px;
  border-radius: 8px;
  border: 1px solid rgb(228, 235, 240);
  margin-top: 8px;
`

export const HomeWrapHomeForm = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`

export const Button = styled.button`
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-stretch: normal;
  font-style: normal;
  font-weight: 500;
  height: auto;
  letter-spacing: -.66px;
  line-height: 1.36;
  margin-top: 40px;
  padding: 18px 30px;
  width: 100%;
  /**Primary */
  background-color: #e8344e;
  border-color: #e8344e;
  box-shadow: 0 2px 0 rgba(0, 0, 0, .045);
  color: #fff;
  text-shadow: 0 1px 0 rgba(0, 0, 0, .12);
`

export const HomeButtonWrapDiv = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`

export const HomeSpan = styled.span`
    color: #000;
    cursor: pointer;
    font-size: 15px;
`
export const HomeSpankWrapDiv = styled.div`
    margin: 20px auto;
    text-align: center;
    width: 100%;
`

/** Join.jsx */
export const JoinButton = styled.div`
  width: 100%;
  color: #e8344e;
  background-color: #ffffff;
  border: 1px solid #e8344e;
  padding: 18.5px;
  cursor: pointer;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-family: Pretendard,-apple-system,“system-ui”,"Malgun Gothic","맑은 고딕",sans-serif;
  font-size: 16px;
  font-weight: bold;
  width: 180px;
  height: 52px;
  margin-top: 8px;
`
export const JoinIptBtnWrap = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    gap: 5px;
`

/**TITLE PAGE */

export const TitleInputWrapDiv = styled.div`
    margin: 16px 0;
`
export const TitleInput = styled.input`
    height: 44px;
    padding: 10px 14px 11px;
    font-size: 16px;
    line-height: inherit;
    letter-spacing: inherit;
    border: 1px solid #eaebef;
    border-radius: 4px;
    box-sizing: border-box;

    display: inline-block;
    width: 100%;
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    font-family: "Noto Sans KR", "Noto Sans CJK KR", "맑은 고딕", "Malgun Gothic", sans-serif;
    font-size: 15px;
    line-height: 21px;
    resize: none;
    margin: 0px;
    transition: border-color 0.1s ease 0s, background-color 0.1s ease 0s;
`

/** ANSWER */
export const AnswerInputWrapDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap : 5px;
  align-items: center;

`
export const AnswerDiv = styled.div`
  flex-grow : ${(props) => {
    return props.per
  }}
`

/** Quzi */
export const QuizHeaderWrapDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap : 5px;
  align-items: center;

`
export const QuizTitleDiv = styled.div`
  flex-grow : ${(props) => {
        return props.per
  }}
`
export const QuizNagativeButton = styled.div`
box-sizing: content-box;
    background-color: #e9ecef;
    border-radius: 20px;
    color: #000;
    font-family: Spoqa Han Sans Neo,"sans-serif";
    font-size: 15px;
    font-stretch: normal;
    font-style: normal;
    font-weight: 500;
    letter-spacing: -.45px;
    line-height: 1;
    padding: 10px 15px;
    text-align: center;
    cursor: pointer;
`

export const QuizPraimarhyButton = styled.div`
box-sizing: content-box;
    border-radius: 20px;
    font-family: Spoqa Han Sans Neo,"sans-serif";
    font-size: 15px;
    font-stretch: normal;
    font-style: normal;
    font-weight: 500;
    letter-spacing: -.45px;
    line-height: 1;
    padding: 10px 15px;
    text-align: center;
    cursor: pointer;
    background-color: #000;
    color: #fff;
`

/* BODY */
export const BodyTextarea = styled.textarea`
  overflow: hidden;
  overflow-wrap: break-word;
  
  padding: 10px 14px 11px;
    
  line-height: inherit;
  letter-spacing: inherit;
  border: 1px solid #eaebef;
  border-radius: 4px;
  box-sizing: border-box;
  overflow-y: auto!important;
  height: 173px!important;
  line-height: 1.4;

  display: inline-block;
  width: 100%;
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  font-family: "Noto Sans KR", "Noto Sans CJK KR", "맑은 고딕", "Malgun Gothic", sans-serif;
  font-size: 15px;
  resize: none;
  margin: 0px;
  transition: border-color 0.1s ease 0s, background-color 0.1s ease 0s;
`
/**Answer */
export const AlertWrapDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 20px;
    gap: 14px;
    background-color: #ffeeee;
    border-radius: 8px;
    margin-bottom: 24px;
    width: 100%;
    margin: 0;
    line-height: 1.5;
`
export const ContentDiv = styled.div`
    font-family: Pretendard, -apple-system, “system-ui”, "Malgun Gothic", "맑은 고딕", sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: rgb(0, 0, 0);
    white-space: nowrap;
`
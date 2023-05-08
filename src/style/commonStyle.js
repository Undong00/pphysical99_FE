import styled from "styled-components";

export const Main = styled.main`
  padding-top: 160px;
  min-height: calc(100vh - 160px); // 헤더와 네비 높이만큼 제외
  background-color: #f1f3f5;
`;

export const ComHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: #0084ff;
  color: black;
  z-index: 98;
  display: flex;
  justify-content: flex-start;
`;

export const ComNavi = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  height: 80px;
  background-color: pink;
  color: black;
  z-index: 98;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

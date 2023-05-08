import api from "./apiConfig";
import { testInstance } from "./apiConfig"; // 테스트를 위한 목 서버

/**  이 친구
 * 목록조회
 * @param
 * @returns response
 */
export const quizList = async () => {
  const response = await testInstance.get(`/quiz`); // TODO 백앤드에서 지정한 url로 변경
  return response;
};

/**
 * 퀴즈 조회
 * @param id inputValue
 * @returns response
 */
export const quizQuiz = async (inputValue) => {
  const response = await api.get(`/data/`); // TODO 백앤드에서 지정한 url로 변경
  return response;
};

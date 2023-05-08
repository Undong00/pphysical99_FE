import api, {jwtInstance} from "./apiConfig";

// https://0a98f1f5-0d64-4224-be67-8457351a3d32.mock.pstmn.io/quiz

/**
 * 목록조회
 * @param
 * @returns response
 */
export const quizList = async () => {
  const response = await jwtInstance.get(`/quiz`); 
  return response;
};

/**
 * 퀴즈 조회
 * @param id inputValue
 * @returns response
 */
export const quizDetails = async (inputValue) => {
  const response = await jwtInstance.get(`/quiz/`+inputValue); 
  return response;
};

/**
 * 퀴즈 수정
 * @param id inputValue
 * @returns response
 */
export const quizModify = async (value) => {
  const response = await jwtInstance.put(`/quiz/`+value.quizId, value.modifyValue); 
  return response;
};

/**
 * 퀴즈 삭제
 * @param id inputValue
 * @returns response
 */
export const quizDelete = async (quizId) => {
  const response = await jwtInstance.delete(`/quiz/`+quizId); 
  return response;
};

/**
 * 퀴즈 답안 제출
 * @param {current:current} inputValue
 * @returns response
 */
export const quizSolving = async (value) => {
  const response = await jwtInstance.post(`/quiz/`+value.quizId+'/solving', value.correct); 
  return response;
};


/**
 * 퀴즈 등록
 * @param {current:current} inputValue
 * @returns response
 */
export const quizRegister = async (value) => {
  const response = await jwtInstance.post(`/quiz/register`, value); 
  return response;
};
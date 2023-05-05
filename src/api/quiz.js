import api from "./apiConfig"

/**
 * 퀴즈 조회
 * @param id inputValue 
 * @returns response
 */
export const quizQuiz = async (inputValue) => {
    const  response  = await api.get(`/data/`)  // TODO 백앤드에서 지정한 url로 변경
        return response
}
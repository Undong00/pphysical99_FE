import api, { jwtInstance } from "./apiConfig";

/**
 * 아이디 중복체크
 * @param { ”userId”: “userId”} inputValue
 * @returns { ”success”: boolean, ”message”: “중복확인”, ”data”: null } response
 */
export const validId = async (inputValue) => {
  const response = await api.post(`/signup/valid`, inputValue);
  return response;
};

/**
 * 회원가입
 * @param { ”userId”: “userId”,”password”: “password”,} inputValue
 * @returns { ”success”: boolean, ”message”: “회원 가입 완료!”, ”data”: null } response
 */
export const signUp = async (inputValue) => {
  const response = await api.post(`/signup`, inputValue);
  return response;
};

/**
 * 로그인
 * @param { ”userId”: “userId”,”password”: “password”,} inputValue
 * @returns { ”success”: boolean, ”message”: “로그인성공”, ”data”: null } response
 */

export const login = async (inputValue) => {
  const response = await api.post(`/login`, inputValue);
  console.info("[INFO] 서버에 로그인 요청 후 응답값", response.headers);
  if(response.data.success){
    // 토큰 받기
    const token = response.headers["authorization"];
    document.cookie = `token=${token}; path=/`;
    return Promise.resolve(response)
  }else{
    console.error("[ERROR]"+response.data.message)
    return Promise.reject(response)
  }

};

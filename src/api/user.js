import api from "./apiConfig"

/**
 * 회원가입
 * @param { ”userId”: “userId”,”password”: “password”,} inputValue 
 * @returns { ”success”: boolean, ”message”: “회원 가입 완료!”, ”data”: null } response
 */
export const signUpUser = async (inputValue) => {
    const response = await api.post(`/signup/`, inputValue)
        return response
}

/**
 * 로그인
 * @param { ”userId”: “userId”,”password”: “password”,} inputValue 
 * @returns { ”success”: boolean, ”message”: “회원 가입 완료!”, ”data”: null } response
 */
export const loginUser = async (inputValue) => {
    const response = await api.post(`/login/`, inputValue)
        return response
}

// // 토큰정보확인
// export const chkToken = async (token) => {
//     const response = await api.get(`/user/`, {
//         headers: {
//         'Content-Type': 'application/json',
//         'authorization': 'Bearer '+ token,
//         'x-requested-with': 'bamboo-forest',
//         'x-cors-api-key': 'temp_77c33b11fb4f65211c70c8e6ddcc8768'
//     }})
//     return response
// }




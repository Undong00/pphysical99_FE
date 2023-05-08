// axios 요청이 들어가는 모든 모듈
import axios from "axios"
import { getCookie } from "../cookie/Cookie"

const instance = axios.create({
    baseURL : "http://localhost:4000/"
})

// 토큰정보 가진채로 사용해야하는 요청은 모두 이 인스턴스를 사용한다.
const jwtInstance = axios.create({
    baseURL : "http://localhost:4000/",
    headers: {
        'Content-Type': "application/json",
        'Authorization': getCookie("jwt"),
    }
})


/* 요청 */
instance.interceptors.request.use(
    function(config){
        return config
    },
    function(error){
        return Promise.reject(error)
    },
)

/* 응답 */
instance.interceptors.response.use(
    function(response){
        return response
    },
    function(error){
        return Promise.reject(error)
    },
)

export { jwtInstance }
export default instance
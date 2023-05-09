// axios 요청이 들어가는 모든 모듈
import axios from "axios";
import { getCookie } from "../cookie/Cookie";

const instance = axios.create({
  baseURL: "http://13.125.188.38:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// 토큰정보 가진채로 사용해야하는 요청은 모두 이 인스턴스를 사용한다.
const jwtInstance = axios.create({
  baseURL: "http://13.125.188.38:8080",
  headers: {
    "Content-Type": "application/json",
    Authorization: getCookie("Authorization"),
  },
});

/**jwtInstatnce 요청 */
jwtInstance.interceptors.request.use((config) => {
  if (config.headers === undefined) return;
  const Authorization = getCookie("token");
  config.headers["authorization"] = `${Authorization}`;
  return config;
});

/* 요청 */
instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

/* 응답 */
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { jwtInstance };
export default instance;

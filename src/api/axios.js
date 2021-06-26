import Axios from "axios";
import { message } from "ant-design-vue";

// const baseURL = "http://localhost:3000";

const axios = Axios.create({
  // baseURL,
  timeout: 10000,
});
axios.defaults.withCredentials = true;
axios.defaults.headers["token"] = localStorage.getItem("token") || "";
axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.post["Content-Type"] = "application/json";
// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      const code = error.response.status;
      const msg = error.response.data.message;
      message.error(`Code: ${code}, Message: ${msg}`);
      console.error(`[Axios Error]`, error.response);
    } else {
      message.error(`${error}`);
    }
    return Promise.reject(error);
  }
);

export default axios;

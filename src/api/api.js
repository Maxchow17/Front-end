import axios from 'axios';
import { Message } from 'element-ui';
import router from '../router';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间2
});
// request拦截器
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // Do something with request error
    console.error(error); // for debug
    Promise.reject(error);
  }
);
// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.returnCode === '100') {
      return res.returnData;
    } else if (
      res.returnCode === '101' ||
      res.returnCode === '102' ||
      res.returnCode === '99'
    ) {
      Message({
        message: res.returnMsg,
        type: 'error',
        duration: 3 * 1000
      });
      // 跳转至登录页面
      router.push('/login');
      return Promise.reject(res);
    } else {
      Message({
        message: res.returnMsg,
        type: 'error',
        duration: 3 * 1000
      });
      return Promise.reject(res);
    }
  },
  error => {
    console.error('err' + error); // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    });
    return Promise.reject(error);
  }
);
export default service;

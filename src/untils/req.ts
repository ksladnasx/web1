import axios from "axios";
import router from "../router";

const axiosInstance = axios.create({
    baseURL: '/dev',
    timeout: 10000, // 设置请求超时时间为10秒
})
// 请求拦截器
axiosInstance.interceptors.request.use(
    (config) => {
        // 在请求头中添加token
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error("Request Error:", error);
        return Promise.reject(error);
    }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
    (response) => {
        // 处理响应数据
        return response;
    },
    (error) => {
        // 处理错误响应
        if (error.response) {
            // 服务器返回了状态码，且状态码不在2xx范围内
            if (error.response.status === 401) {
                // 未授权，跳转到登录页面
                router.push({ name: 'Login' });
            }
        } else {
            // 请求未发出或网络错误
            console.error("Network Error:", error.message);
        }
        return Promise.reject(error);
    }
)
export default axiosInstance;
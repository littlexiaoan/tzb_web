import axios from 'axios'

// 创建axios的对象
const instance = axios.create({
    baseURL: "/api",  //配置固定域名
    method:"POST",
})

export default instance;

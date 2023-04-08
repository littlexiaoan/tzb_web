import request from "../utils/request"

export function addNoise(params) {
    console.log("params:", params)
    return request({
        url: "/add_noise",  //接口路径
        data:params  //接口参数
    });
}

export function removeNoise(params){
    console.log("params:", params)
    return request({
        url: "/remove_noise",  //接口路径
        data:params  //接口参数
    });
}

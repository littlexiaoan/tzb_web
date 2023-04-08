import {Notification} from 'element-ui'  //导入element-ui组件库

const success = (message) => {
    Notification({
        title: '好耶！',
        message,
        type: 'success'
    })
}
const info = (message) => {
    Notification({
        title: '小tips~',
        message,
        type: 'info',
        duration:1000
    })
}

const warning = (message) => {
    Notification({
        title: '情况不妙',
        message,
        type: 'warning'
    })
}

const message = {
    success,info,warning
}

export default message

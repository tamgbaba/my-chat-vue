import axios from 'axios'

const service = axios.create({
  // baseURL: 'http://8.130.98.101:8083',
  baseURL: 'http://localhost:8083',
  timeout: 100000,
  withCredentials: true,
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  },
})

service.interceptors.response.use(
  (res) => {
    // 请求成功对响应数据做处理，此处返回的数据是axios.then(res)中接收的数据
    if (res.status == 0 || res.data.code == 200||res.data.code==0 ) {
      // code值为 0 或 200 时视为成功
      return Promise.resolve(res)
    }
    return Promise.reject(res)
  },
  (err) => {
    // 在请求错误时要做的事儿
    err.data = {}
    err.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
    // 此处返回的数据是axios.catch(err)中接收的数据
    return Promise.reject(err)
  }
)

export default service

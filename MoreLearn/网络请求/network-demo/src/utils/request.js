import axios from 'axios'
// 在此可判断当前是什么环境 开发环境、生产环境
const isDev = process.env.NODE_ENV

const baseURLDev = 'https://mockapi.eolink.com/Rijy6K25168ee42812fbe838bb557aed97c6cb206591c4c'
const baseURLDis = 'https://mockapi.eolink.com/Rijy6K25168ee42812fbe838bb557aed97c6cb206591c4c'

// 基础配置
const ins = axios.create({
  // 根路径 根据上方判断的环境 切换不能请求根地址
  baseURL: isDev ? baseURLDev : baseURLDis,
  // 设置请求超时的时长
  timeout: 6000
})

// 请求拦截
ins.interceptors.request.use((config) => {
  // 在请求头中设置新属性token，参数为我们的token ，实现每次请求都会在请求头中携带token
  config.headers.common.token = localStorage.getItem('token') || ''
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截
ins.interceptors.response.use(response => {
// 根据后端返回的数据，错误时的统一操作
  if (response.data.code === '10119') {
    window.location.href = window.location.href.split('#')[0] + '#' + '/login'
    window.location.reload()
  }
  console.log(response)
  return response
}, error => {
  return Promise.reject(error)
})

// 根据请求方式，发起请求的参数形式不同，使用以下函数配置好后，后续在页面中调用此函数进行请求，将请求方式，地址，数据等当做参数的形式传入。这样使我们的请求结构清晰统一格式。例如：
// import request from '../utils/request'
// export function getAdminList(params) {
// return request({
// url: '/admin/list',
// data:params,
// method: 'GET'
// })
// }

function request (config) {
  let { url, data, method, headers } = config
  url = url || ''
  data = data || {}
  method = method || 'GET'
  headers = headers || ''

  // restful api  GET / POST /PUT/PATCH/DELETE
  switch (method.toUpperCase()) {
    case 'GET':
      return ins.get(url, { params: data })
    case 'POST':
      // 表单提交  application/x-www-form-url-encoded
      if (headers['content-type'] === 'application/x-www-form-url-encoded') {
        // 转参数 URLSearchParams/第三方库qs
        const p = new URLSearchParams()
        for (let key in data) {
          p.append(key, data[key])
        }
        return ins.post(url, p, { headers })
      }
      // 文件提交  multipart/form-data
      if (headers['content-type'] === 'multipart/form-data') {
        const p = new FormData()
        for (let key in data) {
          p.append(key, data[key])
        }
        return ins.post(url, p, { headers })
      }
      // 默认 application/json
      return ins.post(url, data)
    case 'PUT': // 全部更新
      return ins.put(url, data)
    case 'PATCH': // 局部更新
      return ins.patch(url, data)
    case 'DELETE': // 删除
      return ins.delete(url, { data })
    default:
      return ins(config)
  }
}

export default request

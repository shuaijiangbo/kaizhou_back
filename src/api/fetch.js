
import axios from 'axios';

if (process.env.NODE_ENV === 'development') {
	// 全局的 axios 默认值
	axios.defaults.timeout = 200000;
	axios.defaults.withCredentials = true;
/*	axios.defaults.baseURL ='http://192.168.3.3:8080'; // jb本地 node服务域名*!/
  axios.defaults.baseURL ='http://192.168.3.213:8080'; // 彭磊

  axios.defaults.baseURL ='http://192.168.38.1:8080'; // 周浪
  axios.defaults.baseURL ='http://192.168.3.229:8080'; // 空机子*/
	/*
	 * axios.defaults.headers.post['Content-Type'] =
	 * 'application/x-www-form-urlencoded';
	 */
	// axios.defaults.baseURL
	// ='https://www.easy-mock.com/mock/5b3deb33b4180c1de2924a95/text/'; //填写域名
	} else if (process.env.NODE_ENV === 'production') {
	  axios.defaults.baseURL = '';
}

// http request 拦截器
axios.interceptors.request.use(
    config => {                               // // 在发送请求之前做些什么
    config.data = new URLSearchParams(config.data);
    config.headers = {
        'Content-Type':'application/x-www-form-urlencoded'
    }
        return config;
    },
    error => {                             // // 对请求错误做些什么
        return Promise.reject(err);
    }
);

// 响应拦截器即异常处理
axios.interceptors.response.use(
    response => {                    // dosomething for data of response
										// (对响应数据做点什么)
        return response
    },
    err => {                        // dosomething for err (对响应错误做点什么)
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                console.log('错误请求')
                break;
            case 401:
                console.log('未授权，请重新登录')
                window.location.href='/kaizhou/index.html#/login'
                break;
            case 403:
                console.log('拒绝访问')
                break;
            case 404:
                console.log('请求错误,未找到该资源')
                break;
            case 405:
                console.log('请求方法未允许')
                break;
            case 408:
                console.log('请求超时')
                break;
            case 500:
                console.log('服务器端出错')
                break;
            case 501:
                console.log('网络未实现')
                break;
            case 502:
                console.log('网络错误')
                break;
            case 503:
                console.log('服务不可用')
                break;
            case 504:
                console.log('网络超时')
                break;
            case 505:
                console.log('http版本不支持该请求')
                break;
            default:
                console.log(`连接错误${err.response.status}`)
        }
    } else {
        console.log('连接到服务器失败')
        console.log(err)
    }
    // return Promise.reject(err.response)
})


/**
 * 封装get方法
 *
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url,params={}){
    return new Promise((resolve,reject) => {
        axios.get(url,{
            params:params
        }).then(response => {
              if(!response){
                resolve(400);
              }
              if(response.data.status==401){
                window.location.href='/#/login';
                return false;
              }
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}
/**
 * 封装post请求
 *
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data){
    return new Promise((resolve,reject) => {
        axios.post(url, data)
            .then(response => {
                  if(response.data.status==401){
                    window.location.href='/#/login';
                    return false;
                  }
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 *
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.patch(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 *
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.put(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装delete请求
 *
 * @param url
 * @param data
 * @returns {Promise}
 */

export function deletes(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.delete(url,{data: data})
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}


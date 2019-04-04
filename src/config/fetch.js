import axios from 'axios'
import {env} from './env'
import CacheUtils from '@souche-f2e/souche-util/lib/cache'

export default async (url = '', data = {}, type = 'GET', typeurl = '', method = 'fetch') => {
    data['token'] = CacheUtils.getCookie('_security_token_inc')
    type = type.toUpperCase()
    if (env.SERVER_URL[typeurl]) {
        url = env.SERVER_URL[typeurl] + url
    }
    if (method == 'fetch') {
      const requestConfig = {
        method: type,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        cache: 'no-cache',
      };
      if (type == 'GET') {
        let dataStr = ''; // 数据拼接字符串
        Object.keys(data).forEach((key) => {
          dataStr += `${key}=${data[key]}&`;
        });
        if (dataStr !== '') {
          dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
          url = `${url}?${dataStr}`;
        }
        delete(data['token'])
      }
      if (type == 'POST') {
        Object.defineProperty(requestConfig, 'body', {
          value: delete(data['token']),
        });
        url = url+ `?token=` + `${CacheUtils.getCookie('_security_token_inc')}`
       }
      try {
        const instance = axios.create({
          baseURL: '',
          timeout: 25000,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        const response = await instance
          .request({
            method: type,
            url,
            data,
          })
          .catch((error) => {
            console.log(error);
          });
        const responsJson = await response.data;
        // if (responsJson.code === '10001') { //要是没有登录就跳转到登录页面
        //   window.location.href = 'http://sso.dasouche-inc.net/'
        // }
        return responsJson;
      } catch (error) {
        throw new Error(error);
      }
    }
  }

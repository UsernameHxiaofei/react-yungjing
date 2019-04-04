let url = window.location.href // 获取地址栏的参数
import CacheUtils from '@souche-f2e/souche-util/lib/cache'

let SERVER_URL = {
    baseUrl: '',
    saleUrl:'',
    fileUrl:'',
    fileDownLoadUrl: '',
}


// if (url.indexOf('localhost') >= 0) {//本地地址（调本地的接口）
//   SERVER_URL.baseUrl = 'http://192.168.5.47:8080/'
//   SERVER_URL.fileUrl = 'http://192.168.5.47:8080/cloudMirrorInvJson/importExcel.json'
//   SERVER_URL.fileDownLoadUrl = 'http://souche-devqa.oss-cn-hangzhou.aliyuncs.com/20190321/xlsx/ed3e7d77cd36e019ae235db5d43dd11a.xlsx'
// }

if (url.indexOf('localhost') >= 0) {//本地地址
  SERVER_URL.baseUrl = 'http://cm-test.dasouche-inc.net/'
  SERVER_URL.fileUrl = 'http://cm-test.dasouche-inc.net/cloudMirrorInvJson/importExcel.json'
  SERVER_URL.fileDownLoadUrl = "http://souche-devqa.oss-cn-hangzhou.aliyuncs.com/20190329/xlsx/a7a841d7942174a54a168b0b28181dfc.xlsx"
}

if (url.indexOf('f2e.blks.dasouche.net') >= 0) { //测试地址
  SERVER_URL.baseUrl = 'http://cm-test.dasouche-inc.net/'
  SERVER_URL.fileUrl = 'http://cm-test.dasouche-inc.net/cloudMirrorInvJson/importExcel.json'
  SERVER_URL.fileDownLoadUrl = "http://souche-devqa.oss-cn-hangzhou.aliyuncs.com/20190329/xlsx/a7a841d7942174a54a168b0b28181dfc.xlsx"
}

export const env = {
    SERVER_URL
}


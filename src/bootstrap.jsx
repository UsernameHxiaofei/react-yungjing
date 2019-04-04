import { dispatch } from '@/store';

// 初始化函数，将在整个前端应用渲染前调用
// 可以在这里进行加载用户信息、初始化数据等操作
// async 函数，参考：
// http://es6.ruanyifeng.com/#docs/async
// http://es6.ruanyifeng.com/#docs/promise
export default async function bootstrap() {
  await dispatch.global.loadUser();
}

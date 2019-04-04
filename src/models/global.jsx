import { createModel } from '@souche-f2e/uniqlo';
import { fetchUser } from '@/services/global';

const initState = {
  currentUser: null,
};

export default createModel({
  // model name，需要与 model 文件的名字一致
  name: 'global',
  // state
  // model 的所有状态
  state: {
    // 浅拷贝语法 参考 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    ...initState,
  },
  // effects
  // 用于存放可能会产生*副作用*的函数
  // 最常见的比如请求接口这种 IO 操作
  // *不能*在 effect 函数里直接修改 state
  // 而是在 effect 函数中获取副作用的结果调用 reducer 函数修改 state
  // 命名习惯：动词开头的 camelCase
  effects: {
    async loadUser(payload, rootState) {
      const user = await fetchUser();
      this.SET_STATE({ currentUser: user });
    },
  },
  // reducers
  // 用于存放直接修改state的*纯函数*
  // 由于我们使用了 immer 插件我们可以在 reducer 函数里直接修改 state 或者直接返回新的 state
  // 命名习惯：constants case
  reducers: {
    RESET_STATE(state, payload) {
      return { ...initState };
    },
    SET_STATE(state, payload) {
      Object.keys(payload).forEach((key) => {
        if ((initState[key] !== undefined) && (payload[key] !== undefined)) {
          state[key] = payload[key];
        }
      });
    },
  },
});

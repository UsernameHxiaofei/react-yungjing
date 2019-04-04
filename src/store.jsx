import { createStore } from '@souche-f2e/uniqlo';

// 引入所有的 models
import * as models from '@/models';

// 创建一个包含了所有 model 的 store
// store 有一个 rootState，包含了所有 model 各自的 state，键名就是其 model name
// 比如 `store.getState().global` 就能取到 `global` 这个 model 中当前的 state
// 如果我需要改变 model 的 state，可以调用 store.dispath[model名][effect名/reducer名]
// 比如我可以调用 store.dispatch.global.loadUser() 来调用 global model 中的 loadUser effect
// efftct 函数和 reducer 函数可以传参但仅能传一个参数，将作为 payload 传到方法中
const store = createStore({ models });

export default store;

export const { dispatch, history } = store;

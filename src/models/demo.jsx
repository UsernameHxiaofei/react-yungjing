import { createModel } from '@souche-f2e/uniqlo';

export default createModel({
  state: {
    todos: [],
  },
  reducers: {
    SET_STATE(state, payload) {
      Object.keys(payload).forEach((key) => {
        if (typeof payload[key] !== 'undefined') {
          state[key] = payload[key];
        }
      });
    },
    ADD_TODO(state, payload) {
      state.todos.push({
        title: payload,
        done: false,
      });
    },
    TOGGLE_TODO(state, payload) {
      state.todos[payload].done = !state.todos[payload].done;
    },
    DELETE_TODO(state, payload) {
      state.todos.splice(payload, 1);
    },
  },
});

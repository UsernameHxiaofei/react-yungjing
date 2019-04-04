import { injectGlobal } from 'styled-components';
import createApp from '@souche-f2e/uniqlo';
import store from '@/store';
import root from '@/root';
import bootstrap from './bootstrap';

// 推荐使用 styled-components 写 CSS 样式
// 如果需要注入全局 CSS 样式，使用 injectGlobal 方法
injectGlobal`
  html, body {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

const app = createApp({ store });

bootstrap().then(() => {
  app.render(root, '#root');
});

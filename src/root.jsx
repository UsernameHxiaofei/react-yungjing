import React from 'react';
import { hot } from 'react-hot-loader';
import { LocaleProvider } from 'antd';
import {
  Router,
  Route,
  Redirect,
  Switch,
} from '@souche-f2e/uniqlo';


import Sale from '@/pages/Sale'
import CloudMirrorEntry from '@/pages/CloudMirrorEntry';
import CloudMirrorPool from '@/pages/CloudMirrorPool';
const Root = ({ history }) => (
  <LocaleProvider locale={require('antd/lib/locale-provider/zh_CN').default}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={CloudMirrorEntry} />
        <Route path="/sale" component={Sale} />
        <Route path="/cloudMirrorEntry" component={CloudMirrorEntry} />
        <Route path='/cloudMirrorPool' component={CloudMirrorPool} />
        <Redirect to="/" />
      </Switch>
    </Router>
  </LocaleProvider>
);

export default hot(module)(Root);

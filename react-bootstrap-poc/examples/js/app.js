import React from 'react';
import ReactDOM from 'react-dom';

import { IndexRoute, Router, Route } from 'react-router';
import createHistory from 'history/lib/createHashHistory';
const history = createHistory( { queryKey: false } );
import App from './components/App';
import Home from './components/Home';
import fileUpload from './components/fileUpload';
import PageNotFound from './components/PageNotFound';
const routes = (
  <Router history={ history }>
    <Route path='/' component={ App }>
      <IndexRoute component={ Home } />
      <Route path='fileUpload' component={ fileUpload }/>
      <Route path='examples'>
        <Route path='complex' component={ require('./complex/demo') } />
      </Route>
      <Route path='*' component={ PageNotFound }/>
    </Route>
  </Router>
);

ReactDOM.render(routes, document.querySelector('#root'));

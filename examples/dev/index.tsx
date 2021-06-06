// import React from 'react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './../../src/components/dashboard';
import Studio from './../../src/components/studio';
import './../../src/components/dashboard/style/index'
import './../../src/components/studio/style/index'

ReactDOM.render(
  (<div>
    <Dashboard></Dashboard>
    <Studio></Studio>
  </div>),
  document.querySelector('#app')
)


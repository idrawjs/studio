// import React from 'react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { TypeData } from '@idraw/types';
import Studio from '../../src/studio';
import data from './libs/data';
import './style';

ReactDOM.render(
  (<div style={{
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <div style={{display: 'flex'}}>
      <Studio {...{width: 960, height: 720, data: data as TypeData}}></Studio>
    </div>
  </div>),
  document.querySelector('#app')
)


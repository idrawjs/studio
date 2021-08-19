// import React from 'react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { TypeData } from '@idraw/types';
import { Studio } from '@idraw/studio';
import data from './libs/data';
import './index.less';

// @ts-ignore
var studioData: TypeData = data as TypeData;

ReactDOM.render(
  (<div style={{
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <div style={{display: 'flex'}}>
      <Studio {...{ 
        studioWidth: window.innerWidth,
        studioHeight: window.innerHeight,
        contextWidth: 800,
        contextHeight: 600,
        data: studioData,
      }}></Studio>
    </div>
  </div>),
  document.querySelector('#app')
)
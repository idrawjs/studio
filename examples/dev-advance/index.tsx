import React from 'react';
import ReactDOM from 'react-dom';
// import { TypeDataBase } from '@idraw/types';
import Studio from '../../src/';
// import { customDataList } from './libs/custom';
import templateList from './libs/template';
import './style';

const defaultTpl = templateList[0];

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
        // studioWidth: 800,
        // studioHeight: 640,
        devicePixelRatio: window.devicePixelRatio,
        contextWidth: defaultTpl.width,
        contextHeight: defaultTpl.height,
        data: defaultTpl.data,
        // customElements: customDataList
        customTemplates: templateList
      }}></Studio>
    </div>
  </div>),
  document.querySelector('#app')
)

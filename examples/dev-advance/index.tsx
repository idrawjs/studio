import React from 'react';
import { createRoot } from 'react-dom/client';
import Studio from '../../src/';
import templateList from './libs/template';
import './style';

const defaultTpl = templateList[0];

const root = createRoot(document.querySelector('#app') as HTMLElement)

root.render(
  (<div style={{
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <div style={{display: 'flex'}}>
      <Studio {...{ 
        // studioWidth: window.innerWidth,
        // studioHeight: window.innerHeight,
        studioWidth: 800,
        studioHeight: 400,
        devicePixelRatio: window.devicePixelRatio,
        contextWidth: defaultTpl.width,
        contextHeight: defaultTpl.height,
        data: defaultTpl.data,
        // customElements: customDataList
        customTemplates: templateList
      }}></Studio>
    </div>
  </div>),
  
)

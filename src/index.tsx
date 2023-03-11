import * as React from 'react';
import ReactDOM from 'react-dom';
import Studio from '@idraw/studio';
import templateList from './libs/template';
import { Nav } from './components/nav';
import './index.less';

const defaultTpl = templateList[0];

ReactDOM.render(
  (<div className="page-container">
    <div style={{display: 'flex'}}>
      {/* @ts-ignore */}
      <Studio {...{ 
        studioWidth: window.innerWidth,
        studioHeight: window.innerHeight,
        // studioWidth: 800,
        // studioHeight: 640,
        contextWidth: defaultTpl.width,
        contextHeight: defaultTpl.height,
        data: defaultTpl.data,
        // customElements: customDataList
        devicePixelRatio: window.devicePixelRatio,
        customTemplates: templateList
      }}></Studio>
    </div>
    <div className="page-nav">
      <Nav />
    </div>
  </div>),
  document.querySelector('#app')
)
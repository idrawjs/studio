import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Studio } from '@idraw/studio';
import data from './data-iphone-demo';
import { base64 } from './logo';
import { getPageTemplates } from './data/page';
import { getMaterialTemplates } from './data/material';

import './index.less';
const dom = document.querySelector('#app') as HTMLDivElement;
const root = createRoot(dom);

const App = () => {
  const style = { margin: 0, padding: 0 };
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [height, setHeight] = useState<number>(window.innerHeight);
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    });
  }, []);

  if (width < 750) {
    return (
      <div
        style={{
          boxSizing: 'border-box',
          height: '100%',
          width: '100%',
          background: '#1e1e1e',
          color: '#ffffff',
          fontSize: 20,
          lineHeight: '32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            padding: '0 10px',
            boxSizing: 'border-box',
            fontSize: 12
          }}
        >
          {`${window.location.origin}${window.location.pathname}`}
        </div>
        <div
          style={{
            borderBottom: '1px solid #aaaaaa',
            padding: 10,
            boxSizing: 'border-box'
          }}
        >
          Please browse the page on PC/desktop
        </div>

        <div
          style={{
            padding: 10,
            boxSizing: 'border-box'
          }}
        >
          请在PC/桌面端浏览页面
        </div>
      </div>
    );
  }

  return (
    <Studio
      defaultEditMode="page"
      logo={
        <>
          <a href="/" style={{ display: 'inline-flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <img style={{ width: 24, marginRight: 10 }} src={base64} />
          </a>
          <span>@idraw/studio</span>
        </>
      }
      width={width}
      height={height}
      style={style}
      data={data}
      getPageTemplates={getPageTemplates}
      getMaterialTemplates={getMaterialTemplates}
    />
  );
};

root.render(<App />);

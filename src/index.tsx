import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Studio } from '@idraw/studio';
import data from './data';
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

  // const style = { margin: 40 };
  // const width = 800;
  // const height = 600;

  return (
    <Studio
      width={width}
      height={height}
      style={style}
      data={data}
      defaultScaleInfo={{
        // scale: 0.4,
        // offsetX: -200,
        // offsetY: -200

        // scale: 0.5,
        // offsetX: 1400,
        // offsetY: -200

        // scale: 0.1,
        // offsetX: -1000,
        // offsetY: -500

        scale: 0.12,
        offsetX: -800,
        offsetY: -500
        // offsetY: 4100

        // scale: 1,
        // offsetX: 0,
        // offsetY: 0
      }}
    />
  );
};

root.render(<App />);

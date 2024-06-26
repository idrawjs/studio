import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Studio } from '@idraw/studio';
import data from './data-iphone-demo';
// import data from './data2';
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

  // const style = { margin: 40 };
  // const width = 800;
  // const height = 600;

  return (
    <Studio
      logo={
        <span style={{ display: 'inline-flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <img style={{ width: 24, marginRight: 10 }} src="https://github.com/idrawjs/idraw/assets/8216630/bcf8fbc6-6374-4cb9-a67f-1687d029a863" />
          <span>@idraw/studio</span>
        </span>
      }
      width={width}
      height={height}
      style={style}
      data={data}
      defaultEditMode="page"
      // defaultScaleInfo={
      //   {
      //     // scale: 0.4,
      //     // offsetX: -200,
      //     // offsetY: -200
      //     // scale: 0.5,
      //     // offsetX: 1400,
      //     // offsetY: -200
      //     // scale: 0.1,
      //     // offsetX: -1000,
      //     // offsetY: -500
      //     // offsetY: 4100
      //     // scale: 1,
      //     // offsetX: 0,
      //     // offsetY: 0
      //     // scale: 0.12,
      //     // offsetX: -800,
      //     // offsetY: -500
      //   }
      // }
    />
  );
};

root.render(<App />);

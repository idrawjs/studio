import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import './index.less';

const dom = document.querySelector('#app') as HTMLDivElement;
const root = createRoot(dom);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
root.render(<App />);

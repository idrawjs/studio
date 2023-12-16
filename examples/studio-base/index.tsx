import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import './index.less';

const dom = document.querySelector('#app') as HTMLDivElement;
const root = createRoot(dom);

root.render(<App />);

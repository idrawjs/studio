# @idraw/studio


<p align="center">

  <a href="https://www.npmjs.com/package/@idraw/studio">
    <img src="https://img.shields.io/npm/v/@idraw/studio.svg?sanitize=@idraw/studio" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/@idraw/studio">
    <img src="https://img.shields.io/npm/l/@idraw/studio.svg?sanitize=true" alt="License">
  </a>
</p>

## @idraw/studio Preview


The preview of `@idraw/studo`. 


<p align="center">
  <img src="./assets/preview/idraw-studio-preview.png" width="700" />
</p>

## Install

```sh
npm install @idraw/studio antd

```

```js
import * as React from 'react';
import ReactDOM from 'react-dom';
import Studio from '@idraw/studio';

ReactDOM.render(
  (<Studio {...{ 
    studioWidth: window.innerWidth,
    studioHeight: window.innerHeight,
    contextWidth: 800,
    contextHeight: 600,
    data: { elements: [] }
  }}></Studio>),
  document.querySelector('#app')
)

```
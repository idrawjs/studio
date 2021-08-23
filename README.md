# @idraw/studio

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
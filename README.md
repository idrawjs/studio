# @idraw/studio


<p align="center">
  <a href="https://www.npmjs.com/package/@idraw/studio">
    <img src="https://img.shields.io/npm/v/@idraw/studio.svg?sanitize=@idraw/studio" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/@idraw/studio">
    <img src="https://img.shields.io/npm/l/@idraw/studio.svg?sanitize=true" alt="License">
  </a>
</p>

<p align="center">
  <a href="https://idraw.js.org/studio/" target="_blank">idraw.js.org/studio/</a>
</p>

## @idraw/studio Preview

You can click [idraw.js.org/studio/](https://idraw.js.org/studio) to experience it.

The preview of `@idraw/studo`. 


<p align="center">
  <img src="./assets/preview/idraw-studio-preview.png" width="700" />
</p>

## Usage

```sh
npm install antd

npm install @idraw/studio;
```

```js
import * as React from 'react';
import ReactDOM from 'react-dom';
import Studio from '@idraw/studio';
 
import '@idraw/studio/dist/css/index.css'

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

## Props

```ts
{
  studioWidth?: number;
  studioHeight?: number;
  contextWidth?: number;
  contextHeight?: number;
  devicePixelRatio?: number;
  data?: TypeDataBase | TypeData;
  customMaterials?: TypeMaterial[];
  customMaterialsPagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (currentPage: number) => void;
  };
  customTemplates?: TypeTemplate[];
  customTemplatesPagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (currentPage: number) => void;
  };
  onChange?: (data: TypeData) => void;
}
```

## Development

```sh
git clone git@github.com:idrawjs/studio.git

cd studio

npm install

npm run dev
```

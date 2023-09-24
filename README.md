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

> Note:
> At present, the development content of the main branch is v0.4, and it is currently in the development and reconstruction stage, mainly based on the v0.3 version for optimization and reconstruction.
> The npm module is version v0.2.0-alpha.*. If you encounter any problems while using the npm module, you can view the content of this branch: [https://github.com/idrawjs/studio/tree/v0.3](https://github.com/idrawjs/studio/tree/v0.3)


> 注意:
> 当前`main`分支开发内容为`v0.4`，目前处于开发重构阶段，主要基于`v0.3`版本进行优化重构。
> 目前npm 模块是`v0.3 `版本。 如果你在使用npm模块的过程中遇到什么问题，可以查看这个分支的内容： [https://github.com/idrawjs/studio/tree/v0.3](https://github.com/idrawjs/studio/tree/v0.3)


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

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
  <a href="https://idrawjs.com/studio/" target="_blank">idrawjs.com/studio/</a>
</p>

 
## @idraw/studio Preview

You can click [idrawjs.com/studio/](https://idrawjs.com/studio) to experience it.

The preview of `@idraw/studo`. 


<p align="center">

  <img width="700" alt="idraw-studio-light-theme" src="https://github.com/idrawjs/studio/assets/8216630/8a49bab8-1e4a-44dd-9836-b6ce3861aaea" />

  <img width="600" alt="idraw-studio-dark-theme" src="https://github.com/idrawjs/studio/assets/8216630/479fce0b-891f-47f2-ace8-d91580e68b4b" />

</p>

## Usage

```sh 
# Install peer dependcies
npm install antd idraw

npm install @idraw/studio
```

```js
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Studio } from '@idraw/studio';
import '@idraw/studio/dist/css/index.css'

const App = () => { 
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [height, setHeight] = useState<number>(window.innerHeight);
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    });
  }, []); 

  return (
    <Studio
      width={width}
      height={height} 
      data={data}
      defaultScaleInfo={{ 
        scale: 1,
        offsetX: 0,
        offsetY: 0
      }}
    />
  );
};

const root = createRoot(document.querySelector('#app'));
root.render(<App />);

```

## Development

```sh
git clone git@github.com:idrawjs/studio.git

cd studio

pnpm install

npm run dev
```

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
  <img width="1145" alt="image" src="https://github.com/idrawjs/studio/assets/8216630/62b9bc71-5fca-421d-9c6e-b7512edc77f2" width="700">

  <img width="1145" alt="image" src="https://github.com/idrawjs/studio/assets/8216630/5b4cc1dc-89e1-4f67-84fa-578667d42bf7" width="700">
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

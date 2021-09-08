import { createHTML } from '../libs/html';
import { TypeDataBase } from '@idraw/types';

const data: TypeDataBase = {
  bgColor: '#333333',
  elements: [
    {
      name: 'Layer-Background',
      x: 0,
      y: 0,
      w: 720,
      h: 400,
      type: 'html',
      angle: 0,
      desc: {
        width: 720,
        height: 400,
        html: createHTML(
          <div style={{
            width: 720,
            height: 400,
            background: 'linear-gradient(60deg, rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%)',
          }}></div>
        ),
      },
      operation: {
        lock: true,
      }
    },
  ]
}

export default data;
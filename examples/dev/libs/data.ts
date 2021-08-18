import { createLayerHTML } from './html';

const data = {
  "bgColor": "#292929",
  "elements": [ 
  {
    x: 183,
    y: 183,
    w: 360,
    h: 250,
    type: 'html',
    desc: {
      width: 360,
      height: 250,
      html: createLayerHTML({ text: 'HTML' }),
    }
  },
  {
    x: 180,
    y: 130,
    w: 360,
    h: 250,
    type: 'html',
    desc: {
      width: 360,
      height: 250,
      html: createLayerHTML({ text: 'SVG' }),
    }
  }]
}

export default data;
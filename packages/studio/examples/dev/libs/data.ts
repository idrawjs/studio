import { createLayerHTML } from './html';

const data = {
  "bgColor": "#292929",
  "elements": [ 
    {
      name: 'Layer-HTML',
      x: 22,
      y: 324,
      w: 270,
      h: 170,
      type: 'html',
      desc: {
        width: 360,
        height: 250,
        html: createLayerHTML({ text: 'HTML', title: 'iDraw.js Element' }),
      }
    },
    {
      name: 'Layer-SVG',
      x: 22,
      y: 274,
      w: 270,
      h: 170,
      type: 'html',
      desc: {
        width: 360,
        height: 250,
        html: createLayerHTML({ text: 'SVG', title: 'iDraw.js Element'  }),
      }
    },
    {
      name: 'Layer-Image',
      x: 22,
      y: 224,
      w: 270,
      h: 170,
      type: 'html',
      desc: {
        width: 360,
        height: 250,
        html: createLayerHTML({ text: 'Image', title: 'iDraw.js Element'  }),
      }
    },
    {
      name: 'Layer-Circle',
      x: 22,
      y: 174,
      w: 270,
      h: 170,
      type: 'html',
      desc: {
        width: 360,
        height: 250,
        html: createLayerHTML({ text: 'Circle', title: 'iDraw.js Element'  }),
      }
    },
    {
      name: 'Layer-Rectangle',
      x: 22,
      y: 124,
      w: 270,
      h: 170,
      type: 'html',
      desc: {
        width: 360,
        height: 250,
        html: createLayerHTML({ text: 'Rectangle', title: 'iDraw.js Element'  }),
      }
    },
    {
      name: 'Layer-Text',
      x: 22,
      y: 74,
      w: 270,
      h: 170,
      type: 'html',
      desc: {
        width: 360,
        height: 250,
        html: createLayerHTML({
          text: 'Text',
          title: 'iDraw.js Element',
        }),
      }
    }, 
    {
      name: 'Layer-Bracket',
      x: 260,
      y: 160,
      w: 160,
      h: 200,
      type: 'svg',
      desc: {
        svg: `<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2222" xmlns:xlink="http://www.w3.org/1999/xlink" width="400" height="400"><defs><style type="text/css"></style></defs><path d="M435.778 56.323h-68.6v62.634h55.675c43.745 0 65.617 23.861 65.617 73.572v206.794c0 59.653 27.838 100.415 81.525 121.293-53.687 21.873-81.525 62.635-81.525 121.294v207.788c0 47.722-21.872 72.577-65.617 72.577h-55.676v62.635h68.6c40.763 0 72.578-12.924 94.45-38.774 21.873-23.86 31.815-56.67 31.815-98.426V644.892c0-29.826 6.96-51.699 18.89-65.617 13.918-15.908 39.768-24.856 75.56-25.85v-65.617c-35.792-1.989-61.642-9.942-75.56-25.85-11.93-13.919-18.89-35.791-18.89-65.617V194.517c0-41.757-9.942-75.56-31.815-99.42-21.872-25.85-53.687-38.774-94.45-38.774z" fill="#555555"></path></svg>`
      }
    },
    {
      name: 'Layer-Canvas',
      x: 320,
      y: 240,
      w: 360,
      h: 250,
      type: 'html',
      desc: {
        width: 360,
        height: 250,
        html: createLayerHTML({
          text: 'Canvas',
          title: 'iDraw.js',
          gradientColor: {
            from: '#e91e63',
            to: '#ff5722'
          }
        }),
      }
    }, 
    {
      name: 'Rectangle',
      x: 380,
      y: 40,
      w: 365,
      h: 150,
      type: 'rect',
      desc: {
        bgColor: '#ffffff1a',
        borderWidth: 2,
        borderColor: '#9999993a'
      }
    },
    {
      name: 'Introduction',
      x: 390,
      y: 120,
      w: 350,
      h: 75,
      type: 'text',
      desc: {
        text: 'A simple JavaScript framework for\r\nDrawing on the web',
        color: '#f0f0f0',
        fontSize: 20,
        fontWeight: 'bold',
      }
    },
    {
      name: 'Title',
      x: 440,
      y: 45,
      w: 230,
      h: 70,
      type: 'text',
      desc: {
        text: 'iDraw.js',
        color: '#ffffff',
        fontSize: 50,
        fontWeight: 'bold',
      }
    },
  ]
}

export default data;
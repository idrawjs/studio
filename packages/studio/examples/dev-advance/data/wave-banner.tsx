import React from 'react';
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
            // background: '#61a1eb',
            background: 'linear-gradient(60deg, rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%)',
          }}></div>
        ),
      },
      operation: {
        lock: true,
      }
    },
    {
      name: 'Wave',
      x: -4,
      y: 254,
      w: 750,
      h: 200,
      type: 'svg',
      angle: 0,
      desc: {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
          <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g class="parallax">
            <use xlink:href="#gentle-wave" x="120" y="0" fill="rgba(255,255,255,0.7" />
            <use xlink:href="#gentle-wave" x="80" y="3" fill="rgba(255,255,255,0.5)" />
            <use xlink:href="#gentle-wave" x="60" y="5" fill="rgba(255,255,255,0.3)" />
            <use xlink:href="#gentle-wave" x="48" y="7" fill="rgba(255,255,255,0.3)" />
          </g>
        </svg>`,
      },
      operation: {
        lock: false,
      }
    },
    {
      name: 'Title',
      x: 80,
      y: 80,
      w: 300,
      h: 80,
      type: 'text',
      angle: 0,
      desc: {
        text: 'iDraw.js',
        color: '#ffffff',
        fontSize: 60,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        bgColor: '',
      },
      operation: {
        lock: false,
      }
    },
    {
      name: 'Introduction',
      x: 90,
      y: 172,
      w: 500,
      h: 60,
      type: 'text',
      angle: 0,
      desc: {
        text: 'A simple JavaScript framework for\r\nDrawing on the web',
        color: '#ffffff',
        fontSize: 24,
        fontFamily: 'monospace',
        textAlign: 'left',
        bgColor: '',
      },
      operation: {
        lock: false,
      }
    }
 
  ]
}

export default data;
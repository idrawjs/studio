import React from 'react';
import { createHTML } from '../libs/html';
import { TypeDataBase } from '@idraw/types';

const data: TypeDataBase = {
  "bgColor": "#292929",
  "elements": [ 
    {
      name: 'Layer-Background',
      x: 0,
      y: 0,
      w: 400,
      h: 600,
      type: 'html',
      angle: 0,
      desc: {
        width: 400,
        height: 600,
        html: createHTML(
          <div style={{
            width: 1000,
            height: 1000,
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
      x: -72,
      y: 400,
      w: 600,
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
      x: 20,
      y: 80,
      w: 260,
      h: 60,
      type: 'text',
      angle: 0,
      desc: {
        text: 'iDraw.js',
        color: '#ffffff',
        fontSize: 50,
        fontFamily: 'monospace',
        fontWeight: 'bold',
      },
      operation: {
        lock: false,
      }
    },
    {
      name: 'Introduction',
      x: 10,
      y: 200,
      w: 370,
      h: 60,
      type: 'text',
      angle: 0,
      desc: {
        text: 'A simple JavaScript framework for\r\nDrawing on the web',
        color: '#ffffff',
        fontSize: 18,
        fontFamily: 'monospace',
        textAlign: 'left'
      },
      operation: {
        lock: false,
      }
    }
  ]
}

export default data;
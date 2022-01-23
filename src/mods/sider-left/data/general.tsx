import * as React from 'react';
import { TypeElement, TypeElemDesc } from '@idraw/types';
import { BorderOutlined, FileImageOutlined } from '@ant-design/icons';
import { IconSVG, IconText, IconCircle, IconHTML } from '../../icon';

const defaultIconProps = {
  width: 40, height: 40, size: 28, color: '#666666'
}

export const generalDataList: {
  name: string,
  icon: React.ReactElement,
  element: TypeElement<keyof TypeElemDesc>
}[] = [
  
  {
    name: 'Text',
    icon: <IconText {...defaultIconProps} />,
    element: {
      uuid: '',
      x: 0,
      y: 0,
      w: 100,
      h: 80,
      angle: 0,
      type: 'text',
      desc: {
        text: 'Text',
        color: '#999999',
        fontSize: 20,
        borderColor: '#ffffff00',
        borderWidth: 1,
      }
    }
  },
  {
    name: 'Rect',
    icon: <BorderOutlined />,
    element: {
      uuid: '',
      x: 0,
      y: 0,
      w: 100,
      h: 80,
      angle: 0,
      type: 'rect',
      desc: {
        bgColor: '#f0f0f0',
        borderColor: '#999999',
        borderWidth: 2,
      }
    }
  },
  {
    name: 'Circle',
    icon: <IconCircle {...defaultIconProps} />,
    element: {
      uuid: '',
      x: 0,
      y: 0,
      w: 100,
      h: 100,
      angle: 0,
      type: 'circle',
      desc: {
        bgColor: '#f0f0f0',
        borderColor: '#aaaaaa',
        borderWidth: 10,
      }
    }
  },
  {
    name: 'Image',
    icon: <FileImageOutlined />,
    element: {
      uuid: '',
      x: 0,
      y: 0,
      w: 100,
      h: 100,
      angle: 0,
      type: 'image',
      desc: {
        src: 'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB0PSIxNjI2MjQ3NjQzODE0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjgxOTkiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTUzLjEgNTA5LjFsLTc3LjggOTkuMi00MS4xLTUyLjRjLTMuMi00LjEtOS40LTQuMS0xMi42IDBsLTk5LjggMTI3LjJjLTQuMSA1LjItMC40IDEyLjkgNi4zIDEyLjlINjk2YzYuNyAwIDEwLjQtNy43IDYuMy0xMi45bC0xMzYuNS0xNzRjLTMuMy00LjEtOS41LTQuMS0xMi43IDB6IiBwLWlkPSI4MjAwIiBmaWxsPSIjOGE4YThhIj48L3BhdGg+PHBhdGggZD0iTTQwMCA0NDJtLTQwIDBhNDAgNDAgMCAxIDAgODAgMCA0MCA0MCAwIDEgMC04MCAwWiIgcC1pZD0iODIwMSIgZmlsbD0iIzhhOGE4YSI+PC9wYXRoPjxwYXRoIGQ9Ik04NTQuNiAyODguNkw2MzkuNCA3My40Yy02LTYtMTQuMS05LjQtMjIuNi05LjRIMTkyYy0xNy43IDAtMzIgMTQuMy0zMiAzMnY4MzJjMCAxNy43IDE0LjMgMzIgMzIgMzJoNjQwYzE3LjcgMCAzMi0xNC4zIDMyLTMyVjMxMS4zYzAtOC41LTMuNC0xNi43LTkuNC0yMi43ek03OTAuMiAzMjZINjAyVjEzNy44TDc5MC4yIDMyNnogbTEuOCA1NjJIMjMyVjEzNmgzMDJ2MjE2YzAgMjMuMiAxOC44IDQyIDQyIDQyaDIxNnY0OTR6IiBwLWlkPSI4MjAyIiBmaWxsPSIjOGE4YThhIj48L3BhdGg+PC9zdmc+',
      }
    }
  },
  {
    name: 'SVG',
    icon: <IconSVG {...defaultIconProps} />,
    element: {
      uuid: '',
      x: 0,
      y: 0,
      w: 100,
      h: 100,
      angle: 0,
      type: 'svg',
      desc: {
        svg: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M354.40128 0c-87.04 0-157.44 70.55872-157.44 157.59872v275.68128H78.72c-21.6576 0-39.36256 17.69984-39.36256 39.36256v236.31872c0 21.6576 17.69984 39.35744 39.36256 39.35744h118.24128v118.08256c0 87.04 70.4 157.59872 157.44 157.59872h472.63744c87.04 0 157.59872-70.55872 157.59872-157.59872V315.0336c0-41.74848-38.9888-81.93024-107.52-149.27872l-29.11744-29.12256L818.87744 107.52C751.5392 38.9888 711.39328 0 669.59872 0H354.4064z m0 78.72h287.20128c28.35456 7.0912 27.99616 42.1376 27.99616 76.8v120.16128c0 21.6576 17.69984 39.35744 39.36256 39.35744h118.07744c39.38816 0 78.87872-0.0256 78.87872 39.36256v512c0 43.32032-35.55328 78.87872-78.87872 78.87872H354.4064c-43.32544 0-78.72-35.5584-78.72-78.87872v-118.08256h393.91744c21.66272 0 39.36256-17.69472 39.36256-39.35744V472.64256c0-21.66272-17.69984-39.36256-39.36256-39.36256H275.68128V157.59872c0-43.32032 35.39456-78.87872 78.72-78.87872z m-115.2 426.72128c17.28 0 32.64 3.2 46.08 9.6l-7.68 18.23744c-13.44-5.76-26.24-8.63744-38.4-8.63744-10.24 0-17.92 2.23744-23.04 6.71744s-7.68 10.56256-7.68 18.24256c0 8.96 1.92 15.67744 5.76 20.15744 4.48 3.84 15.03744 9.6 31.67744 17.28 17.28 7.04 28.48256 14.40256 33.60256 22.08256 5.76 7.04 8.63744 16 8.63744 26.88 0 14.72-5.12 26.55744-15.36 35.51744s-24.96 13.44-44.16 13.44c-18.56 0-33.28-2.56-44.16-7.68v-21.12c15.36 6.4 30.08 9.6 44.16 9.6 12.8 0 22.08256-2.23744 27.84256-6.71744 6.4-4.48 9.6-11.52 9.6-21.12 0-7.68-2.24256-14.08-6.72256-19.2-3.2-3.2-15.03744-9.28256-35.51744-18.24256-13.44-6.4-23.04-13.44-28.8-21.12s-8.64256-17.59744-8.64256-29.75744c0-13.44 4.48-24.00256 13.44-31.68256 9.6-8.32 22.72256-12.47744 39.36256-12.47744z m295.68 0c17.92 0 33.92 3.2 48 9.6l-8.64256 20.15744c-14.08-7.04-27.83744-10.55744-41.27744-10.55744-18.56 0-33.28 6.07744-44.16 18.23744s-16.32256 29.76256-16.32256 52.80256c0 23.04 4.80256 40.63744 14.40256 52.79744 10.24 11.52 25.6 17.28 46.08 17.28 9.6 0 19.84-1.28 30.72-3.84v-51.84h-35.52256v-20.15744h57.6v86.4c-17.92 5.76-37.43744 8.63744-58.55744 8.63744-23.68 0-42.56256-7.68-56.64256-23.04s-21.12-37.76-21.12-67.2c0-28.16 7.36256-49.92 22.08256-65.28 15.36-16 36.48-23.99744 63.36-23.99744z m-235.20256 1.92h24.00256l35.51744 111.36c3.2 10.88 6.72256 24.32 10.56256 40.32 1.92-11.52 5.43744-25.28256 10.55744-41.28256l35.52256-110.39744h23.04L380.3136 683.03872H358.2464L299.6736 507.36128z" fill="#cdcdcd"></path></svg>',
      }
    }
  },
  {
    name: 'HTML',
    icon: <IconHTML {...defaultIconProps} />,
    element: {
      uuid: '',
      x: 0,
      y: 0,
      w: 200,
      h: 80,
      angle: 0,
      type: 'html',
      desc: {
        width: 200,
        height: 80,
        html: `
          <div style="font-size: 30px; font-weight: bold; color: #f0f0f0;">
            Hello HTML
          </div>
        `,
      }
    }
  }
];
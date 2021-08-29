import * as React from 'react';
import { TypeElement, TypeElemDesc } from '@idraw/types';
import { CheckCircleOutlined } from '@ant-design/icons';
import { parseReactToSVG } from './util';


export const iconDataList: {
  name: string,
  icon: React.ReactElement,
  element: TypeElement<keyof TypeElemDesc>
}[] = [
  {
    name: 'CheckCircle',
    icon: <CheckCircleOutlined />,
    element: {
      uuid: '',
      x: 0,
      y: 0,
      w: 100,
      h: 100,
      angle: 0,
      type: 'svg',
      desc: {
        svg: parseReactToSVG(<CheckCircleOutlined />)
      }
    },
    
  },
];
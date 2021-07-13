import * as React from 'react';
import { TypeElement, TypeElemDesc } from '@idraw/types';
import { BorderOutlined, FileTextOutlined, FileImageOutlined } from '@ant-design/icons';
import { IconSVG } from '../icon';

export const generalDataList: {
  name: string,
  icon: React.ReactElement,
  defaultElement: TypeElement<keyof TypeElemDesc>
}[] = [
  {
    name: 'Rect',
    icon: <BorderOutlined />,
    defaultElement: {
      uuid: '',
      x: 0,
      y: 0,
      w: 100,
      h: 80,
      angle: 0,
      type: 'rect',
      desc: {
        color: '#f0f0f0',
        borderColor: '#999999',
        borderWidth: 2,
      }
    }
  },
  {
    name: 'Text',
    icon: <FileTextOutlined />,
    defaultElement: {
      uuid: '',
      x: 0,
      y: 0,
      w: 100,
      h: 80,
      angle: 0,
      type: 'text',
      desc: {
        text: 'Text',
        fontSize: 20,
        borderColor: '#999999',
        borderWidth: 2,
      }
    }
  },
  {
    name: 'Image',
    icon: <FileImageOutlined />,
    defaultElement: {
      uuid: '',
      x: 0,
      y: 0,
      w: 100,
      h: 80,
      angle: 0,
      type: 'rect',
      desc: {
        color: '#f0f0f0',
        borderColor: '#999999',
        borderWidth: 2,
      }
    }
  },
  {
    name: 'SVG',
    icon: <IconSVG width={40} height={40} size={28} color={'#666666'} />,
    defaultElement: {
      uuid: '',
      x: 0,
      y: 0,
      w: 100,
      h: 80,
      angle: 0,
      type: 'rect',
      desc: {
        color: '#f0f0f0',
        borderColor: '#999999',
        borderWidth: 2,
      }
    }
  }
];
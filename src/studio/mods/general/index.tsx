import * as React from 'react';
import { BorderOutlined, FileTextOutlined, FileImageOutlined } from '@ant-design/icons';
import { IconSVG } from './../icon';
import { VirtualDrag } from './../virtual-drag';

const generalElements: {
  name: string,
  icon: React.ReactElement,
}[] = [
  {
    name: 'Rect',
    icon: <BorderOutlined />
  },
  {
    name: 'Text',
    icon: <FileTextOutlined />
  },
  {
    name: 'Image',
    icon: <FileImageOutlined />
  },
  {
    name: 'SVG',
    icon: <IconSVG width={40} height={40} size={28} color={'#666666'} />
  }
];

export const General = () => {
  return (
    <div className="idraw-studio-mod-general">
      <div className="studio-general-element-list">
        {generalElements.map((elem, i) => {

          const { icon } = elem;

          return (
            <div className="studio-general-element-item" key={i}>
              <VirtualDrag >
                {icon}
              </VirtualDrag>
            </div>
          )
        })}
      </div>
    </div>
  )
}

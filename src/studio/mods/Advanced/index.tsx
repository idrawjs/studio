import * as React from 'react';
import { FileImageOutlined } from '@ant-design/icons';
// import { IconSVG } from '../icon';

const advancedElements: {
  name: string,
  icon: React.ReactElement,
}[] = [
  {
    name: 'Image',
    icon: <FileImageOutlined />
  },
  {
    name: 'Image',
    icon: <FileImageOutlined />
  },
];

export const Advanced = () => {
  return (
    <div className="idraw-studio-mod-advanced">
      <div className="studio-advanced-element-list">
        {advancedElements.map((elem, i) => {

          const { icon } = elem;

          return (
            <div className="studio-advanced-element-item" key={i}>
              {icon}
            </div>
          )
        })}
      </div>
    </div>
  )
}

import React, { useState } from 'react';
import { Input, Popover,  } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import IDraw from 'idraw';

const is = IDraw.is;
const { TextArea } = Input;

interface SVGPickerProps {
  value?: string;
  onChange?: (color: string) => void;
}
 
export const FieldText: React.FC<SVGPickerProps> = ({ value = '', onChange }) => {
  const [text, setText] = useState<string>(value);

  const triggerChange = (val) => {
    onChange?.(val || value);
  };

  const onTextChange = (str: string) => {
    setText(str);
    if (is.text(str)) {
      triggerChange(str);
    }
  };

  return (
    <div className="idraw-studio-mod-desc-field-text">
      <Popover
        trigger="click"
        content={() => (
        <div>
          <TextArea
            value={value || text}
            style={{width: 300}}
            rows={10}
            onChange={(e) => {
              onTextChange(e.target.value || '')
            }}
          />
        </div>)} > 
        {/* <Input className="desc-field-text" type="button" value={value || text} /> */}
        <EditOutlined className="idraw-studio-mod-desc-field-icon" />
      </Popover>
    </div>
  );
};
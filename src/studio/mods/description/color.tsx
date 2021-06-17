import React, { useState } from 'react';
import { Input, Popover, } from 'antd';
import { SketchPicker } from 'react-color'
import IDraw from 'idraw';

const is = IDraw.is;

interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ value = '', onChange }) => {
  const [colorValue, setColorValue] = useState(value);

  const triggerChange = (changedValue) => {
    onChange?.(changedValue.color || value);
  };

  const onColorChange = (newColor: string) => {
    if (is.color(newColor)) {
      setColorValue(newColor);
    }
    triggerChange({ color: newColor });
  };

  return (
    <span >
      <Popover
        content={() => (
        <div>
          <SketchPicker
            color={colorValue}
            onChangeComplete={(data) => {
              if (is.color(data.hex)) {
                onColorChange(data.hex);
              }
            }}
          />
        </div>)}
        trigger="click"
      >
        <Input
          type="button"
          size="small"
          value={value || colorValue}
          style={{ width: 100 }}
        />
      </Popover>
    </span>
  );
};
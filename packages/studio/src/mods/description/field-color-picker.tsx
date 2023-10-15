import React, { useState, useEffect } from 'react';
import { Input, Popover, } from 'antd';
import { SketchPicker } from 'react-color';
import IDraw from 'idraw';

const is = IDraw.is;

interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
}

function parseColor(hex: string) {
  let _hex = hex.toLocaleUpperCase();
  let rgba = { r: 0, g: 0, b: 0, a: 1 };
  
  if (/^\#[0-9a-f]{3,3}$/i.test(_hex)) {
    _hex = `#${_hex[1]}${_hex[1]}${_hex[2]}${_hex[2]}${_hex[3]}${_hex[3]}FF`;
  } else if (/^\#[0-9a-f]{6,6}$/i.test(_hex)) {
    _hex = `${_hex}FF`;
  }
  if (/^\#[0-9a-f]{8,8}$/i.test(_hex)) {
    rgba.r = parseInt(`${_hex[1]}${_hex[2]}`, 16);
    rgba.g = parseInt(`${_hex[3]}${_hex[4]}`, 16)
    rgba.b = parseInt(`${_hex[5]}${_hex[6]}`, 16)
    rgba.a = parseInt(`${_hex[7]}${_hex[8]}`, 16) / 255
  }
  return rgba
}

function parseRGBA2Hex(rgba: { r: number, g: number, b: number, a: number }) {
  const list = [];
  list.push(rgba.r.toString(16).padStart(2, '0').toLocaleUpperCase());
  list.push(rgba.g.toString(16).padStart(2, '0').toLocaleUpperCase());
  list.push(rgba.b.toString(16).padStart(2, '0').toLocaleUpperCase());
  list.push(Math.floor(rgba.a * 255).toString(16).padStart(2, '0').toLocaleUpperCase());
  return `#${list.join('')}`
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ value = '', onChange }) => {
  const [colorValue, setColorValue] = useState(value);

  useEffect(() => {
    setColorValue(value);
  }, [value]);


  const triggerChange = (changedValue) => {
    onChange?.(changedValue.color || value);
  };

  const onColorChange = (newColor: string) => {
    setColorValue(newColor);

    if (is.color(newColor)) {
      triggerChange({ color: newColor });
    }
  };

  return (
    
    <span style={{
      position: 'relative',
      display: 'inline-block',
      cursor: 'pointer',
    }}>
      <Popover
        overlayClassName={'idraw-studio-mod-desc-color'}
        trigger="click"
        content={() => (
        <div>
          <SketchPicker
            color={parseColor(value || colorValue)}
            // disableAlpha={true}
            onChangeComplete={(data) => {
              // console.log('onChangeComplete =', data)
              const hex = parseRGBA2Hex(data.rgb);
              if (is.color(hex)) {
                onColorChange(hex);
              }
            }}
          />
        </div>)}
        
        >
          <span style={{
            position: 'absolute',
            left: 4,
            top: 4,
            bottom: 4,
            display: 'inline-block',
            width: 16,
            backgroundColor: value || colorValue,
            zIndex: 1,
            border: '1px solid #00000040',
          }}></span>

        </Popover>
        <Input
          type="text"
          size="small"
          value={colorValue}
          style={{ width: 120, paddingLeft: 24 }}
          onChange={(e)=> {
            onColorChange(e.target.value)
          }}
        /> 
    </span>
  );
};
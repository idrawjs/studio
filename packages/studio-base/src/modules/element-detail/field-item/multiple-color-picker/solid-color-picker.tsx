import React from 'react';
import ColorPicker, { Color, ColorBlock } from '@rc-component/color-picker';
import classnames from 'classnames';
import { generateClassName } from '../../../../css';
import { modName } from './config';

interface ColorPickerProps {
  className?: string;
  value?: string;
  diabledColorBlocks?: boolean;
  onChange?: (color: string) => void;
}

// function parseColor(hex: string) {
//   let _hex = hex.toLocaleUpperCase();
//   const rgba = { r: 0, g: 0, b: 0, a: 1 };

//   if (/^\#[0-9a-f]{3,3}$/i.test(_hex)) {
//     _hex = `#${_hex[1]}${_hex[1]}${_hex[2]}${_hex[2]}${_hex[3]}${_hex[3]}FF`;
//   } else if (/^\#[0-9a-f]{6,6}$/i.test(_hex)) {
//     _hex = `${_hex}FF`;
//   }
//   if (/^\#[0-9a-f]{8,8}$/i.test(_hex)) {
//     rgba.r = parseInt(`${_hex[1]}${_hex[2]}`, 16);
//     rgba.g = parseInt(`${_hex[3]}${_hex[4]}`, 16);
//     rgba.b = parseInt(`${_hex[5]}${_hex[6]}`, 16);
//     rgba.a = parseInt(`${_hex[7]}${_hex[8]}`, 16) / 255;
//   }
//   return rgba;
// }

// function getColorNum(hex: string) {
//   return hex.replace(/^#/, '');
// }

// function parseRGBA2Hex(rgba: { r: number; g: number; b: number; a: number }) {
//   const list = [];
//   list.push(rgba.r.toString(16).padStart(2, '0').toLocaleUpperCase());
//   list.push(rgba.g.toString(16).padStart(2, '0').toLocaleUpperCase());
//   list.push(rgba.b.toString(16).padStart(2, '0').toLocaleUpperCase());
//   if (rgba.a < 1) {
//     list.push(
//       Math.floor(rgba.a * 255)
//         .toString(16)
//         .padStart(2, '0')
//         .toLocaleUpperCase()
//     );
//   }

//   return `#${list.join('')}`;
// }

const colorPresets = [
  'transparent',
  '#FFFFFF',
  '#000000',
  '#AAAAAA',
  '#F5222D',
  '#FA8C16',
  '#FADB14',
  '#8BBB11',
  '#52C41A',
  '#13A8A8',
  '#1677FF',
  '#2F54EB',
  '#722ED1',
  '#EB2F96',
  '#F5222D4D',
  '#FA8C164D',
  '#FADB144D',
  '#8BBB114D',
  '#52C41A4D',
  '#13A8A84D',
  '#1677FF4D',
  '#2F54EB4D',
  '#722ED14D',
  '#EB2F964D'
];

export const SolidColorPicker: React.FC<ColorPickerProps> = ({ value = '', onChange, className, diabledColorBlocks = true }) => {
  const colorBlockClassName = generateClassName(modName, 'color-block');
  const colorBlockActiveClassName = generateClassName(modName, 'color-block-active');

  return (
    <>
      {!diabledColorBlocks && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            padding: 10,
            paddingBottom: 0
          }}
        >
          {colorPresets.map((color) => (
            <ColorBlock
              className={classnames(colorBlockClassName, {
                [colorBlockActiveClassName]: color.toUpperCase() === value?.toUpperCase()
              })}
              key={color}
              color={color}
              prefixCls="rc-color-picker"
              onClick={() => {
                onChange?.(color);
              }}
            />
          ))}
        </div>
      )}
      <ColorPicker
        className={className}
        value={new Color(value)}
        onChange={(data) => {
          const hex8 = `${data.toHexString().toUpperCase()}`;
          const hex = hex8.length === 9 && hex8.endsWith('FF') ? `${data.toHexString().toUpperCase()}` : hex8;
          onChange?.(hex);
        }}
      />
    </>
  );
};

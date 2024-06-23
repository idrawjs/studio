import React from 'react';
import ColorPicker, { Color } from '@rc-component/color-picker';

interface ColorPickerProps {
  className?: string;
  value?: string;
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

export const SolidColorPicker: React.FC<ColorPickerProps> = ({ value = '', onChange, className }) => {
  return (
    <ColorPicker
      className={className}
      // value={parseColor(value)}
      value={new Color(value)}
      onChange={(data) => {
        const hex8 = `#${data.toHex8().toUpperCase()}`;
        const hex = hex8.endsWith('FF') ? `#${data.toHex().toUpperCase()}` : hex8;

        onChange?.(hex);
      }}
    />
  );
};

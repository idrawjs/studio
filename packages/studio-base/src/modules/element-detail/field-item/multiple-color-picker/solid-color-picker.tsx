import React from 'react';
import { ChromePicker } from 'react-color';

interface ColorPickerProps {
  className?: string;
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
    rgba.g = parseInt(`${_hex[3]}${_hex[4]}`, 16);
    rgba.b = parseInt(`${_hex[5]}${_hex[6]}`, 16);
    rgba.a = parseInt(`${_hex[7]}${_hex[8]}`, 16) / 255;
  }
  return rgba;
}

function parseRGBA2Hex(rgba: { r: number; g: number; b: number; a: number }) {
  const list = [];
  list.push(rgba.r.toString(16).padStart(2, '0').toLocaleUpperCase());
  list.push(rgba.g.toString(16).padStart(2, '0').toLocaleUpperCase());
  list.push(rgba.b.toString(16).padStart(2, '0').toLocaleUpperCase());
  if (rgba.a < 1) {
    list.push(
      Math.floor(rgba.a * 255)
        .toString(16)
        .padStart(2, '0')
        .toLocaleUpperCase()
    );
  }

  return `#${list.join('')}`;
}

export const SolidColorPicker: React.FC<ColorPickerProps> = ({ value = '', onChange, className }) => {
  return (
    <ChromePicker
      className={className}
      color={parseColor(value)}
      onChangeComplete={(data) => {
        const hex = parseRGBA2Hex(data?.rgb as any);
        onChange?.(hex);
      }}
    />
  );
};

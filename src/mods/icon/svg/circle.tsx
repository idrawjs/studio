import React from 'react';
import IDraw from 'idraw';

const { is } = IDraw;

export function Circle(props?: { color?: string }) {
  return (
    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3192" width="400" height="400"><path d="M512 16C238 16 16 238 16 512s222 496 496 496 496-222 496-496S786 16 512 16z m0 896c-221 0-400-179-400-400S291 112 512 112s400 179 400 400-179 400-400 400z" fill={is.color(props.color) ? props.color : '#000000'} p-id="3193"></path></svg>
  )
}
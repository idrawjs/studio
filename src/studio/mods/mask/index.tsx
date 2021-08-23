import * as React from 'react';
import { TypeElement } from '@idraw/types';

type TypeProps = {
  // left: number;
  // top: number;
  // width: number;
  // height: number;
  // text: string;
  // element: TypeElement<'text'>
}

export const TextMask = (props: TypeProps) => {
  return (
    <div className="idraw-studio-text-mask">
      <div style={{
        position: 'absolute',
        top: 100,
        left: 100,
        width: 200,
        height: 150,
        overflow: 'auto',
        color: '#ffffff',
        fontSize: 20,
      }} contentEditable>
        Hello World
      </div>
    </div>
  )
}
 
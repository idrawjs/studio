import * as React from 'react';
import { TypeElement } from '@idraw/types';

type TypeProps = {
  // left: number;
  // top: number;
  // width: number;
  // height: number;
  // text: string;
  element: TypeElement<'text'> | null;
  onCloseMask: () => void;
}

export const TextMask = (props: TypeProps) => {
  const { onCloseMask } = props;
  return (
    <div className="idraw-studio-text-mask" onClick={onCloseMask}>
      <div style={{
        position: 'absolute',
        top: 100,
        left: 100,
        width: 200,
        height: 150,
        overflow: 'auto',
        color: '#ffffff',
        fontSize: 20,
      }} contentEditable 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        Hello World
      </div>
    </div>
  )
}
 
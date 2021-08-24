import React, { useEffect, useState, useCallback } from 'react';
import iDraw from 'idraw';
import { TypeElement } from '@idraw/types';

type TypeProps = {
  // left: number;
  // top: number;
  // width: number;
  // height: number;
  // text: string;
  idraw: iDraw | null;
  element: TypeElement<'text'> | null;
  onCloseMask: () => void;
}

export const TextMask = (props: TypeProps) => {
  const { onCloseMask, element, idraw } = props;
  const [editorStyle, setEditorStyle] = useState({});
  const [text, setText] = useState<string>('');

  const resetEditor = useCallback(() => {
    const { scale } = idraw.getScreenTransform();
    const point = idraw.pointContextToScreen({ x: element.x, y: element.y });

    setEditorStyle({
      position: 'absolute',
      top: point.y,
      left: point.x,
      width: element.w * scale,
      height: element.h * scale,
      overflow: 'auto',
      textAlign: element.desc.textAlign || 'center',
      fontSize: element.desc.fontSize * scale,
      fontFamily: element.desc.fontFamily,
      fontWeight: element.desc.fontWeight,
      color: '#555555', // element.desc.color, // TODO
      background: '#ffffff',
      wordBreak: 'break-all',
    });
    setText(element.desc.text);
  }, [idraw, element])


  useEffect(() => {
    resetEditor();
  }, [element]);

  return (
    <div className="idraw-studio-text-mask" onClick={onCloseMask}>
      {/* <div style={editorStyle}
        contentEditable 
        suppressContentEditableWarning={true} 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onChange={(e) => {
          console.log('e =====', e)
        }}
      >
        {text}
      </div> */}
      <textarea style={editorStyle}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onChange={(e) => {
          console.log('e =====', e)
        }}
        defaultValue={text}
      >
      </textarea>
    </div>
  )
}
 
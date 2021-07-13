import * as React from 'react';
import classnames from 'classnames';
import { onDragOver } from './../../mods/global';

const { useState, useCallback } = React;

type TypeProps = {
  className?: string;
  style?: React.StyleHTMLAttributes<HTMLDivElement>
  children?: React.ReactChild,
  onActionEnd?: (params: { clientX: number, clientY: number }) => void,
}


const VirtualDrag = (props: TypeProps) => {
  const { onActionEnd } = props;
  const [isDragging, setIsDragging] = useState<boolean>(false); 

  const onMouseDown = useCallback((e) => {
    e.dataTransfer.dropEffect = "move";
    setIsDragging(true);
  }, [isDragging]);

  const onMouseUp = useCallback((e) => {
    setIsDragging(false);
    if (typeof onActionEnd === 'function') {
      onActionEnd({ clientX: e.clientX,  clientY: e.clientY})
    }
  }, [isDragging])


  return (
    <div style={props.style}
      onDragStart={onMouseDown}
      onDragEnd={onMouseUp}
      onDragOver={onDragOver}
      draggable
      className={classnames({
        'idraw-studio-virtual-drag': true,
        [props.className]: (typeof props.className === 'string')
      })}
    >
      {props.children}
    </div>
  )
}

export { VirtualDrag }
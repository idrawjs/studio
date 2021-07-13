import * as React from 'react';
import classnames from 'classnames';
import { onDragOver } from './../../mods/global';
import eventHub from './../../util/event-hub'

const { useState, useCallback } = React;

type TypeProps = {
  className?: string;
  style?: React.StyleHTMLAttributes<HTMLDivElement>
  children?: React.ReactChild
}


const VirtualDrag = (props: TypeProps) => {

  const [isDragging, setIsDragging] = useState<boolean>(false); 

  const onMouseDown = useCallback((e) => {
    e.dataTransfer.dropEffect = "move";
    setIsDragging(true);
  }, [isDragging]);

  const onMouseUp = useCallback((e) => {
    setIsDragging(false);
    eventHub.trigger('studioDragNewElement', {
      clientX: e.clientX,
      clientY: e.clientY,
      element: {
        uuid: '',
        x: 0,
        y: 0,
        w: 100,
        h: 80,
        angle: 0,
        type: 'rect',
        desc: {
          borderColor: '#999999',
          borderWidth: 10,
        }
      },
    })
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
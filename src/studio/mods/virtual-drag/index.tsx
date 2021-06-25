import * as React from 'react';
import classnames from 'classnames';
import util from '@idraw/util';

const { throttle } = util.time;

const { useState, useCallback } = React;

type TypeProps = {
  className?: string;
  style?: React.StyleHTMLAttributes<HTMLDivElement>
  children?: React.ReactChild
}

const VirtualDrag = (props: TypeProps) => {

  const [isDragging, setIsDragging] = useState<boolean>(false);  

  const onMouseDown = useCallback(() => {
    setIsDragging(true);
  }, [isDragging]);
  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, [isDragging])
  const onMouseMove = useCallback((e) => {
    if (isDragging === true) {
      // console.log('dragging ===', e);
    }
  }, [isDragging]);

  return (
    <div style={props.style}
      onDragStart={onMouseDown}
      onDragEnd={onMouseUp}
      onDrag={throttle(onMouseMove.bind(this), 16)}
      draggable
      className={classnames({
        'idraw-studio-virtual-drag': true,
        [props.className]: (typeof props.className === 'string')
      })}
    >
      {props.children}
      {/* {isDragging && (<div className="studio-virtualdrag-content" >
        {props.children}
      </div>)} */}
    </div>
  )
}

export { VirtualDrag }
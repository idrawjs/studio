import * as React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import util from '@idraw/util';
import { TypePoint } from '@idraw/types';
import { onDragOver } from './../../mods/global';

const { throttle } = util.time;

const { useState, useCallback } = React;

type TypeProps = {
  className?: string;
  style?: React.StyleHTMLAttributes<HTMLDivElement>
  children?: React.ReactChild
}


const VirtualElement = (props: { x: number, y: number}) => {

  return (
    <span
      style={{
        position: 'fixed',
        left: props.x || 0,
        top: props.y || 0,
        width: 100,
        height: 100,
        zIndex: 9999,
        border: '1px solid #999999',
      }}
    ></span>)
} 


const container = document.querySelector('body') || document.querySelector('html');
let mount = null;

function showVirtualElement(isShow, p: TypePoint) {
  if (!mount) {
    mount = document.createElement('div');
    container.appendChild(mount);
  }
  ReactDOM.unmountComponentAtNode(mount);
  if (isShow === true) {
    ReactDOM.render(<VirtualElement x={p.x} y={p.y}></VirtualElement>, mount)
  }
} 

const VirtualDrag = (props: TypeProps) => {

  const [isDragging, setIsDragging] = useState<boolean>(false); 

  const onMouseDown = useCallback((e) => {
    e.dataTransfer.dropEffect = "move";
    setIsDragging(true);
  }, [isDragging]);
  const onMouseUp = useCallback(() => {
    setIsDragging(false);
    showVirtualElement(false, { x: 0, y: 0 })
  }, [isDragging])
  const onMouseMove = useCallback((e) => {
    if (isDragging === true) {
      showVirtualElement(true, { x: e.clientX, y: e.clientY });
    }
  }, [isDragging]);

  return (
    <div style={props.style}
      onDragStart={onMouseDown}
      onDragEnd={throttle(onMouseMove.bind(this), 16)}
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
import * as React from 'react';
import { useRef, useState, useCallback } from 'react'; 
// import { TypeData } from '@idraw/types';
 

type TypeProps = {
  children?: React.ReactNode
}

const ScrollBox: React.FC<TypeProps> = (props: TypeProps) => {

  const [moveX, setMoveX] = useState<boolean>(false);
  const refScrollX = useRef(null);

  const onSliderXMouseDown = useCallback((event) => {
    event.preventDefault();
    setMoveX(true);
  }, [moveX]);
  const onSliderXMouseMove = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    if (moveX === true) {
      const num = calcDistanceX(refScrollX, event);
      // TODO
      console.log('num ===', num);
    }
  }, [moveX]);
  const onSliderXMouseUp = useCallback((event) => {
    event.preventDefault();
    setMoveX(false);
  }, [moveX]);

  return (
    <div className="idraw-studio-content-scroll">
      <div>
        {props.children}
      </div>
      <div className="content-scroll-x"
        ref={refScrollX}
        onMouseDown={onSliderXMouseDown}
        onMouseMoveCapture={onSliderXMouseMove}
        onMouseUp={onSliderXMouseUp}
        onMouseLeave={onSliderXMouseUp}
      >
        <div className="content-scroll-slider"></div>
      </div>
      <div className="content-scroll-y">
        <div className="content-scroll-slider"></div>
      </div>
    </div>
  )
}

function calcDistanceX(ref: React.MutableRefObject<any>, event: MouseEvent): number {
  return event.clientX - ref?.current?.getBoundingClientRect()?.left;
}

export default ScrollBox;
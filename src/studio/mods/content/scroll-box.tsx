import * as React from 'react';
import { useRef, useState, useCallback } from 'react';
import util from '@idraw/util';

const { throttle } = util.time;

type TypeProps = {
  onScrollX?: (x: number) => void;
  onScrollY?: (y: number) => void;
  children?: React.ReactNode
}

const ScrollBox: React.FC<TypeProps> = (props: TypeProps) => {

  const [canMoveX, setCanMoveX] = useState<boolean>(false);
  const [canMoveY, setCanMoveY] = useState<boolean>(false);
  const [distanceX, setDistanceX] = useState<number>(0);
  const [distanceY, setDistanceY] = useState<number>(0);
  const refScrollX = useRef(null);
  const refScrollY = useRef(null);
  
  // scroll x
  const onSliderXMouseDown = useCallback((event) => {
    event.preventDefault();
    setCanMoveX(true);
  }, [canMoveX]);
  const onSliderXMouseMove = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    if (canMoveX === true) {
      const num = calcDistanceX(refScrollX, event);
      setDistanceX(num);
    }
  }, [canMoveX]);
  const onSliderXMouseUp = useCallback((event) => {
    event.preventDefault();
    if (canMoveX === true) {
      const num = calcDistanceX(refScrollX, event);
      setDistanceX(num);
    }
    setCanMoveX(false);
  }, [canMoveX]);


  // scroll y
  const onSliderYMouseDown = useCallback((event) => {
    event.preventDefault();
    setCanMoveY(true);
  }, [canMoveY]);
  const onSliderYMouseMove = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    if (canMoveY === true) {
      const num = calcDistanceY(refScrollY, event);
      setDistanceY(num);
    }
  }, [canMoveY]);
  const onSliderYMouseUp = useCallback((event) => {
    event.preventDefault();
    if (canMoveY === true) {
      const num = calcDistanceY(refScrollY, event);
      setDistanceY(num);
    }
    setCanMoveY(false);
  }, [canMoveY]);

  return (
    <div className="idraw-studio-content-scroll">
      <div>
        {props.children}
      </div>
      <div className="content-scroll-x"
        ref={refScrollX}
        onMouseDown={throttle(onSliderXMouseDown, 16)}
        onMouseMoveCapture={throttle(onSliderXMouseMove, 16)}
        onMouseUp={throttle(onSliderXMouseUp, 16)}
        onMouseLeave={throttle(onSliderXMouseUp, 16)}
      >
        <div className="content-scroll-slider"
          style={{transform: `translateX(${distanceX}px)`}}
        ></div>
      </div>
      <div className="content-scroll-y"
        ref={refScrollY}
        onMouseDown={throttle(onSliderYMouseDown, 16)}
        onMouseMoveCapture={throttle(onSliderYMouseMove, 16)}
        onMouseUp={throttle(onSliderYMouseUp, 16)}
        onMouseLeave={throttle(onSliderYMouseUp, 16)}
      >
        <div className="content-scroll-slider"
          style={{transform: `translateY(${distanceY}px)`}}
        ></div>
      </div>
    </div>
  )
}

function calcDistanceX(ref: React.MutableRefObject<any>, event: MouseEvent): number {
  return event.clientX - ref?.current?.getBoundingClientRect()?.left;
}

function calcDistanceY(ref: React.MutableRefObject<any>, event: MouseEvent): number {
  return event.clientY - ref?.current?.getBoundingClientRect()?.top;
}

export default ScrollBox;
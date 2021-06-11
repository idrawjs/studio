import * as React from 'react';
import { useRef, useState, useCallback } from 'react';
import util from '@idraw/util';
import { TypeScreenPosition } from '@idraw/types';

const { throttle } = util.time;

type TypeProps = {
  width: number;
  height: number;
  position: TypeScreenPosition;
  onScrollX?: (x: number) => void;
  onScrollY?: (y: number) => void;
  children?: React.ReactNode
}

const ScrollBox: React.FC<TypeProps> = (props: TypeProps) => {
  const sliderMinSize = 50;
  const { position, width, height } = props;
  const [canMoveX, setCanMoveX] = useState<boolean>(false);
  const [canMoveY, setCanMoveY] = useState<boolean>(false);
  const [distanceX, setDistanceX] = useState<number>(0);
  const [distanceY, setDistanceY] = useState<number>(0);
  const refScrollX = useRef(null);
  const refScrollY = useRef(null);
  
  let xSize = 0;
  let ySize = 0;
  if (position.left <= 0 && position.right <= 0) {
    xSize = Math.max(sliderMinSize, width - (Math.abs(position.left) + Math.abs(position.right)));
  }
  if (position.top <= 0 && position.bottom <= 0) {
    ySize = Math.max(sliderMinSize, height - (Math.abs(position.top) + Math.abs(position.bottom)));
  }
  
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
      const _dx = Math.min(Math.max(0, num - xSize / 2), width - xSize);
      setDistanceX(_dx);
    }
  }, [canMoveX]);
  const onSliderXMouseUp = useCallback((event) => {
    event.preventDefault();
    if (canMoveX === true) {
      const num = calcDistanceX(refScrollX, event);
      const _dx = Math.min(Math.max(0, num - xSize / 2), width - xSize);
      setDistanceX(_dx);
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
      const _dy = Math.min(Math.max(0, num - ySize / 2), height - ySize);
      setDistanceY(_dy);
    }
  }, [canMoveY]);
  const onSliderYMouseUp = useCallback((event) => {
    event.preventDefault();
    if (canMoveY === true) {
      const num = calcDistanceY(refScrollY, event);
      const _dy = Math.min(Math.max(0, num - ySize / 2), height - ySize);
      setDistanceY(_dy);
    }
    setCanMoveY(false);
  }, [canMoveY]);

  return (
    <div className="idraw-studio-content-scroll">
      <div>
        {props.children}
      </div>
      {(xSize > 0) && (
        <div className="content-scroll-x"
          ref={refScrollX}
          onMouseDown={throttle(onSliderXMouseDown, 16)}
          onMouseMoveCapture={throttle(onSliderXMouseMove, 16)}
          onMouseUp={throttle(onSliderXMouseUp, 16)}
          onMouseLeave={throttle(onSliderXMouseUp, 16)}
        >
          <div className="content-scroll-slider"
            style={{
              transform: `translateX(${distanceX}px)`,
              width: xSize
            }}
          ></div>
        </div>
      )}
      {(ySize > 0) && (
        <div className="content-scroll-y"
          ref={refScrollY}
          onMouseDown={throttle(onSliderYMouseDown, 16)}
          onMouseMoveCapture={throttle(onSliderYMouseMove, 16)}
          onMouseUp={throttle(onSliderYMouseUp, 16)}
          onMouseLeave={throttle(onSliderYMouseUp, 16)}
        >
          <div className="content-scroll-slider"
            style={{
              transform: `translateY(${distanceY}px)`,
              height: ySize
            }}
          ></div>
        </div>
      )}
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
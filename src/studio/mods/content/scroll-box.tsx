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
  const { position, width, height, onScrollY, onScrollX } = props;
  const [canMoveX, setCanMoveX] = useState<boolean>(false);
  const [canMoveY, setCanMoveY] = useState<boolean>(false);
  const [distanceX, setDistanceX] = useState<number>(0);
  const [distanceY, setDistanceY] = useState<number>(0);
  const refScrollX = useRef(null);
  const refScrollY = useRef(null);
  
  let xSize = 0;
  let ySize = 0;
  if (position.left <= 0 || position.right <= 0) {
    xSize = Math.max(
      sliderMinSize, width - (
        Math.abs(position.left < 0 ? position.left : 0) + Math.abs(position.right < 0 ? position.right : 0)
      )
    );
    if (xSize >= width) xSize = 0;
  }
  if (position.top <= 0 || position.bottom <= 0) {
    ySize = Math.max(
      sliderMinSize, height - (
        Math.abs(position.top < 0 ? position.top : 0) + Math.abs(position.bottom < 0 ? position.bottom : 0)
      )
    );
    if (ySize >= height) ySize = 0;
  }


  const doScrollX = (dx: number) => {
    if (dx > (width - xSize) || dx < 0) return;
    if (typeof onScrollX === 'function') {
      const scrollX = calcScreenScroll(position.left,  position.right, xSize, width, dx);
      onScrollX(scrollX)
    }
    setDistanceX(dx);
  }

  const doScrollY = (dy: number) => {
    if (dy > (height - ySize) || dy < 0) return;
    if (typeof onScrollY === 'function') {
      const scrollY = calcScreenScroll(position.top,  position.bottom, ySize, height, dy);
      onScrollY(scrollY)
    }
    setDistanceY(dy);
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
      doScrollX(_dx);
    }
  }, [canMoveX]);
  const onSliderXMouseUp = useCallback((event) => {
    event.preventDefault();
    if (canMoveX === true) {
      const num = calcDistanceX(refScrollX, event);
      const _dx = Math.min(Math.max(0, num - xSize / 2), width - xSize);
      doScrollX(_dx);
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
      doScrollY(_dy);
    }
  }, [canMoveY]);
  const onSliderYMouseUp = useCallback((event) => {
    event.preventDefault();
    if (canMoveY === true) {
      const num = calcDistanceY(refScrollY, event);
      const _dy = Math.min(Math.max(0, num - ySize / 2), height - ySize);
      doScrollY(_dy);
    }
    setCanMoveY(false);
  }, [canMoveY]);


  const onWheel = (event) => {
    const { deltaY, deltaX } = event;
    if (deltaY > 0 || deltaY < 0) {
      doScrollY(distanceY + deltaY);
    } else if (deltaX > 0 || deltaX < 0) {
      doScrollX(distanceX + deltaX);
    }
  };

  return (
    <div className="idraw-studio-content-scroll">
      <div onWheelCapture={throttle(onWheel, 16)}>
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

function calcScreenScroll(
  start: number,
  end: number,
  sliderSize: number,
  limitLen: number, 
  moveDistance: number
): number {
  let scrollDistance = start;
  let scrollLen = limitLen - sliderSize;
  if (start <= 0 && end <= 0) {
    scrollLen = Math.abs(start) + Math.abs(end);
  }
  let unit = 1;
  if (scrollLen > 0) {
    unit = scrollLen / (limitLen - sliderSize);
  }
  scrollDistance = 0 - unit * moveDistance; 
  return scrollDistance;
}

export default ScrollBox;
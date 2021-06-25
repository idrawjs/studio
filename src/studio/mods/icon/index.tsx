import React from 'react';
import { SVG } from './svg/svg';

type TypeProps = {
  size: number;
  width?: number;
  height?: number;
  color?: string;
}

type TypeWrapperProps = TypeProps & {
  children: React.ReactChild
}


function Wrapper(props: TypeWrapperProps) {
  return (
    <span
      className="idraw-stuido-icon-wrapper"
      style={{
        width: props.width || props.size,
        height: props.height || props.size,
        color: props.color,
      }}>
      <span
        className="idraw-stuido-icon-content"
        style={{
          width: props.size,
          height: props.size,
          color: props.color
        }}>
        {props.children}
      </span>
    </span>
  )
}


export function IconSVG(props: TypeProps) {
  return (
    <Wrapper {...props}>
      <SVG color={props.color} />
    </Wrapper>
  );
}
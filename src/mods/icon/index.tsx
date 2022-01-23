import React from 'react';
import { SVG } from './svg/svg';
import { Text } from './svg/text';
import { Circle } from './svg/circle';
import { HTML } from './svg/html';

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

export function IconText(props: TypeProps) {
  return (
    <Wrapper {...props}>
      <Text color={props.color} />
    </Wrapper>
  )
}

export function IconCircle(props: TypeProps) {
  return (
    <Wrapper {...props}>
      <Circle color={props.color} />
    </Wrapper>
  )
}

export function IconHTML(props: TypeProps) {
  return (
    <Wrapper {...props}>
      <HTML color={props.color} />
    </Wrapper>
  )
}


import React from 'react';
import { renderToString } from 'react-dom/server';

type TypeProps = {
  children?: React.ReactChildren,
  style?: React.HTMLAttributes<HTMLSpanElement>['style'],
}

export function SpanLayer(props: TypeProps) {
  return (
    <span style={props.style}>
      {props.children}
    </span>
  )
}

// /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
export function parseReactToSVG(
  element: React.ReactElement<any, string | React.JSXElementConstructor<any>>
): string {
  const html = parseReactToHTML(element);
  const reg = /<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi;
  const matchResult = html.match(reg) || [];
  let svg: string = matchResult[0] || '';
  if (svg.indexOf('version') < 0) {
    svg = svg.replace(/^\<svg/, '<svg version="1.1" ');
  }
  if (svg.indexOf('xmlns') < 0) {
    svg = svg.replace(/^\<svg/, '<svg xmlns="http://www.w3.org/2000/svg" ');
  }
  
  return svg;
}

export function parseReactToHTML(
  element: React.ReactElement<any, string | React.JSXElementConstructor<any>>
): string {
  return renderToString(
    <>
    {element}
    </>
  )
}


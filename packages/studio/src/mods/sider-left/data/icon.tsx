import * as React from 'react';
// import util from '@idraw/util';
import { TypeElement, TypeElemDesc } from '@idraw/types';
import { parseReactToSVG } from './util';
import { iconConfigList } from './icon-list';


function createElementData(params: {
  name: string,
  Comp: React.ReactElement<any, string | React.JSXElementConstructor<any>>
}): {
  name: string,
  icon: React.ReactElement,
  element: TypeElement<keyof TypeElemDesc>
} {
  return {
    name: params.name,
    icon: params.Comp,
    element: {
      uuid: '',
      x: 0,
      y: 0,
      w: 100,
      h: 100,
      angle: 0,
      type: 'svg',
      desc: {
        svg: parseReactToSVG(params.Comp)
      },
      extension: {
        subType: 'svg-custom-color',
        currentColor: '#4A90E2FF'
      }
    },
    
  }
}


export const iconDataList: {
  name: string,
  icon: React.ReactElement,
  element: TypeElement<keyof TypeElemDesc>
}[] = iconConfigList.map((item) => {
  return createElementData(item)
});
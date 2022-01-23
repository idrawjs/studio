import {
  TypeData, TypeDataBase,
  TypeElement,
  TypeElemDesc
} from '@idraw/types';
import util from '@idraw/util';
import { parseElementExtension } from './extension';

const { isColorStr } = util.color;

export function getElement(
  data: TypeData, uuid: string
): TypeElement<keyof TypeElemDesc> | null {
  if (data && data.elements && data.elements.length > 0) {
    for (let i = 0; i < data.elements.length; i++) {
      if (data.elements[i].uuid === uuid && data.elements[i].uuid && uuid) {
        return data.elements[i];
      }
    }
  }
  return null;
}

export function checkElementAttrs(
  attrs: { x: number, y: number, w: number, h: number, angle: number }
): boolean {
  const { x, y, w, h, angle } = attrs;
  if (!(isNumber(x) && isNumber(y) && isNumber(w) && isNumber(h) && isNumber(angle))) {
    return false;
  }
  if (!(angle >= -360 && angle <= 360 )) {
    return false;
  }
  return true;
}

export function checkRectDesc(
  desc: any
): boolean {
  const { borderColor, borderRadius, borderWidth, color } = desc;
  if (!isColorStr(color)) {
    return false;
  }
  if (typeof borderColor === 'string' && !isColorStr(borderColor)) {
    return false;
  }
  if (typeof borderRadius === 'number' && !isNumber(borderRadius)) {
    return false;
  }
  if (typeof borderWidth === 'number' && !isNumber(borderWidth)) {
    return false;
  }
  
  return true;
}

function isNumber(data: any) {
  return (typeof data === 'number' && (data > 0 || data <= 0))
}

export function isUnIntegerNumber(data: any) {
  return (
    typeof data === 'number' 
    && /^[0-9]{1,}$/.test(`${data}`)
    && data >= 0
  )
}

// TODO
export function initData(data: TypeData | TypeDataBase): TypeData {
  const result = util.data.deepClone(data);
  result.elements.forEach((elem) => {
    if (!(typeof elem.uuid === 'string' && elem.uuid)) {
      elem.uuid = util.uuid.createUUID();
    }
    elem = parseElementExtension(elem);
  });
  return result;
}


export function getSelectedElement (uuid: string, data: TypeData): TypeElement<keyof TypeElemDesc> | null {
  let elem: TypeElement<keyof TypeElemDesc>|null = null;
  if (data && Array.isArray(data?.elements)) {
    for (let i = 0; i < data?.elements.length; i++) {
      if (data?.elements[i]?.uuid === uuid) {
        elem = data?.elements[i];
        break;
      }
    }
  }
  return elem;
}
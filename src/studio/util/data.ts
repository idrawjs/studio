import {
  TypeData,
  TypeElement,
  TypeElemDesc
} from '@idraw/types';


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

function isNumber(data: any) {
  return (typeof data === 'number' && (data > 0 || data <= 0))
}
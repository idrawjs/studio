import iDraw from 'idraw';
import { TypeElement, TypeElemDesc } from '@idraw/types';

export function parseElementExtension<T extends keyof TypeElemDesc>(
  elem: TypeElement<T>
): TypeElement<T>{
  if (elem.type === 'svg') {
    let _elem = elem as TypeElement<'svg'>;
    elem = parseElementSVGExtension(_elem as TypeElement<'svg'>) as TypeElement<T>;
  }
  return elem;
}

function parseElementSVGExtension(
  elem: TypeElement<'svg'>
): TypeElement<'svg'> {
  if (elem.type === 'svg' && elem.extension?.subType === 'svg-custom-color' && iDraw.is.color(elem.extension?.currentColor)) {
    elem.desc.svg = elem.desc.svg.replace(/[\s]fill=\"[\#0-9a-zA-Z]{1,}\"[\s]/g, ` fill="${elem.extension?.currentColor}" `);
  }
  return elem;
}
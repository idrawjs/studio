import type { iDraw as IDraw } from 'idraw';
import { EventEmitter } from 'idraw';
import type { ElementType, Element, RecursivePartial } from 'idraw';

let idraw: IDraw | null = null;

export function setIDraw(target: IDraw) {
  idraw = target;
}

export function getIDraw(): IDraw | null {
  return idraw;
}

export interface SharedEvent {
  addElement: {
    type: ElementType;
    element: RecursivePartial<Omit<Element, 'uuid' | 'type'>>;
  };
}

export const eventHub = new EventEmitter<SharedEvent>();

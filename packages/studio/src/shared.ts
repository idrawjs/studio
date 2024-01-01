import type { iDraw as IDraw, Data } from 'idraw';
import { EventEmitter } from 'idraw';
import type { ElementType, Element, ElementPosition, RecursivePartial } from 'idraw';

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
  deleteElement: {
    uuid: string;
  };
  resetEditingView: {
    type: 'go-to-group' | 'back-one' | 'back-root';
    position: ElementPosition | null;
  };
  resetData: {
    data: Data;
  };
}

export const eventHub = new EventEmitter<SharedEvent>();

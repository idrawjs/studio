import { iDraw as IDraw, Store, EventEmitter } from 'idraw';
import type { Data } from 'idraw';
import type { ElementType, Element, ElementPosition, RecursivePartial } from 'idraw';

interface clipboardMap {
  'copy-elements': Element[];
  'cut-elements': Element[];
}

export interface SharedStorage {
  idraw: IDraw | null;
  clipboard: {
    type: keyof clipboardMap | string;
    data: clipboardMap[keyof clipboardMap] | any;
  };
  selectedUUIDs: string[];
}

export type SharedStore = Store<SharedStorage>;

export interface SharedEventMap {
  createElement: {
    type: ElementType;
    element: RecursivePartial<Omit<Element, 'uuid' | 'type'>>;
  };
  // addElement: {
  //   element: Element;
  //   position: ElementPosition;
  // };
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
  copy: void;
  paste: void;
  cut: void;
}

export type SharedEvent = EventEmitter<SharedEventMap>;

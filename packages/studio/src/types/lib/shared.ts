import { iDraw as IDraw, Store, EventEmitter } from 'idraw';
import type { Data, ElementType, Element, ElementPosition, RecursivePartial } from 'idraw';
import type { StudioState, StudioActionType } from './context';
import type { LocaleCode } from './locale';
import type { StudioThemeMode } from './context';

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
  dispatch: { type: StudioActionType; payload: Partial<StudioState> };
  createElement: {
    type: ElementType;
    element: RecursivePartial<Omit<Element, 'uuid' | 'type'>>;
  };
  addElement: {
    element: Element;
    position: ElementPosition;
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
  copy: void;
  paste: void;
  cut: void;
  delete: void;
  scrollToLayer: { uuid: string };
  switchTheme: { theme: StudioThemeMode };
  changeLocale: { locale: LocaleCode };
  trackDataChange: { data: Data };
  trackEditingDataChange: { editingData: Data; editingDataPosition: ElementPosition };
}

export type SharedEvent = EventEmitter<SharedEventMap>;

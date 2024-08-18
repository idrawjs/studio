import { iDraw as IDraw, Store, EventEmitter } from 'idraw';
import type { Data, ElementType, Element, ElementPosition, RecursivePartial } from 'idraw';
import type { StudioState, StudioActionType } from './context';
import type { LocaleCode } from './locale';
import type { StudioThemeMode } from './context';
import { SnapshotRecorder } from '../../shared/snapshot-recorder';

interface clipboardMap {
  'copy-elements': Element[];
  'cut-elements': Element[];
}

export interface SharedStorage {
  clipboard: {
    type: keyof clipboardMap | string;
    data: clipboardMap[keyof clipboardMap] | any;
  };
  selectedUUIDs: string[];
}

export interface SharedStatic {
  idraw: IDraw | null;
  snapshotRecorder: SnapshotRecorder | null;
}

export type SharedStore = Store<SharedStorage, SharedStatic>;

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
  arrowMoveElement: {
    type: 'arrow-up' | 'arrow-down' | 'arrow-left' | 'arrow-right';
  };
  addPage: {
    element: Element<'group'>;
    inPageOverview: boolean;
  };
  deletePage: {
    uuid: string;
  };
  resetEditingView: {
    type: 'go-to-page' | 'go-to-group' | 'go-to-next-group' | 'back-one' | 'back-root';
    position: ElementPosition | null;
  };
  resetData: {
    data: Data;
  };
  resetEditingData: {
    editingData: Data;
  };
  copy: void;
  paste: void;
  cut: void;
  delete: void;
  undo: void;
  redo: void;
  scrollToLayer: { uuid: string };
  switchTheme: { theme: StudioThemeMode };
  changeLocale: { locale: LocaleCode };
  trackDataChange: { data: Data };
  trackEditingDataChange: { editingData: Data; editingDataPosition: ElementPosition };
  switchPageOverview: { isPageOverview: boolean };
}

export type SharedEvent = EventEmitter<SharedEventMap>;

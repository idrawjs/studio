import type { Dispatch } from 'react';
import type { Data } from 'idraw';
import type { ElementTreeData, LocaleCode } from '@idraw/studio-base';

export interface StudioState {
  localeCode: LocaleCode;
  themeMode: 'light' | 'dark';
  data: Data;
  treeData: ElementTreeData;
  selectedUUIDs: string[];
  scaleInfo: {
    scale: number;
    offsetX?: number;
    offsetY?: number;
    from: 'event' | 'control' | 'init';
  };
  showRuler: boolean;
  // scale: number;
}

export type StudioActionType = 'update' | 'updateThemeMode' | 'updateData' | 'updateTreeData';

export type StudioAction = {
  type: StudioActionType;
  payload: Partial<StudioState>;
};

export type StudioDispatch = Dispatch<StudioAction>;

export interface StudioContext {
  state: StudioState;
  dispatch: StudioDispatch;
}

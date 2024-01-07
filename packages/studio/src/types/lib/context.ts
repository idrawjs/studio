import type { Dispatch } from 'react';
import type { Data, ElementPosition } from 'idraw';
import type { ElementTreeData, LocaleCode } from '@idraw/studio-base';

export type StudioThemeMode = 'light' | 'dark';

export interface StudioState {
  localeCode: LocaleCode;
  themeMode: StudioThemeMode;
  data: Data;
  editingData: Data;
  editingDataPostion: ElementPosition;
  treeData: ElementTreeData;
  selectedUUIDs: string[];
  scaleInfo: {
    scale: number;
    offsetX?: number;
    offsetY?: number;
    from: 'event' | 'control' | 'init';
  };
}

export type StudioActionType = 'update' | 'updateThemeMode';

export type StudioAction = {
  type: StudioActionType;
  payload: Partial<StudioState>;
};

export type StudioDispatch = Dispatch<StudioAction>;

export interface StudioContext {
  state: StudioState;
  dispatch: StudioDispatch;
}

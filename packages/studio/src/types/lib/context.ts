import type { Dispatch } from 'react';
import type { Data, ElementPosition } from 'idraw';
import type { ElementTreeData, PageTreeData, LocaleCode } from '@idraw/studio-base';

export type StudioThemeMode = 'light' | 'dark';

export type StudioEditMode = 'data' | 'page';

export interface StudioState {
  localeCode: LocaleCode;
  themeMode: StudioThemeMode;
  editMode: StudioEditMode;

  data: Data;
  editingData: Data;
  editingDataPosition: ElementPosition;
  elementTree: ElementTreeData;
  pageTree: PageTreeData;

  selectedUUIDs: string[];
  scaleInfo: {
    scale: number;
    offsetX?: number;
    offsetY?: number;
    from: 'event' | 'control' | 'init';
  };
}

export type StudioActionType = 'update' | 'updateThemeMode' | 'updateEditingDataLayoutToTargetGroup';

export type StudioAction = {
  type: StudioActionType;
  payload: Partial<StudioState>;
};

export type StudioDispatch = Dispatch<StudioAction>;

export interface StudioContext {
  state: StudioState;
  dispatch: StudioDispatch;
}

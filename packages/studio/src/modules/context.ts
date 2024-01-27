import { createContext } from 'react';
import { ElementPosition, getElementPositionFromList } from 'idraw';
import { getElementTree } from '@idraw/studio-base';
import type { Data } from 'idraw';
import { StudioState, StudioAction, StudioContext, StudioProps } from '../types';
import { cloneEditingDataByPosition } from '../util/data';

const defaultThemeMode = 'dark';
const defaultLocale = 'en-US';

export function createStudioContextStateByProps(props?: StudioProps): StudioState {
  const data = {
    elements: [],
    ...(props?.data || {})
  };
  let editingDataPosition: ElementPosition = [];
  let editingData: Data = data;
  if (props?.defaultEditingGroupUUID) {
    editingDataPosition = getElementPositionFromList(props.defaultEditingGroupUUID, data.elements);
  }
  editingData = cloneEditingDataByPosition(editingDataPosition, data);
  const treeData = getElementTree(editingData);

  return {
    localeCode: props?.defaultLocale || defaultLocale,
    themeMode: props?.defaultThemeMode || defaultThemeMode,
    data,
    editingData,
    editingDataPosition,
    treeData,
    selectedUUIDs: props?.defaultSelectedElementUUIDs || [],
    scaleInfo: {
      scale: 1,
      // from: 'control',
      from: 'init',
      ...(props?.defaultScaleInfo || {})
    }
  };
}

export function createStudioContextState(opts?: Partial<StudioState>): StudioState {
  const data = {
    elements: [],
    ...(opts?.data || {})
  };
  return {
    localeCode: 'en-US',
    themeMode: opts?.themeMode || 'light',
    data: {
      elements: [],
      ...(opts?.data || {})
    },
    editingData: cloneEditingDataByPosition([], data),
    editingDataPosition: [],
    treeData: [],
    selectedUUIDs: [],
    scaleInfo: {
      scale: 1,
      from: 'control',
      ...(opts?.scaleInfo || {})
    }
  };
}

export function createStudioReducer(state: StudioState, action: StudioAction): StudioState {
  switch (action.type) {
    case 'update': {
      if (!action?.payload) {
        return state;
      }
      return {
        ...state,
        ...action?.payload
      };
    }
    case 'updateThemeMode': {
      if (!action?.payload?.themeMode) {
        return state;
      }
      return {
        ...state,
        ...{
          themeMode: action?.payload?.themeMode
        }
      };
    }
    default:
      return state;
  }
}

export const Context = createContext<StudioContext>({
  state: createStudioContextState(),
  dispatch: () => {
    return;
  }
});

export const Provider = Context.Provider;

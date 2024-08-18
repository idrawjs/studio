import { createContext } from 'react';
import { ElementPosition, getElementPositionFromList } from 'idraw';
import { getElementTree, getPageTree } from '@idraw/studio-base';
import type { Data } from 'idraw';
import { StudioState, StudioAction, StudioContext, StudioProps } from '../types';
import { cloneEditingDataByPosition, updateEditingDataLayoutToTargetGroup, wrapPageData } from '../util/data';

const defaultThemeMode = 'dark';
const defaultLocale = 'en-US';
const defaultEditMode = 'data';

export function createStudioContextStateByProps(props?: StudioProps): StudioState {
  let data = {
    elements: [],
    ...(props?.data || {})
  };
  if (props?.defaultEditMode === 'page') {
    data = wrapPageData(data);
  }
  let editingDataPosition: ElementPosition = [];
  let editingData: Data = data;

  const pageTree = getPageTree(data);

  if (props?.defaultEditingGroupUUID) {
    editingDataPosition = getElementPositionFromList(props.defaultEditingGroupUUID, data.elements);
  }

  if (props?.defaultEditMode === 'page' && editingDataPosition.length !== 1 && pageTree.length > 0) {
    editingDataPosition = props.reverseTree === true ? [pageTree.length > 0 ? pageTree.length - 1 : 0] : [0];
  }

  editingData = cloneEditingDataByPosition(editingDataPosition, data);

  const elementTree = getElementTree(editingData);

  return {
    localeCode: props?.defaultLocale || defaultLocale,
    themeMode: props?.defaultThemeMode || defaultThemeMode,
    editMode: props?.defaultEditMode || defaultEditMode,
    data,
    editingData,
    editingDataPosition,
    elementTree,
    pageTree,
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
    localeCode: defaultLocale,
    themeMode: opts?.themeMode || defaultThemeMode,
    editMode: opts?.editMode || defaultEditMode,
    data: {
      elements: [],
      ...(opts?.data || {})
    },
    editingData: cloneEditingDataByPosition([], data),
    editingDataPosition: [],
    elementTree: [],
    pageTree: [],
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
    case 'updateEditingDataLayoutToTargetGroup': {
      if (!action?.payload?.editingData) {
        return state;
      }
      const { editingData } = action.payload;

      if (editingData.layout) {
        const { editingDataPosition, data } = state;
        updateEditingDataLayoutToTargetGroup(editingData, editingDataPosition, data);
        return {
          ...state,
          ...{
            data,
            editingData
          }
        };
      }

      return state; // TODO
      // return {
      //   ...state,
      //   ...{
      //     themeMode: action?.payload?.themeMode
      //   }
      // };
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

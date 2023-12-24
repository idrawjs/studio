import { createContext } from 'react';
import { StudioState, StudioAction, StudioContext } from '../types';

export function createStudioContextState(opts?: Partial<StudioState>): StudioState {
  return {
    localeCode: 'en-US',
    themeMode: opts?.themeMode || 'light',
    data: {
      elements: [],
      ...(opts?.data || {})
    },
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
    case 'updateData': {
      if (!action?.payload?.data) {
        return state;
      }
      return {
        ...state,
        ...{
          studioData: action?.payload?.data
        }
      };
    }
    case 'updateTreeData': {
      if (!action?.payload?.treeData) {
        return state;
      }
      return {
        ...state,
        ...{
          studioData: action?.payload?.treeData
        }
      };
    }

    // case 'updateViewDrawData': {
    //   if (!action?.payload?.viewDrawData) {
    //     return state;
    //   }
    //   return {
    //     ...state,
    //     ...{
    //       viewDrawData: action?.payload?.viewDrawData
    //     }
    //   };
    // }
    // case 'switchStudioDataType': {
    //   if (!action?.payload?.activeStudioDataType) {
    //     return state;
    //   }
    //   const newState = {
    //     ...state,
    //     ...{
    //       activeStudioDataType: action?.payload.activeStudioDataType,
    //       viewDrawData: parseDrawData(action?.payload?.activeStudioDataType, state.studioData)
    //     }
    //   };
    //   return newState;
    // }

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

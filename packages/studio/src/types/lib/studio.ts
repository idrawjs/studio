import type { CSSProperties } from 'react';
import type { ElementPosition } from 'idraw';
import type { LocaleCode, StudioData } from '@idraw/studio-base';
import type { DashboardProps } from '../../modules';
import type { SharedEvent, SharedStore } from './shared';
import type { StudioActionType, StudioState, StudioThemeMode, StudioEditMode } from './context';
import type { GetTemplates } from './template';

export type StudioProps = Omit<DashboardProps, 'sharedEvent' | 'sharedStore' | 'useContextMenuOptions' | 'handleKeyboard'> &
  Pick<Partial<DashboardProps>, 'useContextMenuOptions' | 'handleKeyboard'> & {
    className?: string;
    style?: CSSProperties;

    prefiexName?: string;
    defaultLocale?: LocaleCode;
    defaultThemeMode?: StudioThemeMode;
    defaultEditMode?: StudioEditMode;

    defaultScaleInfo?: {
      scale: number;
      offsetX: number;
      offsetY: number;
    };

    // data
    data?: StudioData;
    defaultEditingGroupUUID?: string;
    onEditGroupElement?: (e: { uuid?: string; position: ElementPosition }) => void;
  };

export interface StudioImperativeHandle {
  getSharedStore: () => SharedStore | null;
  getSharedEvent: () => SharedEvent | null;
  dispatch(e: { type: StudioActionType; payload: Partial<StudioState> }): void;
}

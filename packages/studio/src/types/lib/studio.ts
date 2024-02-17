import type { CSSProperties } from 'react';
import type { Data, ElementPosition } from 'idraw';
import type { LocaleCode } from '@idraw/studio-base';
import type { DashboardProps } from '../../modules';
import type { SharedEvent, SharedStore } from './shared';
import type { StudioActionType, StudioState } from './context';

export type StudioProps = Omit<DashboardProps, 'sharedEvent' | 'sharedStore' | 'useContextMenuOptions' | 'handleKeyboard'> &
  Pick<Partial<DashboardProps>, 'useContextMenuOptions' | 'handleKeyboard'> & {
    className?: string;
    style?: CSSProperties;
    data: Data;
    prefiexName?: string;
    defaultLocale?: LocaleCode;
    defaultThemeMode?: 'light' | 'dark';
    defaultScaleInfo?: {
      scale: number;
      offsetX: number;
      offsetY: number;
    };
    defaultEditingGroupUUID?: string;
    onEditGroupElement?: (e: { uuid?: string; position: ElementPosition }) => void;
  };

export interface StudioImperativeHandle {
  getSharedStore: () => SharedStore | null;
  getSharedEvent: () => SharedEvent | null;
  dispatch(e: { type: StudioActionType; payload: Partial<StudioState> }): void;
}

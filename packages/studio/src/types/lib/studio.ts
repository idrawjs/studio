import type { Data } from 'idraw';
import type { LocaleCode } from '@idraw/studio-base';
import type { DashboardProps } from '../../modules';
import type { SharedEvent, SharedStore } from './shared';

export type StudioProps = Omit<DashboardProps, 'sharedEvent' | 'sharedStore'> & {
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
};

export interface StudioImperativeHandle {
  getSharedStore: () => SharedStore | null;
  getSharedEvent: () => SharedEvent | null;
}

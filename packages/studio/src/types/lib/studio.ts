import type { Data } from 'idraw';
import type { LocaleCode } from '@idraw/studio-base';
import type { DashboardProps } from '../../modules';

export type StudioProps = DashboardProps & {
  data: Data;
  defaultLocale?: LocaleCode;
  defaultThemeMode?: 'light' | 'dark';
  defaultScaleInfo?: {
    scale: number;
    offsetX: number;
    offsetY: number;
  };
  defaultEditingGroupUUID?: string;
  logo?: React.ReactNode;
};

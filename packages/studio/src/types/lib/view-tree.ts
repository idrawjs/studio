import type { ElementType } from 'idraw';
import type { StudioDataType } from './data';

export interface ViewTreeNode {
  title: string;
  key: string;
  type: StudioDataType | ElementType;
  children?: ViewTreeNode[];
}

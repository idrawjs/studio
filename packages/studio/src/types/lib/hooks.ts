import type { MenuProps } from 'antd';
import type { Element } from '@idraw/types';
import type { SharedEvent, SharedStore } from './shared';

export type UpdateContextMenuOptions = (opts: { selectedElements: Element[] }) => void;

export type HookUseContextMenuOptions = (props: {
  sharedEvent: SharedEvent;
  sharedStore: SharedStore;
}) => [MenuProps['items'], updateStatus: UpdateContextMenuOptions];

import type { MenuProps } from 'antd';
import type { SharedEvent, SharedStore } from './shared';

export type HookUseContextMenuOptions = (props: { sharedEvent: SharedEvent; sharedStore: SharedStore }) => [MenuProps['items']];

import type { MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocale } from '../locale';
import type { SharedEvent, SharedStore, HookUseContextMenuOptions, UpdateContextMenuOptions } from '../types';

const MenuItem = (props: { label: React.ReactNode; suffix?: React.ReactNode }) => {
  const { label, suffix } = props;
  return (
    <span style={{ display: 'inline-flex', width: 180, flexDirection: 'row', justifyContent: 'space-between' }}>
      <span style={{ display: 'inline-flex' }}>{label}</span>
      <span style={{ display: 'inline-flex', opacity: 0.5 }}>{suffix}</span>
    </span>
  );
};

type InnerContextMenuItem = {
  name: string;
  hotKey: string;
  key: string;
  disabled: boolean;
  onClick: () => void;
};

export const useContextMenuOptions: HookUseContextMenuOptions = (opts: { sharedEvent: SharedEvent; sharedStore: SharedStore }) => {
  const [moduleLocale] = useLocale('contextMenu');
  const { sharedEvent } = opts;
  const defaultInnerItems: InnerContextMenuItem[] = [
    {
      name: moduleLocale.copy,
      hotKey: 'Ctrl+C',
      key: 'copy',
      disabled: true,
      onClick: () => {
        sharedEvent.trigger('copy');
      }
    },
    {
      name: moduleLocale.paste,
      hotKey: 'Ctrl+V',
      key: 'paste',
      disabled: true,
      onClick: () => {
        sharedEvent.trigger('paste');
      }
    },
    {
      name: moduleLocale.cut,
      hotKey: 'Ctrl+X',
      key: 'cut',
      disabled: true,
      onClick: () => {
        sharedEvent.trigger('cut');
      }
    },
    {
      name: moduleLocale.delete,
      hotKey: 'Del',
      key: 'delete',
      disabled: true,
      onClick: () => {
        sharedEvent.trigger('delete');
      }
    }
  ];

  const innerItemsToViewItems = (list: InnerContextMenuItem[]) => {
    const newItems = list.map((innerItem) => {
      const name = (moduleLocale as any)[innerItem?.key as any] || innerItem.name;
      const newItem = {
        label: <MenuItem label={name} suffix={<span>{innerItem.hotKey}</span>} />,
        key: innerItem.key,
        disabled: innerItem.disabled,
        onClick: innerItem.onClick
      };
      return newItem;
    });
    return newItems;
  };

  const [innerItems, setInnerItems] = useState<InnerContextMenuItem[]>(defaultInnerItems);
  const [items, setItems] = useState<Required<MenuProps>['items']>(innerItemsToViewItems(innerItems));

  useEffect(() => {
    setItems(innerItemsToViewItems(innerItems));
  }, [innerItems, moduleLocale]);

  const updateContextMenuOptions: UpdateContextMenuOptions = (opts) => {
    const { selectedElements } = opts;
    innerItems?.forEach((item) => {
      if (item && ['copy', 'cut', 'delete'].includes(item?.key as string)) {
        (item as any).disabled = selectedElements?.length > 0 ? false : true;
      }
    });
    setInnerItems([...innerItems]);
  };

  return [items, updateContextMenuOptions];
};

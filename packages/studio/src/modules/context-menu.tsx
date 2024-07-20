import type { MenuProps } from 'antd';
import React, { useState } from 'react';
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

export const useContextMenuOptions: HookUseContextMenuOptions = (opts: { sharedEvent: SharedEvent; sharedStore: SharedStore }) => {
  const [moduleLocale] = useLocale('contextMenu');
  const { sharedEvent } = opts;
  const defaultItems: MenuProps['items'] = [
    {
      label: <MenuItem label={moduleLocale.copy} suffix={<span>Ctrl+C</span>} />,
      key: 'copy',
      disabled: true,
      onClick: () => {
        sharedEvent.trigger('copy');
      }
    },
    {
      label: <MenuItem label={moduleLocale.paste} suffix={<span>Ctrl+V</span>} />,
      key: 'paste',
      disabled: true,
      onClick: () => {
        sharedEvent.trigger('paste');
      }
    },
    {
      label: <MenuItem label={moduleLocale.cut} suffix={<span>Ctrl+X</span>} />,
      key: 'cut',
      disabled: true,
      onClick: () => {
        sharedEvent.trigger('cut');
      }
    },
    {
      label: <MenuItem label={moduleLocale.delete} suffix={<span>Del</span>} />,
      key: 'delete',
      disabled: true,
      onClick: () => {
        sharedEvent.trigger('delete');
      }
    }
    // {
    //   label: moduleLocale.bringToFront,
    //   key: 'bring-to-front',
    //   disabled: true,
    //   onClick: () => {
    //     console.log('bring-to-front');
    //   }
    // },
    // {
    //   label: moduleLocale.sendToBack,
    //   key: 'send-to-back',
    //   disabled: true,
    //   onClick: () => {
    //     console.log('send-to-back');
    //   }
    // }
  ];
  const [items, setItems] = useState<Required<MenuProps>['items']>(defaultItems);

  const updateContextMenuOptions: UpdateContextMenuOptions = (opts) => {
    const { selectedElements } = opts;
    items?.forEach((item) => {
      if (item && ['copy', 'paste', 'cut', 'delete'].includes(item?.key as string)) {
        (item as any).disabled = selectedElements?.length > 0 ? false : true;
      }
    });
    setItems([...items]);
  };

  return [items, updateContextMenuOptions];
};

// export function createContextMenuOptions() {
//   const items: MenuProps['items'] = [
//     {
//       label: 'Copy',
//       key: 'copy',
//       disabled: true,
//       onClick: () => {
//         console.log('copy');
//       }
//     },
//     {
//       label: 'Paste here',
//       key: 'paste-here',
//       disabled: true,
//       onClick: () => {
//         console.log('paste-here');
//       }
//     },
//     {
//       label: 'Bring to front',
//       key: 'bring-to-front',
//       disabled: true,
//       onClick: () => {
//         console.log('bring-to-front');
//       }
//     },
//     {
//       label: 'Send to back',
//       key: 'send-to-back',
//       disabled: true,
//       onClick: () => {
//         console.log('send-to-back');
//       }
//     }
//   ];
//   return items;
// }

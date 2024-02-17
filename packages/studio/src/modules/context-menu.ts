import type { MenuProps } from 'antd';
import { useLocale } from '../locale';
import type { SharedEvent, SharedStore, HookUseContextMenuOptions } from '../types';

export const useContextMenuOptions: HookUseContextMenuOptions = (opts: { sharedEvent: SharedEvent; sharedStore: SharedStore }) => {
  const [moduleLocale] = useLocale('contextMenu');
  const { sharedEvent } = opts;
  const items: MenuProps['items'] = [
    {
      label: moduleLocale.copy,
      key: 'copy',
      onClick: () => {
        sharedEvent.trigger('copy');
      }
    },
    {
      label: moduleLocale.paste,
      key: 'paste-here',
      onClick: () => {
        sharedEvent.trigger('paste');
      }
    },
    {
      label: moduleLocale.cut,
      key: 'cut',
      onClick: () => {
        sharedEvent.trigger('cut');
      }
    },
    {
      label: moduleLocale.delete,
      key: 'delete',
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
  return [items];
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

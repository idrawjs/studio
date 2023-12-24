import type { MenuProps } from 'antd';

export function createContextMenuOptions() {
  const items: MenuProps['items'] = [
    {
      label: 'Copy',
      key: 'copy',
      disabled: true,
      onClick: () => {
        console.log('copy');
      }
    },
    {
      label: 'Paste here',
      key: 'paste-here',
      disabled: true,
      onClick: () => {
        console.log('paste-here');
      }
    },
    {
      label: 'Bring to front',
      key: 'bring-to-front',
      disabled: true,
      onClick: () => {
        console.log('bring-to-front');
      }
    },
    {
      label: 'Send to back',
      key: 'send-to-back',
      disabled: true,
      onClick: () => {
        console.log('send-to-back');
      }
    }
  ];

  return items;
}

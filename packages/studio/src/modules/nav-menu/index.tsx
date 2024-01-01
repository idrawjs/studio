import React, { useContext, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { ConfigContext, IconRect, IconCircle, IconText, IconStar, IconGroup, IconImage, IconHTML } from '@idraw/studio-base';
import { Dropdown, Button, Space, Modal } from 'antd';
import type { MenuProps, MenuItemProps, ButtonProps } from 'antd';
import { downloadFileFromText } from 'idraw';
// import IconMouse from '../../icons/mouse';
// import IconPen from '../../icons/pen';
// import IconHand from '../../icons/hand';
// import IconFile from '../../icons/file';
import IconMore from '../../icons/more';
import IconApp from '../../icons/app';
import IconDown from '../../icons/down';
import { eventHub } from '../../shared';
import { ElementType } from 'idraw';
import { ExportFile, exportFileDialogWidth } from '../export-image-file';
import { getIDraw } from '../../shared';
import { useLocale } from '../../locale';
import { pickJSONFile } from '../../util/file';

const useModuleLocale = () => {
  const [moduleLocale] = useLocale('NavMenu');
  return moduleLocale;
};
const modName = 'mod-nav-menu';

export interface NavMenuProps {
  className?: string;
  style?: CSSProperties;
}

export const NavMenu = (props: NavMenuProps) => {
  const { className, style } = props;
  const [modal, contextHolder] = Modal.useModal();
  const { createPrefixName } = useContext(ConfigContext);
  const getPrefixName = createPrefixName(modName);
  const rootClassName = getPrefixName();
  const dropdownClassName = getPrefixName('dropdown');
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const moduleLocale = useModuleLocale();
  const clickToAddElement: MenuItemProps['onClick'] = ({ key, domEvent }) => {
    domEvent.preventDefault();
    eventHub.trigger('addElement', { type: key as ElementType, element: {} });
  };

  const resetDevicePixelRatio = (radio: number) => {
    const idraw = getIDraw();
    idraw?.resize({
      devicePixelRatio: radio
    });
  };

  const navItemsMap: Record<string, MenuProps['items']> = {
    // file: [
    //   {
    //     key: 'import',
    //     label: 'Import',
    //     disabled: true
    //   },
    //   {
    //     key: 'export-whole-content',
    //     label: 'Export whole content',
    //     onClick: () => {
    //       modal.info({
    //         icon: null,
    //         title: 'Whole Content',
    //         width: exportFileBoxWidth,
    //         content: <ExportFile />,
    //         footer: null,
    //         closable: true
    //       });
    //     }
    //   }
    // ],
    more: [
      {
        key: 'about-idraw-stuido',
        label: moduleLocale.about,
        disabled: true
      },
      {
        key: 'line',
        type: 'divider'
      },
      {
        key: 'file',
        label: moduleLocale.file,
        children: [
          {
            key: 'import-json-file',
            label: moduleLocale.importJSONFile,
            onClick: () => {
              pickJSONFile({
                success: ({ json }) => {
                  // TODO
                  eventHub.trigger('resetData', { data: json });
                },
                error: () => {
                  // TODO
                }
              });
            }
          },

          {
            key: 'export-image',
            label: moduleLocale.exportImage,
            onClick: () => {
              modal.info({
                icon: null,
                title: 'Whole image file',
                width: exportFileDialogWidth,
                content: <ExportFile />,
                footer: null,
                closable: true
              });
            }
          },
          {
            key: 'export-json-file',
            label: moduleLocale.exportJSONFile,
            onClick: () => {
              const idraw = getIDraw();
              const data = idraw?.getData({ compact: true });
              if (data) {
                const text = JSON.stringify(data);
                downloadFileFromText(text, { fileName: 'downdown.json' });
              }
            }
          }
        ]
      },
      {
        key: 'preferences',
        label: moduleLocale.preferences,
        children: [
          {
            key: 'device-pixel-ratio',
            label: moduleLocale.devicePixelRatio,
            type: 'group',
            children: [
              {
                key: 'device-pixel-ratio-x1',
                label: 'x1',
                onClick: () => {
                  resetDevicePixelRatio(1);
                }
              },
              {
                key: 'device-pixel-ratio-x2',
                label: 'x2',
                onClick: () => {
                  resetDevicePixelRatio(2);
                }
              },
              {
                key: 'device-pixel-ratio-x3',
                label: 'x3',
                onClick: () => {
                  resetDevicePixelRatio(3);
                }
              },
              {
                key: 'device-pixel-ratio-x4',
                label: 'x4',
                onClick: () => {
                  resetDevicePixelRatio(4);
                }
              }
            ]
          }
        ]
      }
    ],
    element: [
      {
        key: 'rect',
        label: moduleLocale.rect,
        icon: <IconRect />,
        onClick: clickToAddElement
      },
      {
        key: 'circle',
        label: moduleLocale.circle,
        icon: <IconCircle />,
        onClick: clickToAddElement
      },
      {
        key: 'text',
        label: moduleLocale.text,
        icon: <IconText />,
        onClick: clickToAddElement
      },
      {
        key: 'image',
        label: moduleLocale.image,
        icon: <IconImage />,
        onClick: clickToAddElement
      },
      {
        key: 'svg',
        label: moduleLocale.svg,
        icon: <IconStar />,
        onClick: clickToAddElement
      },
      {
        key: 'html',
        label: moduleLocale.html,
        disabled: true,
        icon: <IconHTML />,
        onClick: clickToAddElement
      },
      {
        key: 'group',
        label: moduleLocale.group,
        icon: <IconGroup />,
        onClick: clickToAddElement
      }
    ]
  };

  const btnProps: ButtonProps = {
    size: 'small',
    type: 'text'
  };

  const navList: Array<{ key: string; button: React.ReactNode }> = [
    // { button: <IconMouse style={{ fontSize: 20 }} /> },
    // { key: 'file', button: <IconFile style={{ fontSize: 20 }} /> },
    { key: 'more', button: <IconMore style={{ fontSize: 20 }} /> },
    { key: 'element', button: <IconApp style={{ fontSize: 20 }} /> }
  ];

  const refreshSelectedKeys = () => {
    const idraw = getIDraw();
    const newSelectedKeys: string[] = [];
    if (idraw) {
      const { viewSizeInfo } = idraw.getViewInfo();
      const { devicePixelRatio } = viewSizeInfo;
      newSelectedKeys.push(`device-pixel-ratio-x${devicePixelRatio}`);
    }
    setSelectedKeys(newSelectedKeys);
  };

  return useMemo(() => {
    return (
      <div style={style} className={classnames(rootClassName, className)}>
        {navList.map((item, i) => {
          return (
            <Dropdown
              key={i}
              trigger={['click', 'click']}
              menu={{
                // multiple: true,
                items: navItemsMap[item.key] || [],
                selectedKeys
              }}
              placement="bottom"
              overlayClassName={dropdownClassName}
              onOpenChange={(open: boolean) => {
                if (open === true) {
                  refreshSelectedKeys();
                }
              }}
            >
              <Button {...btnProps} onClick={(e) => e.preventDefault()}>
                <Space.Compact>
                  {item.button}
                  <IconDown style={{ fontSize: 10, marginLeft: 4 }} />
                </Space.Compact>
              </Button>
            </Dropdown>
          );
        })}
        {contextHolder}
      </div>
    );
  }, [selectedKeys, moduleLocale]);
};

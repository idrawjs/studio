import React, { useMemo, useState, useContext, useEffect } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { generateClassName, IconRect, IconCircle, IconText, IconStar, IconGroup, IconImage, IconHTML } from '@idraw/studio-base';
import { Dropdown, Button, Space, Modal } from 'antd';
import type { MenuProps, MenuItemProps, ButtonProps } from 'antd';
import { downloadFileFromText } from 'idraw';
import { IconMore, IconApp, IconDown } from '@idraw/studio-base';
import { ElementType } from 'idraw';
import { ExportFile, exportFileDialogWidth } from '../export-image-file';
import { useLocale } from '../../locale';
import { pickJSONFile } from '../../util/file';
import type { SharedEvent, SharedStore } from '../../types';
import { Context } from '../context';

const useModuleLocale = () => {
  const [moduleLocale] = useLocale('NavMenu');
  return moduleLocale;
};
const modName = 'mod-nav-menu';

export interface NavMenuProps {
  className?: string;
  style?: CSSProperties;
  sharedStore: SharedStore;
  sharedEvent: SharedEvent;
}

export const NavMenu = (props: NavMenuProps) => {
  const { className, style, sharedStore, sharedEvent } = props;
  const [modal, contextHolder] = Modal.useModal();
  const rootClassName = generateClassName(modName);
  const dropdownClassName = generateClassName(modName, 'dropdown');
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const moduleLocale = useModuleLocale();
  const clickToCreateElement: MenuItemProps['onClick'] = ({ key, domEvent }) => {
    domEvent.preventDefault();
    sharedEvent.trigger('createElement', { type: key as ElementType, element: { name: key } });
  };
  const { state } = useContext(Context);
  const { editMode, pageTree } = state;

  const [isPageOverview, setIsPageOverview] = useState<boolean>(false);
  useEffect(() => {
    const switchPageOverviewCallback = (e: { isPageOverview: boolean }) => {
      const { isPageOverview } = e;
      setIsPageOverview(!!isPageOverview);
    };
    sharedEvent.on('switchPageOverview', switchPageOverviewCallback);
    return () => {
      sharedEvent.off('switchPageOverview', switchPageOverviewCallback);
    };
  }, []);
  const disabledAddElement = !!(editMode === 'page' && (pageTree.length === 0 || isPageOverview));

  const resetDevicePixelRatio = (radio: number) => {
    const idraw = sharedStore.get('idraw');
    idraw?.resize({
      devicePixelRatio: radio
    });
  };

  const navItemsMap: Record<string, MenuProps['items']> = {
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
                  sharedEvent.trigger('resetData', { data: json });
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
                content: <ExportFile sharedEvent={sharedEvent} sharedStore={sharedStore} />,
                footer: null,
                closable: true
              });
            }
          },
          {
            key: 'export-json-file',
            label: moduleLocale.exportJSONFile,
            onClick: () => {
              const idraw = sharedStore.get('idraw');
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
        disabled: disabledAddElement,
        onClick: clickToCreateElement
      },
      {
        key: 'circle',
        label: moduleLocale.circle,
        icon: <IconCircle />,
        disabled: disabledAddElement,
        onClick: clickToCreateElement
      },
      {
        key: 'text',
        label: moduleLocale.text,
        icon: <IconText />,
        disabled: disabledAddElement,
        onClick: clickToCreateElement
      },
      {
        key: 'image',
        label: moduleLocale.image,
        icon: <IconImage />,
        disabled: disabledAddElement,
        onClick: clickToCreateElement
      },
      {
        key: 'svg',
        label: moduleLocale.svg,
        disabled: disabledAddElement,
        icon: <IconStar />,
        onClick: clickToCreateElement
      },
      {
        key: 'html',
        label: moduleLocale.html,
        disabled: true,
        icon: <IconHTML />,
        onClick: clickToCreateElement
      },
      {
        key: 'group',
        label: moduleLocale.group,
        icon: <IconGroup />,
        disabled: disabledAddElement,
        onClick: clickToCreateElement
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
    const idraw = sharedStore.get('idraw');
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

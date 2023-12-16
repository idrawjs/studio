import React, { useContext, useMemo } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { ConfigContext, IconRect, IconCircle, IconText, IconStar, IconGroup, IconImage, IconHTML } from '@idraw/studio-base';
import { Dropdown, Button, Space } from 'antd';
import type { MenuProps, MenuItemProps, ButtonProps } from 'antd';
// import IconMouse from '../../icons/mouse';
// import IconPen from '../../icons/pen';
// import IconHand from '../../icons/hand';
// import IconMore from '../../icons/more';
import IconFile from '../../icons/file';
import IconApp from '../../icons/app';
import IconDown from '../../icons/down';
import { eventHub } from '../../shared';
import { ElementType } from 'idraw';

const modName = 'mod-nav-menu';

export interface NavMenuProps {
  className?: string;
  style?: CSSProperties;
}

export const NavMenu = (props: NavMenuProps) => {
  const { className, style } = props;
  const { createPrefixName } = useContext(ConfigContext);
  const getPrefixName = createPrefixName(modName);

  const clickToAddElement: MenuItemProps['onClick'] = ({ key, domEvent }) => {
    domEvent.preventDefault();
    eventHub.trigger('addElement', { type: key as ElementType, element: {} });
  };

  const navItemsMap: Record<string, MenuProps['items']> = {
    file: [
      {
        key: 'import',
        label: 'Import',
        disabled: true
      },
      {
        key: 'export',
        label: 'Export',
        disabled: true
      }
    ],
    element: [
      {
        key: 'rect',
        label: 'Rect',
        icon: <IconRect />,
        onClick: clickToAddElement
      },
      {
        key: 'circle',
        label: 'Circle',
        icon: <IconCircle />,
        onClick: clickToAddElement
      },
      {
        key: 'text',
        label: 'Text',
        icon: <IconText />,
        onClick: clickToAddElement
      },
      {
        key: 'image',
        label: 'Image',
        icon: <IconImage />,
        onClick: clickToAddElement
      },
      {
        key: 'svg',
        label: 'SVG',
        icon: <IconStar />,
        onClick: clickToAddElement
      },
      {
        key: 'html',
        label: 'HTML',
        disabled: true,
        icon: <IconHTML />,
        onClick: clickToAddElement
      },
      {
        key: 'group',
        label: 'Group',
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
    { key: 'file', button: <IconFile style={{ fontSize: 20 }} /> },
    { key: 'element', button: <IconApp style={{ fontSize: 20 }} /> }
    // { key: 'more', button: <IconMore style={{ fontSize: 20 }} /> }
  ];

  return useMemo(() => {
    return (
      <div style={style} className={classnames(getPrefixName(), className)}>
        {navList.map((item, i) => {
          return (
            <Dropdown key={i} menu={{ items: navItemsMap[item.key] || [] }} placement="bottom">
              <Button {...btnProps} onClick={(e) => e.preventDefault()}>
                <Space.Compact>
                  {item.button}
                  <IconDown style={{ fontSize: 10, marginLeft: 4 }} />
                </Space.Compact>
              </Button>
            </Dropdown>
          );
        })}
      </div>
    );
  }, []);
};

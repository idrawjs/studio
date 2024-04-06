import React, { useEffect, useState, useContext, forwardRef, useMemo } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { SplitPane, generateClassName } from '@idraw/studio-base';
import { PanelLayer } from '../panel-layer';
import { PanelPage } from '../panel-page';
import { PanelDetail } from '../panel-detail';
import { Header } from '../header';
import { Sketch } from '../sketch';
// import SplitPane from '../split-pane';
import type { SharedEvent, SharedStore, HookUseContextMenuOptions } from '../../types';
import { Context } from '../context';

const modName = 'mod-dashboard';
const leftSiderDefaultWidth = 240;
const rightSiderDefaultWidth = 240;
const headerHeight = 36;

export interface DashboardProps {
  className?: string;
  style?: CSSProperties;
  width: number;
  height: number;
  logo?: React.ReactNode;
  navigationMenu?: React.ReactNode;
  navigationCenter?: React.ReactNode;
  defaultSelectedElementUUIDs?: string[];
  sharedStore: SharedStore;
  sharedEvent: SharedEvent;
  useContextMenuOptions: HookUseContextMenuOptions;
  handleKeyboard: (
    e: KeyboardEvent,
    opts: {
      sharedEvent: SharedEvent;
      sharedStore: SharedStore;
    }
  ) => void;
}

export const Dashboard = forwardRef<HTMLDivElement, DashboardProps>((props: DashboardProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  const {
    className,
    style,
    width,
    height,
    logo,
    navigationMenu,
    navigationCenter,
    defaultSelectedElementUUIDs,
    sharedStore,
    sharedEvent,
    useContextMenuOptions,
    handleKeyboard
  } = props;
  const { state } = useContext(Context);
  const { editMode } = state;
  const [openLeftSider, setOpenLeftSider] = useState<boolean>(true);
  const [openRightSider, setOpenRightSider] = useState<boolean>(true);

  useEffect(() => {
    const hotKeyCallback = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as any).nodeName)) {
        return;
      }
      handleKeyboard(e, { sharedEvent, sharedStore });
    };
    window.addEventListener('keydown', hotKeyCallback);
    return () => {
      window.removeEventListener('keydown', hotKeyCallback);
    };
  }, []);

  const [layout, setLayout] = useState<{
    leftWidth: number;
    rightWidth: number;
    centerWidth: number;
  }>({
    leftWidth: openLeftSider ? leftSiderDefaultWidth : 0,
    rightWidth: openRightSider ? rightSiderDefaultWidth : 0,
    centerWidth: width - (openLeftSider ? leftSiderDefaultWidth : 0) - (openRightSider ? rightSiderDefaultWidth : 0)
  });

  useEffect(() => {
    const newLeftWidth = openLeftSider ? leftSiderDefaultWidth : 0;
    const newRightWidth = openRightSider ? rightSiderDefaultWidth : 0;
    const newCenterWidth = width - newLeftWidth - newRightWidth;

    setLayout({
      leftWidth: newLeftWidth,
      rightWidth: newRightWidth,
      centerWidth: newCenterWidth
    });
  }, [height, width, openLeftSider, openRightSider]);

  const rootClassName = generateClassName(modName);
  const headerClassName = generateClassName(modName, 'header');
  const contentClassName = generateClassName(modName, 'content');
  const leftClassName = generateClassName(modName, 'left');
  const rightClassName = generateClassName(modName, 'right');
  const centerClassName = generateClassName(modName, 'right');

  return useMemo(() => {
    const { leftWidth, rightWidth, centerWidth } = layout;

    return (
      <div ref={ref} className={classnames(rootClassName, className)} style={{ ...style, ...{ width, height, padding: 0 } }}>
        <div className={headerClassName} style={{ height: headerHeight }}>
          <Header
            sharedEvent={sharedEvent}
            sharedStore={sharedStore}
            logo={logo}
            navigationMenu={navigationMenu}
            navigationCenter={navigationCenter}
            openLeftSider={openLeftSider}
            openRightSider={openRightSider}
            onClickToggleLayer={() => {
              const open = openLeftSider ? false : true;

              let newLeftWidth = leftWidth;
              if (open) {
                newLeftWidth = leftSiderDefaultWidth;
              } else {
                newLeftWidth = 0;
              }
              setLayout({
                leftWidth: newLeftWidth,
                rightWidth: rightWidth,
                centerWidth: width - newLeftWidth - rightWidth
              });
              setOpenLeftSider(open);
            }}
            onClickToggleSetting={() => {
              const open = openRightSider ? false : true;
              let newRightWidth = rightWidth;
              if (open) {
                newRightWidth = rightSiderDefaultWidth;
              } else {
                newRightWidth = 0;
              }
              setLayout({
                leftWidth: leftWidth,
                rightWidth: newRightWidth,
                centerWidth: width - leftWidth - newRightWidth
              });
              setOpenRightSider(open);
            }}
          />
        </div>
        <div className={contentClassName} style={{ top: headerHeight }}>
          <SplitPane
            split="vertical"
            defaultSize={centerWidth + rightWidth}
            allowResize
            onChange={(px: number) => {
              const newLeftWidth = width - px;
              const newCenterWidth = px - rightWidth;
              if (newCenterWidth < 100) {
                return;
              }
              setLayout({
                leftWidth: newLeftWidth,
                rightWidth,
                centerWidth: newCenterWidth
              });
            }}
            pane1Style={{
              width: leftWidth
            }}
            pane2Style={{
              width: centerWidth + rightWidth
            }}
          >
            <div>
              {openLeftSider &&
                (editMode === 'page' ? (
                  <PanelPage
                    height={height - headerHeight}
                    className={leftClassName}
                    defaultSelectedElementUUIDs={defaultSelectedElementUUIDs}
                    sharedEvent={sharedEvent}
                    sharedStore={sharedStore}
                    useContextMenuOptions={useContextMenuOptions}
                  />
                ) : (
                  <PanelLayer
                    height={height - headerHeight}
                    className={leftClassName}
                    defaultSelectedElementUUIDs={defaultSelectedElementUUIDs}
                    sharedEvent={sharedEvent}
                    sharedStore={sharedStore}
                    useContextMenuOptions={useContextMenuOptions}
                  />
                ))}
            </div>
            <div style={{ width: layout.centerWidth + layout.rightWidth, display: 'flex', flexDirection: 'row' }}>
              <Sketch
                className={centerClassName}
                width={centerWidth}
                height={height - headerHeight}
                sharedStore={sharedStore}
                sharedEvent={sharedEvent}
                useContextMenuOptions={useContextMenuOptions}
              />
              <div className={rightClassName} style={{ width: rightWidth, height: height - headerHeight }}>
                <PanelDetail />
              </div>
            </div>
          </SplitPane>
        </div>
      </div>
    );
  }, [className, editMode, openLeftSider, openRightSider, layout, height]);
});

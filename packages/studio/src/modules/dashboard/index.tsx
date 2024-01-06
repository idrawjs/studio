import React, { useEffect, useState, useContext, forwardRef, useMemo } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { ConfigContext, SplitPane } from '@idraw/studio-base';
import { PanelLayer } from '../panel-layer';
import { PanelDetail } from '../panel-detail';
import { Header } from '../header';
import { Sketch } from '../sketch';
// import SplitPane from '../split-pane';
import { handleHotKey } from '../hot-key';
import type { SharedEvent, SharedStore } from '../../types';

const modName = 'mod-dashboard';
const leftSiderDefaultWidth = 240;
const rightSiderDefaultWidth = 240;
const headerHeight = 36;

// const prefixName = createPrefixName(modName);

export interface DashboardProps {
  className?: string;
  style?: CSSProperties;
  width: number;
  height: number;
  logo?: React.ReactNode;
  defaultSelectedElementUUIDs?: string[];
  sharedStore: SharedStore;
  sharedEvent: SharedEvent;
}

export const Dashboard = forwardRef<HTMLDivElement, DashboardProps>((props: DashboardProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  const { className, style, width, height, logo, defaultSelectedElementUUIDs, sharedStore, sharedEvent } = props;
  const { createPrefixName } = useContext(ConfigContext);
  const prefixName = createPrefixName(modName);
  const [openLeftSider, setOpenLeftSider] = useState<boolean>(true);
  const [openRightSider, setOpenRightSider] = useState<boolean>(true);

  useEffect(() => {
    window.addEventListener('keydown', handleHotKey);
    return () => {
      window.removeEventListener('keydown', handleHotKey);
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
    const newLeftWidth = leftSiderDefaultWidth;
    const newRightWidth = rightSiderDefaultWidth;
    const newCenterWidth = width - newLeftWidth - newRightWidth;

    setLayout({
      leftWidth: newLeftWidth,
      rightWidth: newRightWidth,
      centerWidth: newCenterWidth
    });
  }, [height, width]);

  return useMemo(() => {
    const { leftWidth, rightWidth, centerWidth } = layout;

    return (
      <div ref={ref} className={classnames(prefixName(), className)} style={{ ...style, ...{ width, height, padding: 0 } }}>
        <div className={prefixName('header')} style={{ height: headerHeight }}>
          <Header
            sharedEvent={sharedEvent}
            sharedStore={sharedStore}
            logo={logo}
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
        <div className={prefixName('content')} style={{ top: headerHeight }}>
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
              {openLeftSider && (
                <PanelLayer
                  height={height - headerHeight}
                  className={prefixName('left')}
                  defaultSelectedElementUUIDs={defaultSelectedElementUUIDs}
                  sharedEvent={sharedEvent}
                  sharedStore={sharedStore}
                />
              )}
            </div>
            <div style={{ width: layout.centerWidth + layout.rightWidth, display: 'flex', flexDirection: 'row' }}>
              <Sketch className={prefixName('center')} width={centerWidth} height={height - headerHeight} sharedStore={sharedStore} sharedEvent={sharedEvent} />
              <div className={prefixName('right')} style={{ width: rightWidth, height: height - headerHeight }}>
                <PanelDetail />
              </div>
            </div>
          </SplitPane>
        </div>
      </div>
    );
  }, [className, openLeftSider, openRightSider, layout, height]);
});

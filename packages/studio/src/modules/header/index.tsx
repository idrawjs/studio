import React, { useContext, useMemo } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { ThemeSwitch, LocaleSelector, ScaleSelector, ConfigContext } from '@idraw/studio-base';
import { formatNumber } from 'idraw';
import { Context } from '../context';
import { NavMenu } from '../nav-menu';
import { Toolbar } from '../toolbar';
import type { ToolbarProps } from '../toolbar';
import type { SharedEvent, SharedStore } from '../../types';

const modName = 'mod-header';

export interface ModProps extends ToolbarProps {
  className?: string;
  style?: CSSProperties;
  logo?: React.ReactNode;
  navigationMenu?: React.ReactNode;
  navigationCenter?: React.ReactNode;
  sharedStore: SharedStore;
  sharedEvent: SharedEvent;
}

export const Header = (props: ModProps) => {
  const {
    logo,
    navigationMenu,
    navigationCenter,
    className,
    style,
    openLeftSider,
    openRightSider,
    onClickToggleLayer,
    onClickToggleSetting,
    sharedStore,
    sharedEvent
  } = props;
  const { state, dispatch } = useContext(Context);
  const { createPrefixName } = useContext(ConfigContext);
  const generateClassName = createPrefixName(modName);
  const rootClassName = generateClassName();
  const leftClassName = generateClassName('left');
  const rightClassName = generateClassName('right');
  const centerClassName = generateClassName('center');

  const localeClassName = generateClassName('locale');
  const scaleClassName = generateClassName('scale');
  const switchClassName = generateClassName('switch');
  const { localeCode, scaleInfo } = state;

  return useMemo(() => {
    return (
      <div style={style} className={classnames(rootClassName, className)}>
        <div className={leftClassName}>
          {logo}
          {navigationMenu ? navigationMenu : <NavMenu sharedStore={sharedStore} sharedEvent={sharedEvent} />}
          <Toolbar
            openLeftSider={openLeftSider}
            openRightSider={openRightSider}
            onClickToggleLayer={onClickToggleLayer}
            onClickToggleSetting={onClickToggleSetting}
            sharedStore={sharedStore}
            sharedEvent={sharedEvent}
          />
        </div>

        {navigationCenter && <div className={centerClassName}>{navigationCenter}</div>}

        <div className={rightClassName}>
          <ScaleSelector
            className={scaleClassName}
            value={`${formatNumber(scaleInfo.scale)}`}
            onChange={(value) => {
              const newScale = parseFloat(value);
              if (newScale > 0) {
                dispatch?.({
                  type: 'update',
                  payload: {
                    scaleInfo: {
                      scale: formatNumber(newScale),
                      from: 'control'
                    }
                  }
                });
              }
            }}
          />
          <LocaleSelector
            className={localeClassName}
            value={localeCode}
            onChange={(value) => {
              dispatch?.({
                type: 'update',
                payload: {
                  localeCode: value
                }
              });
            }}
          />
          <ThemeSwitch
            className={switchClassName}
            theme={state?.themeMode}
            onChange={({ theme }) => {
              dispatch?.({
                type: 'updateThemeMode',
                payload: {
                  themeMode: theme
                }
              });
            }}
          />
        </div>
      </div>
    );
  }, [localeCode, scaleInfo, openLeftSider, openRightSider, onClickToggleLayer, onClickToggleSetting]);
};

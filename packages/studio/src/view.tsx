import React, { useEffect, useReducer, useMemo, useContext, useRef } from 'react';
import type { Data } from 'idraw';
import { ConfigProvider as AntdConfigProvider, theme } from 'antd';
import { getElementTree, ConfigContext, ConfigProvider } from '@idraw/studio-base';
import classnames from 'classnames';
import { Dashboard } from './modules';
import { Provider, createStudioContextState, createStudioReducer } from './modules/context';
import type { DashboardProps } from './modules';

const themeName = 'theme';
const defaultThemeMode = 'dark';

export type StudioProps = DashboardProps & {
  // locale?: string; // TODO
  // themeMode?: 'light' | 'dark'; // TODO
  data: Data;
  defaultScaleInfo: {
    scale: number;
    offsetX: number;
    offsetY: number;
  };
};

export const Studio = (props: StudioProps) => {
  const { width = 1000, height = 600, style, className, data, defaultScaleInfo } = props;
  const [state, dispatch] = useReducer(
    createStudioReducer,
    createStudioContextState({ themeMode: defaultThemeMode, data, scaleInfo: { ...defaultScaleInfo, from: 'init' } })
  );
  const { createPrefixName } = useContext(ConfigContext);
  const themePrefixName = createPrefixName(themeName);
  const refDashboard = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (data) {
      const treeData = getElementTree(data);
      dispatch({
        type: 'update',
        payload: { data, treeData }
      });
    }
  }, []);

  return useMemo(() => {
    return (
      <ConfigProvider topPrefix="my-studio-app" localeCode={state.localeCode} container={refDashboard.current}>
        <Provider value={{ state, dispatch }}>
          <AntdConfigProvider theme={{ algorithm: state.themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
            <Dashboard
              ref={refDashboard}
              width={width}
              height={height}
              style={style}
              className={classnames([themePrefixName(), state.themeMode === 'dark' ? themePrefixName('dark') : '', className])}
            />
          </AntdConfigProvider>
        </Provider>
      </ConfigProvider>
    );
  }, [width, height, state, dispatch, refDashboard]);
};

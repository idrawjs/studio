import React, { useReducer, useMemo, useContext, useRef } from 'react';
import { ConfigProvider as AntdConfigProvider, theme } from 'antd';
import { ConfigContext, ConfigProvider } from '@idraw/studio-base';
import classnames from 'classnames';
import { Dashboard } from './modules';
import { Provider, createStudioContextStateByProps, createStudioReducer } from './modules/context';
import type { StudioProps } from './types';

const themeName = 'theme';

export const Studio = (props: StudioProps) => {
  const { width = 1000, height = 600, style, className, logo, defaultSelectedElementUUIDs } = props;
  const [state, dispatch] = useReducer(createStudioReducer, createStudioContextStateByProps(props));
  const { createPrefixName } = useContext(ConfigContext);
  const themePrefixName = createPrefixName(themeName);
  const refDashboard = useRef<HTMLDivElement | null>(null);

  return useMemo(() => {
    return (
      <ConfigProvider localeCode={state.localeCode} container={refDashboard.current}>
        <Provider value={{ state, dispatch }}>
          <AntdConfigProvider theme={{ algorithm: state.themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
            <Dashboard
              logo={logo}
              ref={refDashboard}
              width={width}
              height={height}
              style={style}
              className={classnames([themePrefixName(), state.themeMode === 'dark' ? themePrefixName('dark') : '', className])}
              defaultSelectedElementUUIDs={defaultSelectedElementUUIDs}
            />
          </AntdConfigProvider>
        </Provider>
      </ConfigProvider>
    );
  }, [width, height, state, dispatch, refDashboard]);
};

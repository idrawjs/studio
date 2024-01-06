import React, { useReducer, useMemo, useContext, useRef, useEffect } from 'react';
import { ConfigProvider as AntdConfigProvider, theme } from 'antd';
import { ConfigContext, ConfigProvider } from '@idraw/studio-base';
import classnames from 'classnames';
import { EventEmitter, Store } from 'idraw';
import { Dashboard } from './modules';
import { Provider, createStudioContextStateByProps, createStudioReducer } from './modules/context';
import type { StudioProps, SharedEventMap, SharedStorage, SharedEvent, SharedStore } from './types';
import { createSharedDefaultStorage } from './shared/store';
import { initActionEvent } from './shared/event';

const themeName = 'theme';

export const Studio = (props: StudioProps) => {
  const { width = 1000, height = 600, style, className, logo, defaultSelectedElementUUIDs } = props;
  const [state, dispatch] = useReducer(createStudioReducer, createStudioContextStateByProps(props));
  const { createPrefixName } = useContext(ConfigContext);
  const themePrefixName = createPrefixName(themeName);
  const refDashboard = useRef<HTMLDivElement | null>(null);
  const refSharedEvent = useRef<SharedEvent | null>(new EventEmitter<SharedEventMap>());
  const refSharedStore = useRef<SharedStore | null>(
    new Store<SharedStorage>({
      defaultStorage: createSharedDefaultStorage()
    })
  );

  useEffect(() => {
    if (!refSharedEvent.current) {
      refSharedEvent.current = new EventEmitter<SharedEventMap>();
    }

    if (!refSharedStore.current) {
      refSharedStore.current = new Store<SharedStorage>({
        defaultStorage: createSharedDefaultStorage()
      });
    }
    initActionEvent({
      sharedEvent: refSharedEvent.current,
      sharedStore: refSharedStore.current
    });
    return () => {
      refSharedStore.current?.clear();
      refSharedEvent.current?.destroy();
      refSharedEvent.current = null;
      refSharedStore.current = null;
    };
  }, []);

  useEffect(() => {
    const sharedStore = refSharedStore.current;
    if (sharedStore) {
      sharedStore.set('selectedUUIDs', [...state.selectedUUIDs]);
    }
  }, [state]);

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
              sharedEvent={refSharedEvent.current as SharedEvent}
              sharedStore={refSharedStore.current as SharedStore}
            />
          </AntdConfigProvider>
        </Provider>
      </ConfigProvider>
    );
  }, [width, height, state, dispatch, refDashboard]);
};

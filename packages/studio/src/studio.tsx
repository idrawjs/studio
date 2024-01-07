import React, { useReducer, useMemo, useContext, useRef, useEffect, useImperativeHandle } from 'react';
import { ConfigProvider as AntdConfigProvider, theme } from 'antd';
import { ConfigContext, ConfigProvider } from '@idraw/studio-base';
import classnames from 'classnames';
import { EventEmitter, Store } from 'idraw';
import { Dashboard } from './modules';
import { Provider, createStudioContextStateByProps, createStudioReducer } from './modules/context';
import type { StudioProps, SharedEventMap, SharedStorage, SharedEvent, SharedStore, StudioImperativeHandle } from './types';
import { createSharedDefaultStorage } from './shared/store';
import { initActionEvent } from './shared/event';

const themeName = 'theme';

export const Studio = React.forwardRef((props: StudioProps, ref: any) => {
  const { width = 1000, height = 600, style, className, logo, navigationMenu, defaultSelectedElementUUIDs, prefiexName } = props;
  const [state, dispatch] = useReducer(createStudioReducer, createStudioContextStateByProps(props));
  const { createPrefixName } = useContext(ConfigContext);
  const themePrefixName = createPrefixName(themeName);
  const themeClassName = themePrefixName();
  const themeDarkClassName = themePrefixName('dark');

  const refDashboard = useRef<HTMLDivElement | null>(null);
  const refSharedEvent = useRef<SharedEvent | null>(new EventEmitter<SharedEventMap>());
  const refSharedStore = useRef<SharedStore | null>(
    new Store<SharedStorage>({
      defaultStorage: createSharedDefaultStorage()
    })
  );

  useImperativeHandle(
    ref,
    () => {
      const handle: StudioImperativeHandle = {
        getSharedEvent() {
          return refSharedEvent.current;
        },
        getSharedStore() {
          return refSharedStore.current;
        }
      };
      return handle;
    },
    []
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
  }, [state.selectedUUIDs]);

  useEffect(() => {
    const sharedEvent = refSharedEvent.current;
    sharedEvent?.trigger('switchTheme', { theme: state.themeMode });
  }, [state.themeMode]);

  useEffect(() => {
    const sharedEvent = refSharedEvent.current;
    sharedEvent?.trigger('changeLocale', { locale: state.localeCode });
  }, [state.localeCode]);

  return useMemo(() => {
    return (
      <ConfigProvider localeCode={state.localeCode} container={refDashboard.current} topPrefix={prefiexName}>
        <Provider value={{ state, dispatch }}>
          <AntdConfigProvider theme={{ algorithm: state.themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
            <Dashboard
              logo={logo}
              navigationMenu={navigationMenu}
              ref={refDashboard}
              width={width}
              height={height}
              style={style}
              className={classnames([themeClassName, state.themeMode === 'dark' ? themeDarkClassName : '', className])}
              defaultSelectedElementUUIDs={defaultSelectedElementUUIDs}
              sharedEvent={refSharedEvent.current as SharedEvent}
              sharedStore={refSharedStore.current as SharedStore}
            />
          </AntdConfigProvider>
        </Provider>
      </ConfigProvider>
    );
  }, [themeClassName, themeDarkClassName, prefiexName, width, height, state, dispatch, refDashboard]);
});

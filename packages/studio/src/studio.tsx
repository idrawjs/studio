import React, { useReducer, useMemo, useRef, useEffect, useImperativeHandle } from 'react';
import { ConfigProvider } from '@idraw/studio-base';
import { EventEmitter, Store, findElementFromListByPosition } from 'idraw';
import { Dashboard } from './modules';
import { Provider, createStudioContextStateByProps, createStudioReducer } from './modules/context';
import type { StudioProps, SharedEventMap, SharedStorage, SharedEvent, SharedStore, StudioImperativeHandle, StudioActionType, StudioState } from './types';
import { createSharedDefaultStorage } from './shared/store';
import { initActionEvent } from './shared/event';

export const Studio = React.forwardRef((props: StudioProps, ref: any) => {
  const { width = 1000, height = 600, style, className, logo, navigationMenu, defaultSelectedElementUUIDs, prefiexName, onEditGroupElement } = props;
  const [state, dispatch] = useReducer(createStudioReducer, createStudioContextStateByProps(props));

  const refDashboard = useRef<HTMLDivElement | null>(null);
  const refSharedEvent = useRef<SharedEvent | null>(new EventEmitter<SharedEventMap>());
  const refSharedStore = useRef<SharedStore | null>(
    new Store<SharedStorage>({
      defaultStorage: createSharedDefaultStorage()
    })
  );

  useEffect(() => {
    const elem = findElementFromListByPosition(state.editingDataPosition, state.data.elements);
    onEditGroupElement?.({
      uuid: elem?.uuid,
      position: [...state.editingDataPosition]
    });
  }, [state.editingDataPosition]);

  useImperativeHandle(
    ref,
    () => {
      const handle: StudioImperativeHandle = {
        getSharedEvent() {
          return refSharedEvent.current;
        },
        getSharedStore() {
          return refSharedStore.current;
        },
        dispatch(e: { type: StudioActionType; payload: Partial<StudioState> }) {
          const { type, payload } = e;
          dispatch({
            type,
            payload
          });
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

  useEffect(() => {
    const sharedEvent = refSharedEvent.current;
    sharedEvent?.trigger('trackDataChange', { data: state.data });
  }, [state.data]);

  useEffect(() => {
    const sharedEvent = refSharedEvent.current;
    sharedEvent?.trigger('trackEditingDataChange', { editingData: state.editingData, editingDataPosition: state.editingDataPosition });
  }, [state.editingData, state.editingDataPosition]);

  return useMemo(() => {
    return (
      <ConfigProvider localeCode={state.localeCode} container={refDashboard.current} topPrefix={prefiexName} themeMode={state.themeMode}>
        <Provider value={{ state, dispatch }}>
          <Dashboard
            logo={logo}
            navigationMenu={navigationMenu}
            ref={refDashboard}
            width={width}
            height={height}
            style={style}
            className={className}
            defaultSelectedElementUUIDs={defaultSelectedElementUUIDs}
            sharedEvent={refSharedEvent.current as SharedEvent}
            sharedStore={refSharedStore.current as SharedStore}
          />
        </Provider>
      </ConfigProvider>
    );
  }, [prefiexName, width, height, state, dispatch, refDashboard]);
});

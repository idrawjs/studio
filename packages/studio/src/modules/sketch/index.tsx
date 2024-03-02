import React, { useRef, useContext, useMemo, useEffect } from 'react';
import classnames from 'classnames';
import { iDraw, findElementsFromListByPositions, eventKeys, getElementPositionFromList, findElementFromListByPosition, calcElementCenter } from 'idraw';
import type { Data, ElementPosition, Element } from 'idraw';
import { ConfigContext, getElementTree } from '@idraw/studio-base';
import type { CSSProperties } from 'react';
import { Dropdown } from 'antd';
import { Context } from '../context';
import type { StudioState, SharedEvent, SharedEventMap, SharedStore, HookUseContextMenuOptions } from '../../types';

import { cloneEditingDataByPosition, updateEditingDataChildrenToData } from '../../util/data';

const modName = 'mod-sketch';

export interface SketchProps {
  className?: string;
  style?: CSSProperties;
  width: number;
  height: number;
  sharedStore: SharedStore;
  sharedEvent: SharedEvent;
  useContextMenuOptions: HookUseContextMenuOptions;
}

export const Sketch = (props: SketchProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const refIDraw = useRef<iDraw | null>(null);
  const refHasFirstDraw = useRef<boolean>(false);
  const { className, style, width, height, sharedEvent, sharedStore, useContextMenuOptions } = props;
  const { generateClassName } = useContext(ConfigContext);
  const { state, dispatch } = useContext(Context);
  const { editingData } = state;
  const modClassName = generateClassName(modName);
  const refEditingDataPosition = useRef<ElementPosition>([]);
  const refEditingData = useRef<Data>(state.editingData);
  const refData = useRef<Data>(state.data);
  const refSelectedUUIDs = useRef<string[]>([]);
  const [contextMenuOptions] = useContextMenuOptions({ sharedEvent, sharedStore });

  useEffect(() => {
    refEditingDataPosition.current = [...state.editingDataPosition];
    refData.current = state.data;
    refEditingData.current = state.editingData;
    refSelectedUUIDs.current = [...state.selectedUUIDs];
  }, [state.editingDataPosition, state.data, state.editingData, state.selectedUUIDs]);

  useEffect(() => {
    if (!ref?.current) {
      return;
    }
    if (refIDraw?.current) {
      return;
    }

    const options = {
      width,
      height,
      devicePixelRatio: window.devicePixelRatio
    };
    const idraw = new iDraw(ref.current, options);
    refIDraw.current = idraw;

    const listenMiddlewareEventSelect = (e: { uuids: string[]; positions: ElementPosition[] }) => {
      const editingData = refEditingData.current;
      let { uuids } = e;
      const { positions } = e;
      if (positions && Array.isArray(positions)) {
        const elems = findElementsFromListByPositions(positions, editingData.elements);
        uuids = elems.map((e: { uuid: any }) => e.uuid);
      }
      dispatch({
        type: 'update',
        payload: {
          selectedUUIDs: uuids
        }
      });
    };

    const listenDataChange = (e: { data: Data; type: string }) => {
      const { data, type } = e;
      const editingData = refEditingData.current;
      if (['addElement', 'updateElement', 'deleteElement', 'moveElement', 'dragElement', 'resizeElement'].includes(type)) {
        const payload: Partial<StudioState> = { editingData: { ...data } };
        if (['addElement', 'deleteElement', 'moveElement'].includes(type)) {
          payload.treeData = getElementTree(editingData);
        }
        dispatch({
          type: 'update',
          payload
        });
      }
    };

    const listenMiddlewareEventScale = (e: { scale: number }) => {
      const { scale } = e;
      dispatch({
        type: 'update',
        payload: {
          scaleInfo: {
            scale,
            from: 'event'
          }
        }
      });
    };

    const listenMiddlewareEventTextChange = (e: any) => {
      const { element } = e;
      idraw.updateElement(element);
      const newEditingData = {
        ...(idraw.getData() as Data)
      };
      const newTreeData = getElementTree(newEditingData);
      dispatch({
        type: 'update',
        payload: {
          editingData: { ...newEditingData },
          treeData: newTreeData
        }
      });
    };

    const createElementCallback = (e: SharedEventMap['createElement']) => {
      const { type, element } = e;
      const elem = idraw.createElement(type, { element, viewCenter: true });
      let centerPoint = idraw.getViewCenter();

      const selectUUIDs = refSelectedUUIDs.current;
      let addPosition: ElementPosition = [];
      const currentData = idraw.getData() as Data;
      if (Array.isArray(selectUUIDs) && selectUUIDs.length === 1) {
        const uuid = selectUUIDs[0];
        const selectedPos = getElementPositionFromList(uuid, currentData.elements);
        let selectedElem = findElementFromListByPosition(selectedPos, currentData.elements) as Element<'group'>;
        if (selectedPos.length > 1) {
          addPosition = [...selectedPos];
          let targetIndex = addPosition.pop() as number;
          targetIndex += 1;
          const parentPos = [...addPosition];
          addPosition.push(targetIndex);
          selectedElem = findElementFromListByPosition(parentPos, currentData.elements) as Element<'group'>;
          centerPoint = calcElementCenter(selectedElem);
          elem.x = centerPoint.x - elem.w / 2;
          elem.y = centerPoint.y - elem.h / 2;
        }
      }

      const newEditingData = idraw.addElement(elem, {
        position: addPosition
      });
      const newTreeData = getElementTree(newEditingData);

      dispatch({
        type: 'update',
        payload: {
          editingData: { ...newEditingData },
          treeData: newTreeData
        }
      });
      idraw.selectElements([elem.uuid]);
    };

    const addElementCallback = (e: SharedEventMap['addElement']) => {
      const { element, position = [] } = e;
      let centerPoint = idraw.getViewCenter();

      const selectUUIDs = refSelectedUUIDs.current;
      let addPosition: ElementPosition = position;
      const currentData = idraw.getData() as Data;
      if (Array.isArray(selectUUIDs) && selectUUIDs.length === 1) {
        const uuid = selectUUIDs[0];
        const selectedPos = getElementPositionFromList(uuid, currentData.elements);
        const selectedElem = findElementFromListByPosition(selectedPos, currentData.elements) as Element<'group'>;
        if (selectedPos.length > 0 && selectedElem?.type === 'group' && Array.isArray(selectedElem.detail.children)) {
          addPosition = [...selectedPos];
          addPosition.push(selectedElem.detail.children.length);
          centerPoint = calcElementCenter(selectedElem);
        }
      }

      const newEditingData = idraw.addElement(
        {
          ...element,
          ...{
            x: centerPoint.x - element.w / 2,
            y: centerPoint.y - element.h / 2
          }
        },
        { position: addPosition }
      );

      const newTreeData = getElementTree(newEditingData);
      dispatch({
        type: 'update',
        payload: {
          editingData: { ...newEditingData },
          treeData: newTreeData
        }
      });
      idraw.selectElements([element.uuid]);
    };

    const deleteElementCallback = (e: SharedEventMap['deleteElement']) => {
      const { uuid } = e;
      idraw?.deleteElement(uuid);
      const editingData = idraw?.getData();
      if (editingData) {
        const treeData = getElementTree(editingData);
        dispatch({
          type: 'update',
          payload: { editingData: { ...editingData }, treeData }
        });
        idraw.trigger(eventKeys.clearSelect, {});
      }
    };

    const resetEditingViewCallback = (e: SharedEventMap['resetEditingView']) => {
      const { type, position } = e;
      const idraw = refIDraw?.current;
      if (!idraw) {
        return;
      }

      const editingDataPosition = refEditingDataPosition.current;
      const data = refData.current;
      const editingData = refEditingData.current;

      // update current position editing data to data
      if (editingDataPosition.length > 0) {
        updateEditingDataChildrenToData(editingDataPosition, editingData, data);
      }

      if (type === 'go-to-group' && position) {
        // update new editing data
        const newEditingDataPosition = [...editingDataPosition, ...position];
        const newEditingData = cloneEditingDataByPosition(newEditingDataPosition, data);
        const newTreeData = getElementTree(newEditingData);

        dispatch({
          type: 'update',
          payload: {
            data: { ...data },
            editingData: { ...newEditingData },
            editingDataPosition: newEditingDataPosition,
            treeData: newTreeData
          }
        });
        // idraw.setViewScale({
        //   scale: 1,
        //   offsetX: 0,
        //   offsetY: 0
        // });
        idraw.centerContent({ data: newEditingData });

        idraw.trigger(eventKeys.clearSelect, {});
      } else if (type === 'back-one' && editingDataPosition.length > 0) {
        const newEditingDataPosition = [...editingDataPosition];
        newEditingDataPosition.pop();

        const newEditingData = cloneEditingDataByPosition(newEditingDataPosition, data);
        const newTreeData = getElementTree(newEditingData);
        dispatch({
          type: 'update',
          payload: {
            data: { ...data },
            editingData: { ...newEditingData },
            editingDataPosition: [...newEditingDataPosition],
            treeData: newTreeData
          }
        });
        // idraw.setViewScale({
        //   scale: 1,
        //   offsetX: 0,
        //   offsetY: 0
        // });
        idraw.centerContent({ data: newEditingData });
        idraw.trigger(eventKeys.clearSelect, {});
      } else if (type === 'back-root') {
        // update new editing data
        const newEditingDataPosition: ElementPosition = [];
        const newEditingData = cloneEditingDataByPosition(newEditingDataPosition, data);
        const newTreeData = getElementTree(newEditingData);
        dispatch({
          type: 'update',
          payload: {
            data: { ...data },
            editingData: newEditingData,
            editingDataPosition: newEditingDataPosition,
            treeData: newTreeData
          }
        });
        // idraw.setViewScale({
        //   scale: 1,
        //   offsetX: 0,
        //   offsetY: 0
        // });
        idraw.centerContent({ data: newEditingData });
        idraw.trigger(eventKeys.clearSelect, {});
      }
    };

    const resetDataCallback = (e: SharedEventMap['resetData']) => {
      const { data } = e;
      const newEditingDataPosition: ElementPosition = [];
      const newEditingData = cloneEditingDataByPosition(newEditingDataPosition, data);
      const newTreeData = getElementTree(newEditingData);

      dispatch({
        type: 'update',
        payload: {
          data: { ...data },
          editingData: { ...newEditingData },
          editingDataPosition: newEditingDataPosition,
          treeData: newTreeData
        }
      });
      idraw.setViewScale({
        scale: 1,
        offsetX: 0,
        offsetY: 0
      });
      idraw.trigger(eventKeys.clearSelect, {});
    };

    const resetEditingDataCallback = (e: SharedEventMap['resetEditingData']) => {
      const { editingData } = e;
      const newTreeData = getElementTree(editingData);
      dispatch({
        type: 'update',
        payload: {
          editingData: { ...editingData },
          treeData: newTreeData
        }
      });
      idraw.trigger(eventKeys.clearSelect, {});
    };

    idraw.on(eventKeys.select, listenMiddlewareEventSelect);
    idraw.on(eventKeys.change, listenDataChange);
    idraw.on(eventKeys.scale, listenMiddlewareEventScale);
    idraw.on(eventKeys.textChange, listenMiddlewareEventTextChange);
    sharedEvent.on('createElement', createElementCallback);
    sharedEvent.on('addElement', addElementCallback);
    sharedEvent.on('deleteElement', deleteElementCallback);
    sharedEvent.on('resetEditingView', resetEditingViewCallback);
    sharedEvent.on('resetData', resetDataCallback);
    sharedEvent.on('resetEditingData', resetEditingDataCallback);
    sharedEvent.on('dispatch', dispatch);

    if (!refHasFirstDraw.current) {
      if (state.scaleInfo) {
        const { scale, offsetX, offsetY } = state.scaleInfo;
        if (scale && offsetX && offsetY) {
          idraw.setViewScale({
            scale,
            offsetX,
            offsetY
          });
        }
      }
      refHasFirstDraw.current = true;
    }

    sharedStore.set('idraw', idraw);

    return () => {
      refHasFirstDraw.current = false;
      idraw.off(eventKeys.select, listenMiddlewareEventSelect);
      idraw.off(eventKeys.change, listenDataChange);
      idraw.off(eventKeys.scale, listenMiddlewareEventScale);
      idraw.off(eventKeys.textChange, listenMiddlewareEventTextChange);
      // sharedEvent.off('createElement', createElementCallback);
      // sharedEvent.off('addElement', addElementCallback);
      // sharedEvent.off('deleteElement', deleteElementCallback);
      // sharedEvent.off('resetEditingView', resetEditingViewCallback);
      // sharedEvent.off('resetData', resetDataCallback);
      sharedStore.set('idraw', null);
    };
  }, []);

  useEffect(() => {
    if (refIDraw?.current) {
      const idraw: iDraw = refIDraw.current;
      idraw.setData(editingData);
    }
  }, [editingData]);

  useEffect(() => {
    if (refIDraw?.current) {
      const idraw: iDraw = refIDraw.current;
      if (state.scaleInfo.from === 'control') {
        idraw.scale({
          scale: state.scaleInfo.scale,
          point: {
            x: width / 2,
            y: height / 2
          }
        });
      }
    }
  }, [state.scaleInfo]);

  useEffect(() => {
    const idraw: iDraw | null = refIDraw.current;
    const container: HTMLDivElement | null = ref.current;
    if (idraw) {
      idraw.resize({ width, height });
    }
    if (container) {
      container.style.width = `${width}px`;
      container.style.height = `${height}px`;
    }
  }, [width, height]);

  return useMemo(() => {
    return (
      <Dropdown menu={{ items: contextMenuOptions }} trigger={['contextMenu']}>
        <div
          ref={ref}
          className={classnames(modClassName, className)}
          style={{ ...style, ...{ width, height, padding: 0 } }}
          // onKeyDown={(e: React.KeyboardEvent) => {
          //   console.log('onKeyDown e ========= ', e);
          // }}
        ></div>
      </Dropdown>
    );
  }, [contextMenuOptions]);
};

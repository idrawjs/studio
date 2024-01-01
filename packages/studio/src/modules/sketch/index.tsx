import React, { useRef, useContext, useMemo, useEffect } from 'react';
import classnames from 'classnames';
import { iDraw, middlewareEventSelect, middlewareEventScale, findElementsFromListByPositions, middlewareEventSelectClear } from 'idraw';
import type { Data, ElementPosition } from 'idraw';
import { ConfigContext, getElementTree } from '@idraw/studio-base';
import type { CSSProperties } from 'react';
import { Dropdown } from 'antd';
import { Context } from '../context';
import { setIDraw, eventHub } from '../../shared';
import type { StudioState } from '../../types';
import { createContextMenuOptions } from '../action';
import { cloneEditingDataByPosition, updateEditingDataChildrenToData } from '../../util/data';

const modName = 'mod-sketch';

export interface SketchProps {
  className?: string;
  style?: CSSProperties;
  width: number;
  height: number;
}

export const Sketch = (props: SketchProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const refIDraw = useRef<iDraw | null>(null);
  const refHasFirstDraw = useRef<boolean>(false);
  const { className, style, width, height } = props;
  const { getPrefixName } = useContext(ConfigContext);
  const { state, dispatch } = useContext(Context);
  const { editingData } = state;
  const modClassName = getPrefixName(modName);
  const refEditingDataPosition = useRef<ElementPosition>([]);
  const refEditingData = useRef<Data>(state.editingData);
  const refData = useRef<Data>(state.data);

  useEffect(() => {
    refEditingDataPosition.current = [...state.editingDataPostion];
    refData.current = state.data;
    refEditingData.current = state.editingData;
  }, [state.editingDataPostion, state.data, state.editingData]);

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

    idraw.on(middlewareEventSelect, ({ uuids, positions }) => {
      const editingData = refEditingData.current;
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
    });

    idraw.on('change', ({ data, type }) => {
      const editingData = refEditingData.current;
      if (['add-element', 'update-element', 'delete-element', 'move-element', 'drag-element', 'resize-element'].includes(type)) {
        const payload: Partial<StudioState> = { editingData: { ...data } };
        if (['add-element', 'delete-element', 'move-element'].includes(type)) {
          payload.treeData = getElementTree(editingData);
        }
        dispatch({
          type: 'update',
          payload
        });
      }
    });

    idraw.on(middlewareEventScale, ({ scale }) => {
      dispatch({
        type: 'update',
        payload: {
          scaleInfo: {
            scale,
            from: 'event'
          }
        }
      });
    });

    eventHub.on('addElement', ({ type, element }) => {
      // const data = refData.current;
      // const editingData = refEditingData.current;
      // const editingDataPosition = refEditingDataPosition.current;

      const elem = idraw.createElement(type, { element, viewCenter: true });
      const newEditingData = idraw.addElement(elem);
      const newTreeData = getElementTree(newEditingData);

      dispatch({
        type: 'update',
        payload: {
          editingData: { ...newEditingData },
          treeData: newTreeData
        }
      });
      idraw.selectElements([elem.uuid]);
    });

    eventHub.on('deleteElement', ({ uuid }) => {
      idraw?.deleteElement(uuid);
      const editingData = idraw?.getData();
      if (editingData) {
        const treeData = getElementTree(editingData);
        dispatch({
          type: 'update',
          payload: { editingData: { ...editingData }, treeData }
        });
        idraw.trigger(middlewareEventSelectClear, {});
      }
    });

    eventHub.on('resetEditingView', ({ type, position }) => {
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
        const newEditingDataPostion = [...editingDataPosition, ...position];
        const newEditingData = cloneEditingDataByPosition(newEditingDataPostion, data);
        const newTreeData = getElementTree(newEditingData);

        dispatch({
          type: 'update',
          payload: {
            data: { ...data },
            editingData: { ...newEditingData },
            editingDataPostion: newEditingDataPostion,
            treeData: newTreeData
          }
        });
        idraw.setViewScale({
          scale: 1,
          offsetX: 0,
          offsetY: 0
        });

        idraw.trigger(middlewareEventSelectClear, {});
      } else if (type === 'back-one' && editingDataPosition.length > 0) {
        const newEditingDataPostion = [...editingDataPosition];
        newEditingDataPostion.pop();

        const newEditingData = cloneEditingDataByPosition(newEditingDataPostion, data);
        const newTreeData = getElementTree(newEditingData);
        dispatch({
          type: 'update',
          payload: {
            data: { ...data },
            editingData: { ...newEditingData },
            editingDataPostion: [...newEditingDataPostion],
            treeData: newTreeData
          }
        });
        idraw.setViewScale({
          scale: 1,
          offsetX: 0,
          offsetY: 0
        });
        idraw.trigger(middlewareEventSelectClear, {});
      } else if (type === 'back-root') {
        // update new editing data
        const newEditingDataPostion: ElementPosition = [];
        const newEditingData = cloneEditingDataByPosition(newEditingDataPostion, data);
        const newTreeData = getElementTree(newEditingData);
        dispatch({
          type: 'update',
          payload: {
            data: { ...data },
            editingData: newEditingData,
            editingDataPostion: newEditingDataPostion,
            treeData: newTreeData
          }
        });
        idraw.setViewScale({
          scale: 1,
          offsetX: 0,
          offsetY: 0
        });
        idraw.trigger(middlewareEventSelectClear, {});
      }
    });

    eventHub.on('resetData', ({ data }) => {
      const newEditingDataPostion: ElementPosition = [];
      const newEditingData = cloneEditingDataByPosition(newEditingDataPostion, data);
      const newTreeData = getElementTree(newEditingData);

      dispatch({
        type: 'update',
        payload: {
          data: { ...data },
          editingData: { ...newEditingData },
          editingDataPostion: newEditingDataPostion,
          treeData: newTreeData
        }
      });
      idraw.setViewScale({
        scale: 1,
        offsetX: 0,
        offsetY: 0
      });
      idraw.trigger(middlewareEventSelectClear, {});
    });

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

    setIDraw(idraw);
  }, [dispatch, state.scaleInfo]);

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
      <Dropdown menu={{ items: createContextMenuOptions() }} trigger={['contextMenu']}>
        <div ref={ref} className={classnames(modClassName, className)} style={{ ...style, ...{ width, height, padding: 0 } }}></div>
      </Dropdown>
    );
  }, []);
};

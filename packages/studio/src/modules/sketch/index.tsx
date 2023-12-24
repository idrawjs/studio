import React, { useRef, useContext, useMemo, useEffect } from 'react';
import classnames from 'classnames';
import { iDraw, middlewareEventSelect, middlewareEventScale, findElementsFromListByPositions } from 'idraw';
import { ConfigContext, getElementTree } from '@idraw/studio-base';
import type { CSSProperties } from 'react';
import { Dropdown } from 'antd';
import { Context } from '../context';
import { setIDraw, eventHub } from '../../shared';
import type { StudioState } from '../../types';
import { createContextMenuOptions } from '../action';

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
  const { data } = state;
  const modClassName = getPrefixName(modName);

  useEffect(() => {
    if (ref?.current) {
      if (!refIDraw?.current) {
        const options = {
          width,
          height,
          devicePixelRatio: 1
        };
        const idraw = new iDraw(ref.current, options);
        refIDraw.current = idraw;

        idraw.on(middlewareEventSelect, ({ uuids, positions }) => {
          if (positions && Array.isArray(positions)) {
            const elems = findElementsFromListByPositions(positions, state.data.elements);
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
          if (['add-element', 'update-element', 'delete-element', 'move-element'].includes(type)) {
            const payload: Partial<StudioState> = { data: { ...data } };
            if (['add-element', 'delete-element', 'move-element'].includes(type)) {
              payload.treeData = getElementTree(data);
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
          const elem = idraw.createElement(type, { element, viewCenter: true });
          const data = idraw.addElement(elem);
          idraw.selectElements([elem.uuid]);
          dispatch({
            type: 'update',
            payload: {
              data: { ...data },
              treeData: getElementTree(data)
            }
          });
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
      }
    }
  }, [dispatch, state.data, state.selectedUUIDs, state.scaleInfo]);

  useEffect(() => {
    if (refIDraw?.current) {
      const idraw: iDraw = refIDraw.current;
      idraw.setData(data);
    }
  }, [data]);

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

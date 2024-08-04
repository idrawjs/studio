import React, { useContext, useEffect, useMemo, useRef } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { generateClassName, ElementTree, getElementTree, IconDoubleLeft, IconLeft } from '@idraw/studio-base';
import { updateElementInList, moveElementPosition, getGroupQueueFromList, findElementFromListByPosition } from 'idraw';
import type { ElementPosition } from 'idraw';
import { Dropdown, Button } from 'antd';
import { Context } from '../context';
import type { SharedEvent, SharedStore, HookUseContextMenuOptions } from '../../types';

const modName = 'mod-panel-layer';

export interface PanelLayerProps {
  className?: string;
  height: number;
  style?: CSSProperties;
  // defaultSelectedElementUUIDs?: string[];
  sharedStore: SharedStore;
  sharedEvent: SharedEvent;
  useContextMenuOptions: HookUseContextMenuOptions;
}

export const PanelLayer = (props: PanelLayerProps) => {
  const { className, style, height, sharedStore, sharedEvent, useContextMenuOptions } = props;
  const { state, dispatch } = useContext(Context);
  const { elementTree, selectedUUIDs, editingData } = state;

  const refTree = useRef<{
    scrollTo: (e: { key: string | number; align?: 'top' | 'bottom' | 'auto'; offset?: number }) => void;
  } | null>(null);
  const rootClassName = generateClassName(modName);
  const contentClassName = generateClassName(modName, 'content');
  const headerClassName = generateClassName(modName, 'header');
  const headerTitleClassName = generateClassName(modName, 'header', 'title');
  const headerBtnClassName = generateClassName(modName, 'header', 'btn');
  // const footerClassName = generateClassName(modName, 'footer');
  const [contextMenuOptions, updateContextMenuOptions] = useContextMenuOptions({ sharedEvent, sharedStore });

  const getCurrentName = () => {
    if (state.editingDataPosition.length === 0) {
      return '';
    }
    const elem = findElementFromListByPosition(state.editingDataPosition, state.data.elements);
    return elem?.name || elem?.type || '';
  };

  const selectElementsByPositions = (positions: ElementPosition[]) => {
    const idraw = sharedStore.getStatic('idraw');
    idraw?.selectElementsByPositions(positions);
  };

  useEffect(() => {
    sharedEvent.on('scrollToLayer', ({ uuid }) => {
      if (uuid) {
        refTree.current?.scrollTo({
          key: uuid,
          align: 'top'
          // offset: 0
        });
      }
    });
  }, []);

  useEffect(() => {
    if (!selectedUUIDs[0]) {
      return;
    }
    if (selectedUUIDs.length === 1) {
      const groupQueue = getGroupQueueFromList(selectedUUIDs[0], editingData.elements);
      const uuidQueue = groupQueue.map((elem) => elem.uuid);
      if (selectedUUIDs[0]) {
        uuidQueue.push(selectedUUIDs[0]);
      }
    }
  }, [selectedUUIDs, editingData]);

  const onClickBackRootEdit = () => {
    sharedEvent.trigger('resetEditingView', { type: 'back-root', position: null });
  };

  const onClickBackOne = () => {
    sharedEvent.trigger('resetEditingView', { type: 'back-one', position: null });
  };

  const headerHeight = 32;
  const elementsHeight = height - headerHeight;

  return useMemo(() => {
    if (!(Array.isArray(elementTree) && elementTree.length > 0)) {
      return (
        <div
          style={style}
          className={classnames(rootClassName, className)}
          onContextMenu={(e) => {
            e.preventDefault();
          }}
        >
          <div className={headerClassName}>...</div>
          <div className={contentClassName}>
            <div style={{ padding: '20px 0', textAlign: 'center' }}>Empty</div>
          </div>
          {/* <div className={footerClassName}>...</div> */}
        </div>
      );
    }

    return (
      <div
        style={style}
        className={classnames(rootClassName, className)}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        <div className={headerClassName} style={{ height: headerHeight }}>
          <Button
            className={headerBtnClassName}
            size="small"
            icon={<IconDoubleLeft />}
            disabled={!(state.editingDataPosition.length > 0)}
            onClick={onClickBackRootEdit}
          />
          <Button className={headerBtnClassName} size="small" icon={<IconLeft />} disabled={!(state.editingDataPosition.length > 0)} onClick={onClickBackOne} />
          <span className={headerTitleClassName}>{getCurrentName()}</span>
        </div>
        <Dropdown menu={{ items: contextMenuOptions }} trigger={['contextMenu']}>
          <div className={contentClassName}>
            <ElementTree
              ref={refTree}
              height={elementsHeight}
              treeData={elementTree}
              selectedKeys={selectedUUIDs}
              onTitleChange={({ uuid, value }) => {
                updateElementInList(uuid, { name: value }, state.editingData.elements);
                const elementTree = getElementTree(editingData);
                dispatch({
                  type: 'update',
                  payload: { editingData: { ...editingData }, elementTree }
                });
              }}
              onOperationToggle={({ uuid, operations }) => {
                updateElementInList(uuid, { operations }, state.editingData.elements);
                const elementTree = getElementTree(editingData);
                dispatch({
                  type: 'update',
                  payload: { editingData: { ...editingData }, elementTree }
                });
              }}
              onSelect={(e) => {
                if (!selectedUUIDs?.includes(e.uuids[0])) {
                  selectElementsByPositions(e.positions);
                }
              }}
              onContextMenu={(e) => {
                if (!selectedUUIDs?.includes(e.uuids[0])) {
                  selectElementsByPositions(e.positions);
                  const selectedElement = findElementFromListByPosition(e.positions[0], editingData.elements);
                  if (selectedElement) {
                    updateContextMenuOptions({ selectedElements: [selectedElement] });
                  }
                }
              }}
              onDrop={(e) => {
                const { elements } = moveElementPosition(editingData.elements, {
                  from: e.from,
                  to: e.to
                });

                const targetElem = findElementFromListByPosition(e.to, editingData.elements);
                if (targetElem) {
                  // TODO
                  if (e.to.length === e.to.length) {
                    // TODO
                  } else {
                    targetElem.x = 0;
                    targetElem.y = 0;
                  }
                }

                const elementTree = getElementTree(editingData);
                dispatch({
                  type: 'update',
                  payload: { editingData: { ...editingData, ...{ elements: [...elements] } }, elementTree }
                });
              }}
              onDelete={({ uuid }) => {
                sharedEvent.trigger('deleteElement', { uuid });
              }}
              onGoToGroup={(e) => {
                sharedEvent.trigger('resetEditingView', { type: 'go-to-next-group', position: e.position });
              }}
            />
          </div>
        </Dropdown>
        {/* <div className={footerClassName}>footer</div> */}
      </div>
    );
  }, [elementsHeight, elementTree, selectedUUIDs, editingData.elements, state.editingDataPosition, contextMenuOptions]);
};

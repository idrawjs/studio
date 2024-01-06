import React, { useContext, useEffect, useMemo, useState, useRef } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { ConfigContext, ElementTree, getElementTree, IconDoubleLeft, IconLeft } from '@idraw/studio-base';
import { updateElementInList, moveElementPosition, getGroupQueueFromList, findElementFromListByPosition } from 'idraw';
import type { ElementPosition } from 'idraw';
import { Dropdown, Button } from 'antd';
import { Context } from '../context';
import type { SharedEvent, SharedStore } from '../../types';
import { useContextMenuOptions } from '../context-menu';

const modName = 'mod-panel-layer';

export interface PanelLayerProps {
  className?: string;
  height: number;
  style?: CSSProperties;
  defaultSelectedElementUUIDs?: string[];
  sharedStore: SharedStore;
  sharedEvent: SharedEvent;
}

export const PanelLayer = (props: PanelLayerProps) => {
  const { className, style, height, defaultSelectedElementUUIDs = [], sharedStore, sharedEvent } = props;
  const { state, dispatch } = useContext(Context);
  const { createPrefixName } = useContext(ConfigContext);
  const getPrefixName = createPrefixName(modName);
  const { treeData, selectedUUIDs, editingData } = state;
  const refTree = useRef<{
    scrollTo: (e: { key: string | number; align?: 'top' | 'bottom' | 'auto'; offset?: number }) => void;
  } | null>(null);
  const [expandedKeys, setExpandedKeys] = useState<string[]>(defaultSelectedElementUUIDs);
  const rootClassName = getPrefixName();
  const contentClassName = getPrefixName('content');
  const headerClassName = getPrefixName('header');
  const headerTitleClassName = getPrefixName('header', 'title');
  const headerBtnClassName = getPrefixName('header', 'btn');
  // const footerClassName = getPrefixName('footer');
  const [contextMenuOptions] = useContextMenuOptions({ sharedEvent, sharedStore });

  const getCurrentName = () => {
    if (state.editingDataPostion.length === 0) {
      return '';
    }
    const elem = findElementFromListByPosition(state.editingDataPostion, state.data.elements);
    return elem?.name || elem?.type || '';
  };

  const selectElementsByPositions = (positions: ElementPosition[]) => {
    const idraw = sharedStore.get('idraw');
    idraw?.selectElementsByPositions(positions);
  };

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
      const newExpandedKeys = [...expandedKeys];
      uuidQueue.forEach((uuid: string) => {
        if (!newExpandedKeys.includes(uuid)) {
          newExpandedKeys.push(uuid);
        }
      });
      // refTree.current?.scrollTo({
      //   key: selectedUUIDs[0],
      //   align: 'top'
      //   // offset: 0
      // });
      setExpandedKeys(newExpandedKeys);
    }
  }, [selectedUUIDs, editingData]);

  const onClickBackRootEdit = () => {
    sharedEvent.trigger('resetEditingView', { type: 'back-root', position: null });
  };

  const onClickBackOne = () => {
    sharedEvent.trigger('resetEditingView', { type: 'back-one', position: null });
  };

  return useMemo(() => {
    if (!(Array.isArray(treeData) && treeData.length > 0)) {
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
        <div className={headerClassName}>
          <Button
            className={headerBtnClassName}
            size="small"
            icon={<IconDoubleLeft />}
            disabled={!(state.editingDataPostion.length > 0)}
            onClick={onClickBackRootEdit}
          />
          <Button className={headerBtnClassName} size="small" icon={<IconLeft />} disabled={!(state.editingDataPostion.length > 0)} onClick={onClickBackOne} />
          <span className={headerTitleClassName}>{getCurrentName()}</span>
        </div>
        <Dropdown menu={{ items: contextMenuOptions }} trigger={['contextMenu']}>
          <div className={contentClassName}>
            <ElementTree
              ref={refTree}
              height={height}
              treeData={treeData}
              selectedKeys={selectedUUIDs}
              expandedKeys={expandedKeys}
              onTitleChange={({ uuid, value }) => {
                updateElementInList(uuid, { name: value }, state.editingData.elements);
                const treeData = getElementTree(editingData);
                dispatch({
                  type: 'update',
                  payload: { editingData: { ...editingData }, treeData }
                });
              }}
              onOperationToggle={({ uuid, operations }) => {
                updateElementInList(uuid, { operations }, state.editingData.elements);
                const treeData = getElementTree(editingData);
                dispatch({
                  type: 'update',
                  payload: { editingData: { ...editingData }, treeData }
                });
              }}
              onSelect={(e) => {
                if (!selectedUUIDs?.includes(e.uuids[0])) {
                  selectElementsByPositions(e.positions);
                }
              }}
              onDrop={(e) => {
                const elements = moveElementPosition(editingData.elements, {
                  from: e.from,
                  to: e.to
                });
                const treeData = getElementTree(editingData);
                dispatch({
                  type: 'update',
                  payload: { editingData: { ...editingData, ...{ elements: [...elements] } }, treeData }
                });
              }}
              onDelete={({ uuid }) => {
                sharedEvent.trigger('deleteElement', { uuid });
              }}
              onGoToGroup={(e) => {
                sharedEvent.trigger('resetEditingView', { type: 'go-to-group', position: e.position });
              }}
              onExpand={(keys, { node }) => {
                const currentKey = node.key as string;
                if (currentKey) {
                  let newKeys = [...expandedKeys];
                  if (expandedKeys.includes(currentKey)) {
                    newKeys.splice(newKeys.indexOf(currentKey), 1);
                  } else {
                    newKeys = [...newKeys, ...[currentKey]];
                  }
                  setExpandedKeys(newKeys);
                }
              }}
            />
          </div>
        </Dropdown>
        {/* <div className={footerClassName}>footer</div> */}
      </div>
    );
  }, [treeData, selectedUUIDs, expandedKeys, editingData.elements, state.editingDataPostion, contextMenuOptions]);
};

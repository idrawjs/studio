import React, { useContext, useEffect, useMemo, useState, useRef } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { ConfigContext, ElementTree, getElementTree } from '@idraw/studio-base';
import { updateElementInList, type ElementPosition, moveElementPosition, getGroupQueueFromList } from 'idraw';
import { Dropdown } from 'antd';
import { Context } from '../context';
import { getIDraw } from '../../shared';
import { createContextMenuOptions } from '../action';

const modName = 'mod-panel-layer';

export interface PanelLayerProps {
  className?: string;
  height: number;
  style?: CSSProperties;
}

export const PanelLayer = (props: PanelLayerProps) => {
  const { className, style, height } = props;
  const { state, dispatch } = useContext(Context);
  const { createPrefixName } = useContext(ConfigContext);
  const prefixName = createPrefixName(modName);
  const { treeData, selectedUUIDs, data } = state;
  const refTree = useRef<any>(null);

  // const selectElements = (uuids: string[]) => {
  //   const idraw = getIDraw();
  //   idraw?.selectElements(uuids);
  // };

  const selectElementsByPositions = (positions: ElementPosition[]) => {
    const idraw = getIDraw();
    idraw?.selectElementsByPositions(positions);
  };

  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  useEffect(() => {
    if (!selectedUUIDs[0]) {
      return;
    }
    if (selectedUUIDs.length === 1) {
      const groupQueue = getGroupQueueFromList(selectedUUIDs[0], data.elements);
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
      refTree.current.scrollTo({
        key: selectedUUIDs[0],
        align: 'auto'
      });
      setExpandedKeys(newExpandedKeys);
    }
  }, [selectedUUIDs, data]);

  return useMemo(() => {
    if (!(Array.isArray(treeData) && treeData.length > 0)) {
      return null;
    }
    return (
      <div
        style={style}
        className={classnames(prefixName(), className)}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        <Dropdown menu={{ items: createContextMenuOptions() }} trigger={['contextMenu']}>
          <div className={prefixName('content')}>
            <ElementTree
              ref={refTree}
              height={height}
              treeData={treeData}
              selectedKeys={selectedUUIDs}
              expandedKeys={expandedKeys}
              onTitleChange={({ uuid, value }) => {
                const { data } = state;
                updateElementInList(uuid, { name: value }, state.data.elements);
                const treeData = getElementTree(data);
                dispatch({
                  type: 'update',
                  payload: { data: { ...data }, treeData }
                });
              }}
              onOperationToggle={({ uuid, operations }) => {
                const { data } = state;
                updateElementInList(uuid, { operations }, state.data.elements);
                const treeData = getElementTree(data);
                dispatch({
                  type: 'update',
                  payload: { data: { ...data }, treeData }
                });
              }}
              onSelect={(e) => {
                if (!selectedUUIDs?.includes(e.uuids[0])) {
                  selectElementsByPositions(e.positions);
                }
              }}
              onDrop={(e) => {
                const elements = moveElementPosition(data.elements, {
                  from: e.from,
                  to: e.to
                });
                const treeData = getElementTree(data);
                dispatch({
                  type: 'update',
                  payload: { data: { ...data, ...{ elements: [...elements] } }, treeData }
                });
              }}
              onDelete={(e) => {
                const idraw = getIDraw();
                idraw?.deleteElement(e.uuid);
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
      </div>
    );
  }, [treeData, selectedUUIDs, expandedKeys, data.elements]);
};

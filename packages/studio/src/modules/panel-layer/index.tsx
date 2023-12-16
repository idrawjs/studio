import React, { useContext, useMemo } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { ConfigContext, ElementTree, getElementTree } from '@idraw/studio-base';
import { updateElementInList, type ElementPosition, moveElementPosition } from 'idraw';
import { Context } from '../context';
import { getIDraw } from '../../shared';

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

  // const selectElements = (uuids: string[]) => {
  //   const idraw = getIDraw();
  //   idraw?.selectElements(uuids);
  // };

  const selectElementsByPositions = (positions: ElementPosition[]) => {
    const idraw = getIDraw();
    idraw?.selectElementsByPositions(positions);
  };

  return useMemo(() => {
    if (!(Array.isArray(treeData) && treeData.length > 0)) {
      return null;
    }
    return (
      <div style={style} className={classnames(prefixName(), className)}>
        <div className={prefixName('content')}>
          <ElementTree
            height={height}
            treeData={treeData}
            selectedKeys={selectedUUIDs}
            // defaultExpandedKeys={[treeData?.[2]?.key]} // TODO
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
              // selectElements(e.uuids);
              selectElementsByPositions(e.positions);
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
          />
        </div>
      </div>
    );
  }, [treeData, selectedUUIDs, data.elements]);
};

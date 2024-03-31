import React, { useContext, useMemo, useCallback, useRef, useEffect } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { findElementFromList, updateElementInList, isAssetId, createAssetId } from 'idraw';
import type { Element, DataLayout, ElementAssetsItem, RecursivePartial, Data } from 'idraw';
import { ConfigContext, ElementDetail, LayoutDetail } from '@idraw/studio-base';
import { Context } from '../context';

const modName = 'mod-panel-detail';

export interface PanelDetailProps {
  className?: string;
  style?: CSSProperties;
}

export const PanelDetail = (props: PanelDetailProps) => {
  const { className, style } = props;
  const { createPrefixName } = useContext(ConfigContext);
  const { state, dispatch } = useContext(Context);
  const generateClassName = createPrefixName(modName);
  const { selectedUUIDs, editingData, editingDataPosition } = state;
  const modClassName = generateClassName();
  const refEditingData = useRef<Data>(editingData);

  useEffect(() => {
    refEditingData.current = editingData;
  }, [editingData]);

  const getCurrentEditingData = () => {
    return refEditingData.current;
  };

  const onChange = useCallback(
    (e: RecursivePartial<Element>) => {
      if (selectedUUIDs?.length === 1 && selectedUUIDs[0]) {
        const uuid = selectedUUIDs[0];
        updateElementInList(uuid, e, editingData.elements);
        dispatch({
          type: 'update',
          payload: { editingData: { ...editingData } }
        });
      }
    },
    [editingData, selectedUUIDs]
  );

  const onChangeLayout = useCallback(
    (e: RecursivePartial<DataLayout>) => {
      const { detail, ...restLayout } = e;
      delete restLayout.operations;
      const currentEditingData = getCurrentEditingData();
      if (restLayout || detail) {
        const layout: DataLayout = {
          ...{ x: 0, y: 0 },
          ...(currentEditingData.layout as DataLayout),
          ...restLayout,
          ...{
            detail: {
              ...currentEditingData.layout?.detail,
              ...detail
            }
          }
        } as DataLayout;
        const newEditingData = {
          ...currentEditingData,
          ...{
            layout
          }
        };
        dispatch({
          type: 'updateEditingDataLayoutToTargetGroup',
          payload: {
            editingData: newEditingData
          }
        });
      }
    },
    [editingData, selectedUUIDs]
  );

  const getTargetElement = useCallback(
    (uuid: string) => {
      if (selectedUUIDs?.length > 1) {
        return null;
      }

      return findElementFromList(uuid, getCurrentEditingData().elements);
    },
    [editingData, selectedUUIDs[0]]
  );

  const getElementAsset = useCallback(
    (assetId?: string) => {
      let resource: string | null = null;
      if (assetId && isAssetId(assetId)) {
        resource = getCurrentEditingData().assets?.[assetId]?.value || null;
      }
      return resource;
    },
    [editingData, selectedUUIDs[0]]
  );

  const createElementAsset = useCallback(
    (assetItem: ElementAssetsItem) => {
      const assetId = createAssetId(assetItem.value);
      if (!editingData.assets) {
        editingData.assets = {};
      }
      editingData.assets[assetId] = assetItem;
      return {
        assetId,
        assetItem
      };
    },
    [editingData, selectedUUIDs[0]]
  );

  return useMemo(() => {
    const targetElement = getTargetElement(selectedUUIDs[0]);
    return (
      <div
        style={style}
        className={classnames(modClassName, className)}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        <LayoutDetail isGroupLayout={editingDataPosition?.length > 0} layout={editingData.layout} onChange={onChangeLayout} />
        <ElementDetail element={targetElement} onChange={onChange} getElementAsset={getElementAsset} createElementAsset={createElementAsset} />
      </div>
    );
  }, [selectedUUIDs[0], editingData.layout, editingDataPosition]);
};

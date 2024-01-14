import React, { useContext, useMemo, useCallback } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { findElementFromList, updateElementInList, isAssetId, createAssetId } from 'idraw';
import type { Element, ElementAssetsItem, RecursivePartial } from 'idraw';
import { ConfigContext, ElementDetail } from '@idraw/studio-base';
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
  const { selectedUUIDs, editingData } = state;
  const modClassName = generateClassName();

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

  const getTargetElement = useCallback(
    (uuid: string) => {
      if (selectedUUIDs?.length > 1) {
        return null;
      }
      return findElementFromList(uuid, editingData.elements);
    },
    [editingData, selectedUUIDs[0]]
  );

  const getElementAsset = useCallback(
    (assetId?: string) => {
      let resource: string | null = null;
      if (assetId && isAssetId(assetId)) {
        resource = editingData.assets?.[assetId]?.value || null;
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
        <ElementDetail element={targetElement} onChange={onChange} getElementAsset={getElementAsset} createElementAsset={createElementAsset} />
      </div>
    );
  }, [selectedUUIDs[0]]);
};

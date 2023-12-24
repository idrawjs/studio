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
  const getPrefixName = createPrefixName(modName);
  const { selectedUUIDs, data } = state;
  const modClassName = getPrefixName();

  const onChange = useCallback(
    (e: RecursivePartial<Element>) => {
      if (selectedUUIDs?.length === 1 && selectedUUIDs[0]) {
        const uuid = selectedUUIDs[0];
        updateElementInList(uuid, e, data.elements);
        dispatch({
          type: 'update',
          payload: { data: { ...data } }
        });
      }
    },
    [data, selectedUUIDs]
  );

  const getTargetElement = useCallback(
    (uuid: string) => {
      if (selectedUUIDs?.length > 1) {
        return null;
      }
      return findElementFromList(uuid, data.elements);
    },
    [data, selectedUUIDs[0]]
  );

  const getElementAsset = useCallback(
    (assetId?: string) => {
      let resource: string | null = null;
      if (assetId && isAssetId(assetId)) {
        resource = data.assets?.[assetId]?.value || null;
      }
      return resource;
    },
    [data, selectedUUIDs[0]]
  );
  const createElementAsset = useCallback(
    (assetItem: ElementAssetsItem) => {
      const assetId = createAssetId(assetItem.value);
      if (!data.assets) {
        data.assets = {};
      }
      data.assets[assetId] = assetItem;
      return {
        assetId,
        assetItem
      };
    },
    [data, selectedUUIDs[0]]
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

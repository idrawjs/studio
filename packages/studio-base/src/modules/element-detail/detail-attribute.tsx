import React, { useMemo } from 'react';
import type { Element, ElementAssetsItem } from 'idraw';
import { DetailCircle } from './detail-circle';
import { DetailImage } from './detail-image';
import { DetailPath } from './detail-path';
import { DetailRect } from './detail-rect';
import { DetailSVG } from './detail-svg';
import { DetailText } from './detail-text';
import { DetailGroup } from './detail-group';
import { generateClassName } from '../../css';

const modName = 'base-element-detail-attribute';

export interface DetailAttributeProps {
  element?: Element | null;
  onChange?: (e: Partial<Element>) => void;
  disabled?: boolean;
  getElementAsset: (assetId?: string) => string | null;
  createElementAsset: (assetItem: ElementAssetsItem) => {
    assetItem: ElementAssetsItem | null;
    assetId: string | null;
  };
}

export const DetailAttribute = (props: DetailAttributeProps) => {
  const { element, onChange, disabled, getElementAsset, createElementAsset } = props;

  const rootClassName = generateClassName(modName);
  return useMemo(() => {
    return (
      <div className={rootClassName}>
        {element?.type === 'circle' && <DetailCircle element={element} onChange={onChange} disabled={disabled} />}
        {element?.type === 'image' && (
          <DetailImage
            element={element as Element<'image'>}
            onChange={onChange}
            disabled={disabled}
            getElementAsset={getElementAsset}
            createElementAsset={createElementAsset}
          />
        )}
        {element?.type === 'svg' && (
          <DetailSVG
            element={element as Element<'svg'>}
            onChange={onChange}
            disabled={disabled}
            getElementAsset={getElementAsset}
            createElementAsset={createElementAsset}
          />
        )}
        {element?.type === 'group' && <DetailGroup element={element as Element<'group'>} onChange={onChange} disabled={disabled} />}
        {element?.type === 'path' && <DetailPath element={element} onChange={onChange} disabled={disabled} />}
        {element?.type === 'rect' && <DetailRect element={element} onChange={onChange} disabled={disabled} />}
        {element?.type === 'text' && <DetailText element={element as Element<'text'>} onChange={onChange} />}
      </div>
    );
  }, [disabled, element]);
};

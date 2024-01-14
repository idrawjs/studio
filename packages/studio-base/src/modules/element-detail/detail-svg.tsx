import React, { useMemo, useContext, useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { Form, type FormInstance } from 'antd';
import classnames from 'classnames';
import { isAssetId } from 'idraw';
import type { Element, ElementSVGDetail, ElementAssetsItem } from 'idraw';
import { SVGPicker } from './field-item/svg-picker';
import { ConfigContext } from '../config-provider';

const modName = 'base-element-detail-svg';

export interface DetailSVGProps {
  className?: string;
  style?: CSSProperties;
  element?: Element<'svg'> | null;
  onChange?: (e: Partial<Element>) => void;
  disabled?: boolean;
  getElementAsset: (assetId?: string) => string | null;
  createElementAsset: (assetItem: ElementAssetsItem) => {
    assetItem: ElementAssetsItem | null;
    assetId: string | null;
  };
}

type FieldType = Pick<Required<ElementSVGDetail>, 'svg'> & {
  svgResource: string;
};

export const DetailSVG = (props: DetailSVGProps) => {
  const { className, style, element, onChange, getElementAsset, createElementAsset, disabled } = props;
  const { createPrefixName } = useContext(ConfigContext);
  const generateClassName = createPrefixName(modName);
  const rootClassName = generateClassName();

  const ref = useRef<FormInstance>(null);

  const elementToFormData = (element: Element<'svg'> | null | undefined) => {
    const { svg = '' } = element?.detail || {};
    const formData: FieldType = {
      svg,
      svgResource: getElementAsset?.(svg) || ''
    };
    return formData;
  };

  const onValuesChange = (value: FieldType) => {
    const detail: Partial<ElementSVGDetail> = {};
    if (value?.svgResource) {
      const { assetId } = createElementAsset({
        type: 'svg',
        value: value.svgResource
      });
      if (assetId && isAssetId(assetId)) {
        detail.svg = assetId;
      }
    }
    onChange?.({ detail });
  };

  useEffect(() => {
    const initialValues = elementToFormData(element);
    ref.current?.setFieldsValue(initialValues);
  }, [element]);

  return useMemo(() => {
    return (
      <div style={style} className={classnames(rootClassName, className)}>
        <Form ref={ref} onValuesChange={onValuesChange}>
          <Form.Item name="svgResource">
            <SVGPicker />
          </Form.Item>
        </Form>
      </div>
    );
  }, [element, disabled]);
};

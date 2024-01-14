import React, { useMemo, useContext, useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { Form, type FormInstance } from 'antd';
import classnames from 'classnames';
import { isAssetId } from 'idraw';
import type { Element, ElementImageDetail, ElementAssetsItem } from 'idraw';
import { ImagePicker } from './field-item/image-picker';
import { ConfigContext } from '../config-provider';

const modName = 'base-element-detail-image';

export interface DetailImageProps {
  className?: string;
  style?: CSSProperties;
  element?: Element<'image'> | null;
  onChange?: (e: Partial<Element>) => void;
  disabled?: boolean;
  getElementAsset: (assetId?: string) => string | null;
  createElementAsset: (assetItem: ElementAssetsItem) => {
    assetItem: ElementAssetsItem | null;
    assetId: string | null;
  };
}

type FieldType = Pick<Required<ElementImageDetail>, 'src'> & {
  imageResource: string;
};

export const DetailImage = (props: DetailImageProps) => {
  const { className, style, element, onChange, getElementAsset, createElementAsset, disabled } = props;
  const { createPrefixName } = useContext(ConfigContext);
  const generateClassName = createPrefixName(modName);
  const rootClassName = generateClassName();

  const ref = useRef<FormInstance>(null);

  const elementToFormData = (element: Element<'image'> | null | undefined) => {
    const { src = '' } = element?.detail || {};
    const formData: FieldType = {
      src,
      imageResource: getElementAsset?.(src) || ''
    };
    return formData;
  };

  const onValuesChange = (value: FieldType) => {
    const detail: Partial<ElementImageDetail> = {};
    if (value?.imageResource) {
      const { assetId } = createElementAsset({
        type: 'image',
        value: value.imageResource
      });
      if (assetId && isAssetId(assetId)) {
        detail.src = assetId;
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
          <Form.Item name="imageResource">
            <ImagePicker />
          </Form.Item>
        </Form>
      </div>
    );
  }, [element, disabled]);
};

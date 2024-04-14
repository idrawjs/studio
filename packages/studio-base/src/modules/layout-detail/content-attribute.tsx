import React, { useEffect, useMemo, useRef } from 'react';
import type { CSSProperties } from 'react';
import type { Element, DataLayout, RecursivePartial } from 'idraw';
import { getElementSize } from 'idraw';
import { Col, Row, Form, Select } from 'antd';
import type { FormInstance } from 'antd';
import { useModuleLocale } from './hooks';
import { MultipleColor } from '../element-detail/field-item/multiple-color';
import { generateClassName } from '../../css';

const modName = 'base-element-content-attribute';

type LayoutDetailContent = Pick<DataLayout['detail'], 'background' | 'overflow'>;

export interface ContentAttributeProps {
  className?: string;
  style?: CSSProperties;
  layout?: DataLayout | null;
  onChange?: (e: RecursivePartial<DataLayout>) => void;
  disabled?: boolean;
}

type FieldType = LayoutDetailContent;

const elementToFormData = (detail?: LayoutDetailContent | null) => {
  const { background, overflow = 'visible' } = detail || {};

  const formData: FieldType = {
    background,
    overflow
  };
  return formData;
};

export const ContentAttribute = (props: ContentAttributeProps) => {
  const { style, layout, disabled, onChange } = props;
  const ref = useRef<FormInstance>(null);
  const rootClassName = generateClassName(modName);
  const rowClassName = generateClassName(modName, 'row');
  const colClassName = generateClassName(modName, 'col');
  const formItemClassName = generateClassName(modName, 'form-item');

  const onValuesChange = (value: FieldType) => {
    const boxDetail = value;
    onChange?.({ detail: boxDetail } as RecursivePartial<DataLayout>);
  };

  const moduleLocale = useModuleLocale();

  useEffect(() => {
    const initialValues = elementToFormData(layout?.detail);
    ref.current?.setFieldsValue(initialValues);
  }, [layout]);

  return useMemo(() => {
    return (
      <>
        <Form ref={ref} style={style} className={rootClassName} onValuesChange={onValuesChange}>
          <Row className={rowClassName}>
            <Col className={colClassName} span="10">
              {moduleLocale.background}
            </Col>
            <Col className={colClassName} span="14">
              <Form.Item className={formItemClassName} name="background">
                <MultipleColor
                  elementSize={layout ? getElementSize(layout as Element) : undefined}
                  disabled={disabled}
                  // value={element?.detail?.background}
                  // onChange={(value) => {
                  //   onValuesChange({ background: value });
                  // }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className={rowClassName}>
            <Col className={colClassName} span="10">
              {moduleLocale.overflow}
            </Col>
            <Col span="12" className={colClassName}>
              <Form.Item className={formItemClassName} name="overflow">
                <Select size="small" disabled={disabled}>
                  <Select.Option value="visible">{moduleLocale.visible}</Select.Option>
                  <Select.Option value="hidden">{moduleLocale.hidden}</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </>
    );
  }, [moduleLocale, layout, disabled, onChange]);
};

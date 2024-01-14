import React, { useContext, useEffect, useMemo, useRef } from 'react';
import type { CSSProperties } from 'react';
import type { Element, ElementBaseDetail } from 'idraw';
import { getElementSize } from 'idraw';
import { Col, Row, Form, InputNumber } from 'antd';
import type { FormInstance } from 'antd';
import { useModuleLocale } from './hooks';
import { ConfigContext } from '../config-provider';

import { MultipleColor } from './field-item/multiple-color';

const modName = 'base-element-shadow-attribute';

export interface ShadowAttributeProps {
  className?: string;
  style?: CSSProperties;
  element?: Element | null;
  onChange?: (e: Partial<Element>) => void;
  disabled?: boolean;
}

type FieldType = Pick<ElementBaseDetail, 'shadowColor' | 'shadowBlur' | 'shadowOffsetX' | 'shadowOffsetY'>;

const elementToFormData = (element?: Element | null) => {
  const { shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY } = element?.detail || {};
  const formData: FieldType = {
    shadowColor,
    shadowBlur,
    shadowOffsetX,
    shadowOffsetY
  };
  return formData;
};

export const ShadowAttribute = (props: ShadowAttributeProps) => {
  const { style, element, disabled, onChange } = props;
  const ref = useRef<FormInstance>(null);
  const { createPrefixName } = useContext(ConfigContext);
  const generateClassName = createPrefixName(modName);
  const rootClassName = generateClassName();
  const rowClassName = generateClassName('row');
  const colClassName = generateClassName('col');
  const formItemClassName = generateClassName('form-item');
  const onValuesChange = (value: FieldType) => {
    const boxDetail = value;
    onChange?.({ detail: boxDetail } as Partial<Element>);
  };
  const moduleLocale = useModuleLocale();

  useEffect(() => {
    const initialValues = elementToFormData(element);
    ref.current?.setFieldsValue(initialValues);
  }, [element]);

  return useMemo(() => {
    return (
      <Form ref={ref} style={style} className={rootClassName} onValuesChange={onValuesChange}>
        <Row className={rowClassName}>
          <Col className={colClassName} span="14">
            <Form.Item className={formItemClassName} name="shadowColor">
              <MultipleColor
                elementSize={element ? getElementSize(element) : undefined}
                disabled={disabled}
                disabledLinearGradient
                disabledRadialGradient
                // value={element?.detail?.shadowColor}
                // onChange={(value) => {
                //   onValuesChange({ shadowColor: value as string });
                // }}
              />
            </Form.Item>
          </Col>
          <Col className={colClassName} span="10">
            <Form.Item className={formItemClassName} name="shadowBlur">
              <InputNumber disabled={disabled} size="small" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col className={colClassName} span="12">
            <Form.Item className={formItemClassName} name="shadowOffsetX">
              <InputNumber disabled={disabled} size="small" style={{ width: '100%' }} prefix="X" />
            </Form.Item>
          </Col>
          <Col className={colClassName} span="12">
            <Form.Item className={formItemClassName} name="shadowOffsetY">
              <InputNumber disabled={disabled} size="small" style={{ width: '100%' }} prefix="Y" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }, [moduleLocale, element, disabled]);
};

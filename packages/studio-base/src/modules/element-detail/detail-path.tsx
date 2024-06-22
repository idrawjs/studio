import React, { useMemo, useRef, useEffect } from 'react';
import classnames from 'classnames';
import type { Element, ElementPathDetail } from 'idraw';
import type { CSSProperties } from 'react';
import type { FormInstance } from 'antd';
import { Form, Row, Col } from 'antd';
import { generateClassName } from '../../css';
import { useModuleLocale } from './hooks';
import { MultipleColor } from './field-item/multiple-color';

const modName = 'base-element-detail-path';

export interface DetailPathProps {
  className?: string;
  style?: CSSProperties;
  element?: Element<'path'> | null;
  onChange?: (e: Partial<Element>) => void;
  disabled?: boolean;
}

type FieldType = Pick<ElementPathDetail, 'fill' | 'stroke'>;

const elementToFormData = (element?: Element<'path'> | null) => {
  const { fill, stroke } = element?.detail || {};
  const formData: FieldType = {
    fill,
    stroke
  };
  return formData;
};

export const DetailPath = (props: DetailPathProps) => {
  const { className, style, element, onChange, disabled } = props;
  const ref = useRef<FormInstance>(null);
  const rootClassName = generateClassName(modName);
  const rowClassName = generateClassName(modName, 'row');
  const colClassName = generateClassName(modName, 'col');
  const formItemClassName = generateClassName(modName, 'form-item');

  const moduleLocale = useModuleLocale();
  const onValuesChange = (value: FieldType) => {
    const boxDetail = value;
    onChange?.({ detail: boxDetail } as Partial<Element>);
  };

  useEffect(() => {
    const initialValues = elementToFormData(element);
    ref.current?.setFieldsValue(initialValues);
  }, [element]);

  return useMemo(() => {
    return (
      <div style={style} className={classnames(rootClassName, className)}>
        <Form ref={ref} onValuesChange={onValuesChange}>
          <Row className={rowClassName}>
            <Col className={colClassName} span="10">
              {moduleLocale.fill}
            </Col>
            <Col className={colClassName} span="14">
              <Form.Item className={formItemClassName} name="fill">
                <MultipleColor disabled={disabled} />
              </Form.Item>
            </Col>
          </Row>
          <Row className={rowClassName}>
            <Col className={colClassName} span="10">
              {moduleLocale.stroke}
            </Col>
            <Col className={colClassName} span="14">
              <Form.Item className={formItemClassName} name="stroke">
                <MultipleColor disabled={disabled} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }, [style, className]);
};

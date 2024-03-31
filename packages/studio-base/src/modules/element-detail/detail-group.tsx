import React, { useMemo, useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import type { Element, ElementGroupDetail } from 'idraw';
import { Row, Col, Form, Select } from 'antd';
import type { FormInstance } from 'antd';
import { useModuleLocale } from './hooks';
import { generateClassName } from '../../css';

const modName = 'base-element-detail-group';

export interface DetailGroupProps {
  className?: string;
  style?: CSSProperties;
  element?: Element<'group'> | null;
  onChange?: (e: Partial<Element>) => void;
  disabled?: boolean;
}

type FieldType = Pick<ElementGroupDetail, 'overflow'>;

const elementToFormData = (element?: Element<'group'> | null) => {
  const { overflow } = element?.detail || {};
  const formData: FieldType = {
    overflow
  };
  return formData;
};

export const DetailGroup = (props: DetailGroupProps) => {
  const { className, style, element, onChange, disabled } = props;
  const rootClassName = generateClassName(modName);
  const rowClassName = generateClassName(modName, 'row');
  const colClassName = generateClassName(modName, 'col');
  const formItemClassName = generateClassName(modName, 'form-item');
  const ref = useRef<FormInstance>(null);
  const moduleLocale = useModuleLocale();

  useEffect(() => {
    const initialValues = elementToFormData(element);
    ref.current?.setFieldsValue(initialValues);
  }, [element]);

  const onValuesChange = (value: FieldType) => {
    onChange?.({ detail: value } as Partial<Element>);
  };

  return useMemo(() => {
    return (
      <div style={style} className={classnames(rootClassName, className)}>
        <Form ref={ref} style={style} className={rootClassName} onValuesChange={onValuesChange}>
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
      </div>
    );
  }, [style, className, moduleLocale]);
};

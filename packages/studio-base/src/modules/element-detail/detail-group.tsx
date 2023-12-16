import React, { useMemo, useEffect, useContext, useRef } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import type { Element, ElementGroupDetail } from 'idraw';
import { Row, Col, Form, Select } from 'antd';
import type { FormInstance } from 'antd';
import { ConfigContext } from '../config-provider';

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
  const { createPrefixName } = useContext(ConfigContext);
  const getPrefixName = createPrefixName(modName);
  const rootClassName = getPrefixName();
  const rowClassName = getPrefixName('row');
  const colClassName = getPrefixName('col');
  const formItemClassName = getPrefixName('form-item');
  const ref = useRef<FormInstance>(null);

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
            <Col span="12" className={colClassName}>
              <Form.Item className={formItemClassName} name="overflow">
                <Select size="small" disabled={disabled}>
                  <Select.Option value="visible">Visible</Select.Option>
                  <Select.Option value="hidden">Hidden</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }, [style, className]);
};
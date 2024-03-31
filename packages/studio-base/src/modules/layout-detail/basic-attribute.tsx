import React, { useEffect, useMemo, useRef } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import type { DataLayout } from 'idraw';
import { formatNumber, is } from 'idraw';
import { InputNumber, Col, Row, Form } from 'antd';
import type { FormInstance } from 'antd';
import { useModuleLocale } from './hooks';
import { generateClassName } from '../../css';

const modName = 'base-element-basic-attribute';

type LayoutSize = Pick<DataLayout, 'x' | 'y' | 'w' | 'h'>;

type FieldType = Partial<LayoutSize>;

export interface BasicAttributeProps {
  className?: string;
  style?: CSSProperties;
  layout?: LayoutSize | null;
  isGroupLayout?: boolean;
  onChange?: (e: FieldType) => void;
  disabled?: boolean;
}

const formatter = (val: any) => {
  if (is.number(val * 1)) {
    return formatNumber(val * 1);
  }
  return val;
};

export const BasicAttribute = (props: BasicAttributeProps) => {
  const { className, style, layout, onChange, disabled, isGroupLayout } = props;
  const ref = useRef<FormInstance>(null);
  const rootClassName = generateClassName(modName);
  const rowClassName = generateClassName(modName, 'row');
  const colClassName = generateClassName(modName, 'col');
  const inputClassName = generateClassName(modName, 'input');
  const formItemClassName = generateClassName(modName, 'form-item');
  const moduleLocale = useModuleLocale();
  const onValuesChange = (e: FieldType) => {
    onChange?.(e);
  };

  useEffect(() => {
    const { x, y, w, h } = layout || {};
    const initialValues: FieldType = {
      x,
      y,
      w,
      h
    };
    ref.current?.setFieldsValue(initialValues);
  }, [layout]);

  return useMemo(() => {
    return (
      <Form ref={ref} style={style} className={classnames(rootClassName, className)} onValuesChange={onValuesChange}>
        {!isGroupLayout && (
          <Row className={rowClassName}>
            <Col span={10} className={colClassName}>
              <Form.Item<FieldType> className={formItemClassName} name="x">
                <InputNumber
                  className={inputClassName}
                  size="small"
                  placeholder="X"
                  prefix={'X'}
                  disabled={disabled}
                  formatter={formatter}
                  parser={formatter}
                />
              </Form.Item>
            </Col>
            <Col span={10} className={colClassName}>
              <Form.Item<FieldType> className={formItemClassName} name="y">
                <InputNumber
                  className={inputClassName}
                  size="small"
                  placeholder="Y"
                  prefix={'Y'}
                  disabled={disabled}
                  formatter={formatter}
                  parser={formatter}
                />
              </Form.Item>
            </Col>
          </Row>
        )}

        <Row className={rowClassName}>
          <Col span={10} className={colClassName}>
            <Form.Item<FieldType> className={formItemClassName} name="w">
              <InputNumber
                className={inputClassName}
                size="small"
                placeholder="Width"
                prefix={moduleLocale.w}
                disabled={disabled}
                formatter={formatter}
                parser={formatter}
              />
            </Form.Item>
          </Col>
          <Col span={10} className={colClassName}>
            <Form.Item<FieldType> className={formItemClassName} name="h">
              <InputNumber
                className={inputClassName}
                size="small"
                placeholder="Height"
                prefix={moduleLocale.h}
                disabled={disabled}
                formatter={formatter}
                parser={formatter}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }, [moduleLocale, disabled, layout]);
};

import React, { useMemo, useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import type { Element, ElementTextDetail } from 'idraw';
import { getElementSize, formatNumber, is } from 'idraw';
import { Radio, Row, Col, Form, InputNumber, Input } from 'antd';
import type { FormInstance } from 'antd';
import { MultipleColor } from './field-item/multiple-color';
import IconVerticalTop from '../../icons/vertical-top';
import IconVerticalMiddle from '../../icons/vertical-middle';
import IconVerticalBottom from '../../icons/vertical-bottom';
import IconAlignLeft from '../../icons/align-left';
import IconAlignCenter from '../../icons/align-center';
import IconAlignRight from '../../icons/align-right';
import { generateClassName } from '../../css';

const modName = 'base-element-detail-text';
const iconStyle = { fontSize: 20 };

const { TextArea } = Input;

const formatter = (val: any) => {
  if (is.number(val * 1)) {
    return formatNumber(val * 1);
  }
  return val;
};

export interface DetailTextProps {
  className?: string;
  style?: CSSProperties;
  element?: Element<'text'> | null;
  onChange?: (e: Partial<Element>) => void;
  disabled?: boolean;
}

type FieldType = Pick<ElementTextDetail, 'text' | 'color' | 'textAlign' | 'verticalAlign' | 'fontSize' | 'fontWeight' | 'lineHeight'>;

const elementToFormData = (element?: Element<'text'> | null) => {
  const { color, textAlign, verticalAlign, fontSize, fontWeight, lineHeight, text = '' } = element?.detail || {};
  const formData: FieldType = {
    text,
    color,
    textAlign,
    verticalAlign,
    fontSize,
    fontWeight,
    lineHeight
  };
  return formData;
};

export const DetailText = (props: DetailTextProps) => {
  const { className, style, element, onChange, disabled } = props;

  const rootClassName = generateClassName(modName);
  const rowClassName = generateClassName(modName, 'row');
  const colClassName = generateClassName(modName, 'col');
  const swithClassName = generateClassName(modName, 'switch');
  const formItemClassName = generateClassName(modName, 'form-item');
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
              <Form.Item className={formItemClassName} name="verticalAlign">
                <Radio.Group disabled={disabled} className={swithClassName} size="small">
                  <Radio.Button value="top">
                    <IconVerticalTop style={iconStyle} />
                  </Radio.Button>
                  <Radio.Button value="middle">
                    <IconVerticalMiddle style={iconStyle} />
                  </Radio.Button>
                  <Radio.Button value="bottom">
                    <IconVerticalBottom style={iconStyle} />
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span="12" className={colClassName}>
              <Form.Item className={formItemClassName} name="textAlign">
                <Radio.Group disabled={disabled} className={swithClassName} size="small">
                  <Radio.Button value="left">
                    <IconAlignLeft style={iconStyle} />
                  </Radio.Button>
                  <Radio.Button value="center">
                    <IconAlignCenter style={iconStyle} />
                  </Radio.Button>
                  <Radio.Button value="right">
                    <IconAlignRight style={iconStyle} />
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row className={rowClassName}>
            <Col span="10" className={colClassName}>
              Text Color
            </Col>
            <Col span="14" className={colClassName}>
              <Form.Item className={formItemClassName} name="color">
                <MultipleColor
                  elementSize={element ? getElementSize(element) : undefined}
                  disabled={disabled}
                  disabledLinearGradient
                  disabledRadialGradient
                  // value={element?.detail?.borderColor}
                  // onChange={(value) => {
                  //   onValuesChange({ borderColor: value as string });
                  // }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className={rowClassName}>
            <Col span="10" className={colClassName}>
              Font Size
            </Col>
            <Col span="14" className={colClassName}>
              <Form.Item className={formItemClassName} name="fontSize">
                <InputNumber disabled={disabled} size="small" style={{ width: '100%' }} step={1} min={0} formatter={formatter} parser={formatter} />
              </Form.Item>
            </Col>
          </Row>
          <Row className={rowClassName}>
            <Col span="10" className={colClassName}>
              Font Weight
            </Col>
            <Col span="14" className={colClassName}>
              <Form.Item className={formItemClassName} name="fontWeight">
                <InputNumber
                  disabled={disabled}
                  size="small"
                  style={{ width: '100%' }}
                  step={100}
                  max={1000}
                  min={100}
                  formatter={formatter}
                  parser={formatter}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className={rowClassName}>
            <Col span="10" className={colClassName}>
              Line Height
            </Col>
            <Col span="14" className={colClassName}>
              <Form.Item className={formItemClassName} name="lineHeight">
                <InputNumber disabled={disabled} size="small" style={{ width: '100%' }} step={1} min={0} formatter={formatter} parser={formatter} />
              </Form.Item>
            </Col>
          </Row>
          <Row className={rowClassName}>
            <Col span="24" className={colClassName}>
              <Form.Item className={formItemClassName} name="text" style={{ width: '100%' }}>
                <TextArea disabled={disabled} style={{ width: '100%' }} rows={3} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }, [style, className]);
};

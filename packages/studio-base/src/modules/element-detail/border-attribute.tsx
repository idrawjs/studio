import React, { useContext, useEffect, useMemo, useState, useRef } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import type { Element, ElementBaseDetail, RecursivePartial } from 'idraw';
import { getElementSize } from 'idraw';
import { ConfigContext } from '../config-provider';
import { Button, Input, Col, Row, Form, InputNumber, Select } from 'antd';
import type { FormInstance } from 'antd';
import { MultipleColor } from './field-item/multiple-color';
import { useModuleLocale } from './hooks';

import IconCornerRadius from '../../icons/corner-radius';
import IconFullCornerRadius from '../../icons/full-corner-radius';
import IconBorder from '../../icons/border';
import IconBorderLeft from '../../icons/border-left';
import IconBorderRight from '../../icons/border-right';
import IconBorderTop from '../../icons/border-top';
import IconBorderBottom from '../../icons/border-bottom';
import IconCornerRadiusTopLeft from '../../icons/corner-radius-top-left';
import IconCornerRadiusTopRight from '../../icons/corner-radius-top-right';
import IconCornerRadiusBottomLeft from '../../icons/corner-radius-bottom-left';
import IconCornerRadiusBottomRight from '../../icons/corner-radius-bottom-right';
import IconBorderDash from '../../icons/border-dash';

const modName = 'base-element-border-attribute';
const defaultBorderDashNum = 4;

export interface BorderAttributeProps {
  className?: string;
  style?: CSSProperties;
  element?: Element | null;
  onChange?: (e: Partial<Element>) => void;
  disabled?: boolean;
}

type FieldType = Partial<
  Omit<ElementBaseDetail, 'borderRadius' | 'borderWidth'> & {
    borderRadius?: number;
    borderWidth?: number;
    borderRadiusList?: [number, number, number, number];
    borderWidthList?: [number, number, number, number];
    borderType: 'solid' | 'dash';
    borderDashNum: number;
  }
>;

function elementToFormData(element?: Element | null): FieldType {
  const { borderRadius, borderWidth, borderColor, boxSizing, borderDash } = element?.detail || {};
  let borderType: FieldType['borderType'] = 'solid';
  let borderDashNum = defaultBorderDashNum;
  if (Array.isArray(borderDash) && borderDash?.length > 0 && borderDash[0] >= 1 && typeof borderWidth === 'number') {
    borderType = 'dash';
    borderDashNum = Math.ceil(borderDash[0]);
  }
  const originFields: FieldType = {
    borderRadiusList: [0, 0, 0, 0],
    borderWidthList: [0, 0, 0, 0],
    borderColor,
    borderType,
    boxSizing,
    borderDashNum
  };
  if (typeof borderRadius === 'number') {
    originFields.borderRadius = borderRadius;
    originFields.borderRadiusList = [borderRadius, borderRadius, borderRadius, borderRadius];
  } else if (Array.isArray(borderRadius)) {
    originFields.borderRadiusList = [borderRadius[0] || 0, borderRadius[1] || 0, borderRadius[2] || 0, borderRadius[3] || 0];
  } else {
    originFields.borderRadius = 0;
  }

  if (typeof borderWidth === 'number') {
    originFields.borderWidth = borderWidth;
    originFields.borderWidthList = [borderWidth, borderWidth, borderWidth, borderWidth];
  } else if (Array.isArray(borderWidth)) {
    originFields.borderWidthList = [borderWidth[0] || 0, borderWidth[1] || 0, borderWidth[2] || 0, borderWidth[3] || 0];
  } else {
    originFields.borderWidth = 0;
  }

  return originFields;
}

export const BorderAttribute = (props: BorderAttributeProps) => {
  const { className, style, element, disabled, onChange } = props;
  const ref = useRef<FormInstance>(null);
  const { createPrefixName } = useContext(ConfigContext);
  const getPrefixName = createPrefixName(modName);
  const rootClassName = getPrefixName();
  const rowClassName = getPrefixName('row');
  const colClassName = getPrefixName('col');
  const inputClassName = getPrefixName('input');
  const formItemClassName = getPrefixName('form-item');
  const [splitBorderRadius, setSplitBorderRadius] = useState<boolean>(Array.isArray(element?.detail?.borderRadius));
  const [splitBorderWidth, setSplitBorderWidth] = useState<boolean>(Array.isArray(element?.detail?.borderWidth));
  const [internalDisableBorderRadius, setInternalDisableBorderRadius] = useState<boolean>(splitBorderWidth);

  const moduleLocale = useModuleLocale();
  const onValuesChange = (value: FieldType) => {
    const originFields = elementToFormData(element);
    const { borderColor, boxSizing, borderType, borderDashNum } = value;
    const formData: RecursivePartial<ElementBaseDetail> = {};
    if (borderColor) {
      formData.borderColor = borderColor;
    }
    if (boxSizing) {
      formData.boxSizing = boxSizing;
    }

    if (splitBorderWidth === true && value.borderWidthList) {
      const borderWidth: [number, number, number, number] = [0, 0, 0, 0];
      const borderWidthList = Array.from(value?.borderWidthList || [null, null, null, null]);
      for (let i = 0; i < 4; i++) {
        const item = borderWidthList[i];
        if (typeof item === 'number') {
          (borderWidth as any)[i] = item;
        } else {
          (borderWidth as any)[i] = originFields?.borderWidthList?.[i] || 0;
        }
        formData.borderWidth = borderWidth;
      }
    } else if (typeof value.borderWidth === 'number') {
      formData.borderWidth = value.borderWidth;
    }

    if (splitBorderRadius === true && value.borderRadiusList) {
      const borderRadius: [number, number, number, number] = [0, 0, 0, 0];
      const borderRadiusList = Array.from(value?.borderRadiusList || [null, null, null, null]);
      for (let i = 0; i < 4; i++) {
        const item = borderRadiusList[i];
        if (typeof item === 'number') {
          (borderRadius as any)[i] = item;
        } else {
          (borderRadius as any)[i] = originFields?.borderRadiusList?.[i] || 0;
        }
        formData.borderRadius = borderRadius;
      }
    } else if (typeof value.borderRadius === 'number') {
      formData.borderRadius = value.borderRadius;
    }

    if (splitBorderWidth === true) {
      formData.borderDash = [];
    } else if (borderType === 'solid') {
      formData.borderDash = [];
    } else if (borderType === 'dash') {
      formData.borderDash = [defaultBorderDashNum, defaultBorderDashNum];
    } else if (borderDashNum && borderDashNum > 0) {
      formData.borderDash = [borderDashNum, borderDashNum];
    }

    onChange?.({ detail: formData } as Partial<Element>);
  };

  useEffect(() => {
    const splitBorderWidth = Array.isArray(element?.detail?.borderWidth);
    const splitBorderRadius = Array.isArray(element?.detail?.borderRadius);
    setSplitBorderWidth(splitBorderWidth);
    setSplitBorderRadius(splitBorderRadius);
    setInternalDisableBorderRadius(splitBorderWidth);
    const initialValues = elementToFormData(element);
    ref.current?.setFieldsValue(initialValues);
  }, [element]);

  return useMemo(() => {
    const initialValues = elementToFormData(element);
    return (
      <Form ref={ref} style={style} className={classnames(rootClassName, className)} onValuesChange={onValuesChange}>
        <>
          <Row className={rowClassName}>
            <Col span={16} className={colClassName}>
              {splitBorderWidth ? (
                <Input
                  className={inputClassName}
                  size="small"
                  prefix={<IconBorder style={{ fontSize: 14 }} />}
                  disabled
                  value={moduleLocale.mixedBorderWidth}
                />
              ) : (
                <Form.Item className={formItemClassName} name="borderWidth">
                  <InputNumber
                    className={inputClassName}
                    size="small"
                    min={0}
                    placeholder="Border Width"
                    prefix={<IconBorder style={{ fontSize: 14 }} />}
                    disabled={disabled || splitBorderWidth}
                  />
                </Form.Item>
              )}
            </Col>
            <Col span={4} className={colClassName}>
              <Button
                icon={<IconBorder />}
                size="small"
                disabled={disabled}
                type={splitBorderWidth ? 'primary' : 'default'}
                onClick={() => {
                  const newSplitBorderWidth = !splitBorderWidth;
                  setSplitBorderWidth(newSplitBorderWidth);
                  setInternalDisableBorderRadius(newSplitBorderWidth);
                  if (!newSplitBorderWidth) {
                    const originFields = elementToFormData(element);
                    const borderWidth = originFields.borderWidth || originFields.borderWidthList?.[0] || 0;
                    onValuesChange({ borderWidth });
                  }
                }}
              />
            </Col>
          </Row>
          {splitBorderWidth && (
            <>
              <Row className={rowClassName}>
                <Col span={12} className={colClassName}>
                  <Form.Item<FieldType> className={formItemClassName} name={['borderWidthList', 0]}>
                    <InputNumber className={inputClassName} size="small" prefix={<IconBorderTop />} disabled={disabled || !splitBorderWidth} min={0} />
                  </Form.Item>
                </Col>

                <Col span={12} className={colClassName}>
                  <Form.Item<FieldType> className={formItemClassName} name={['borderWidthList', 1]}>
                    <InputNumber className={inputClassName} size="small" prefix={<IconBorderRight />} disabled={disabled || !splitBorderWidth} min={0} />
                  </Form.Item>
                </Col>
              </Row>
              <Row className={rowClassName}>
                <Col span={12} className={colClassName}>
                  <Form.Item<FieldType> className={formItemClassName} name={['borderWidthList', 2]}>
                    <InputNumber className={inputClassName} size="small" prefix={<IconBorderBottom />} disabled={disabled || !splitBorderWidth} min={0} />
                  </Form.Item>
                </Col>
                <Col span={12} className={colClassName}>
                  <Form.Item<FieldType> className={formItemClassName} name={['borderWidthList', 3]}>
                    <InputNumber className={inputClassName} size="small" prefix={<IconBorderLeft />} disabled={disabled || !splitBorderWidth} min={0} />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
        </>

        <>
          <Row className={rowClassName}>
            <Col span={16} className={colClassName}>
              {splitBorderRadius ? (
                <Input
                  className={inputClassName}
                  size="small"
                  prefix={<IconCornerRadius style={{ fontSize: 14 }} />}
                  disabled
                  value={moduleLocale.mixedBorderRadius}
                />
              ) : (
                <Form.Item className={formItemClassName} name="borderRadius">
                  <InputNumber
                    className={inputClassName}
                    size="small"
                    placeholder="Radius"
                    prefix={<IconCornerRadius style={{ fontSize: 14 }} />}
                    disabled={disabled || splitBorderRadius || internalDisableBorderRadius}
                    min={0}
                  />
                </Form.Item>
              )}
            </Col>
            <Col span={4} className={colClassName}>
              <Button
                icon={<IconFullCornerRadius />}
                size="small"
                disabled={disabled || internalDisableBorderRadius}
                type={splitBorderRadius ? 'primary' : 'default'}
                onClick={() => {
                  const newSplitBorderRadius = !splitBorderRadius;
                  setSplitBorderRadius(newSplitBorderRadius);
                  if (!newSplitBorderRadius) {
                    const originFields = elementToFormData(element);
                    const borderRadius = originFields.borderRadius || originFields.borderRadiusList?.[0] || 0;
                    onValuesChange({ borderRadius });
                  }
                }}
              />
            </Col>
          </Row>
          {splitBorderRadius && (
            <>
              <Row className={rowClassName}>
                <Col span={12} className={colClassName}>
                  <Form.Item<FieldType> className={formItemClassName} name={['borderRadiusList', 0]}>
                    <InputNumber
                      className={inputClassName}
                      size="small"
                      placeholder=""
                      prefix={<IconCornerRadiusTopLeft />}
                      disabled={disabled || !splitBorderRadius || internalDisableBorderRadius}
                      min={0}
                    />
                  </Form.Item>
                </Col>
                <Col span={12} className={colClassName}>
                  <Form.Item<FieldType> className={formItemClassName} name={['borderRadiusList', 1]}>
                    <InputNumber
                      className={inputClassName}
                      size="small"
                      placeholder=""
                      prefix={<IconCornerRadiusTopRight />}
                      disabled={disabled || !splitBorderRadius || internalDisableBorderRadius}
                      min={0}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row className={rowClassName}>
                <Col span={12} className={colClassName}>
                  <Form.Item<FieldType> className={formItemClassName} name={['borderRadiusList', 2]}>
                    <InputNumber
                      className={inputClassName}
                      size="small"
                      placeholder=""
                      prefix={<IconCornerRadiusBottomLeft />}
                      disabled={disabled || !splitBorderRadius || internalDisableBorderRadius}
                      min={0}
                    />
                  </Form.Item>
                </Col>
                <Col span={12} className={colClassName}>
                  <Form.Item<FieldType> className={formItemClassName} name={['borderRadiusList', 3]}>
                    <InputNumber
                      className={inputClassName}
                      size="small"
                      placeholder=""
                      prefix={<IconCornerRadiusBottomRight />}
                      disabled={disabled || !splitBorderRadius || internalDisableBorderRadius}
                      min={0}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
        </>
        <Row className={rowClassName}>
          <Col className={colClassName} span="11">
            <Form.Item className={formItemClassName} name="boxSizing">
              <Select size="small" disabled={disabled}>
                <Select.Option value="border-box">{moduleLocale.inside}</Select.Option>
                <Select.Option value="content-box">{moduleLocale.outside}</Select.Option>
                <Select.Option value="center-line">{moduleLocale.centerLine}</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col className={colClassName} span="13">
            <Form.Item className={formItemClassName} name="borderColor">
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
          <Col className={colClassName} span="11">
            <Form.Item className={formItemClassName} name="borderType">
              <Select size="small" disabled={disabled || splitBorderWidth}>
                <Select.Option value="solid">{moduleLocale.solid}</Select.Option>
                <Select.Option value="dash">{moduleLocale.dash}</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col className={colClassName} span="13">
            {initialValues.borderType === 'dash' && (
              <Form.Item className={formItemClassName} name="borderDashNum">
                <InputNumber
                  disabled={disabled || splitBorderWidth}
                  className={inputClassName}
                  size="small"
                  style={{ width: '100%' }}
                  prefix={<IconBorderDash style={{ fontSize: 14 }} />}
                />
              </Form.Item>
            )}
          </Col>
        </Row>
      </Form>
    );
  }, [moduleLocale, element, disabled, splitBorderRadius, splitBorderWidth, internalDisableBorderRadius]);
};

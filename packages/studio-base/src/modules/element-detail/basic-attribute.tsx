import React, { useContext, useEffect, useMemo, useRef } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import type { Element } from 'idraw';
import { formatNumber, is, limitAngle } from 'idraw';
import { InputNumber, Col, Row, Form, Switch } from 'antd';
import type { FormInstance } from 'antd';
import { ConfigContext } from '../config-provider';
import IconConstrain from '../../icons/constrain';
import IconRotation from '../../icons/rotation';
import { SwitchButton } from './field-item/switch-button';
import { useModuleLocale } from './hooks';

const modName = 'base-element-basic-attribute';

type FieldType = Partial<Element>;

export interface BasicAttributeProps {
  className?: string;
  style?: CSSProperties;
  element?: Element | null;
  onChange?: (e: FieldType) => void;
  disabled?: boolean;
}

const formatter = (val: any) => {
  if (is.number(val * 1)) {
    return formatNumber(val * 1);
  }
  return val;
};

const angleFormatter = (val: any) => {
  if (is.number(val * 1)) {
    const num = formatNumber(val * 1);
    return limitAngle(num);
  }
  return val;
};

export const BasicAttribute = (props: BasicAttributeProps) => {
  const { className, style, element, onChange, disabled } = props;
  const ref = useRef<FormInstance>(null);
  const { createPrefixName } = useContext(ConfigContext);
  const generateClassName = createPrefixName(modName);
  const rootClassName = generateClassName();
  const rowClassName = generateClassName('row');
  const colClassName = generateClassName('col');
  const inputClassName = generateClassName('input');
  const formItemClassName = generateClassName('form-item');
  const moduleLocale = useModuleLocale();
  const onValuesChange = (e: FieldType) => {
    if (element?.operations?.limitRatio === true) {
      if ((e as any)?.hasOwnProperty('w')) {
        e.h = formatNumber(((e as any).w / element.w) * element.h);
      } else if ((e as any)?.hasOwnProperty('h')) {
        e.w = formatNumber(((e as any).h / element.h) * element.w);
      }
    }
    onChange?.(e);
  };

  useEffect(() => {
    const { type, x, y, w, h, angle = 0, operations = {} } = element || {};
    const initialValues: FieldType = {
      x,
      y,
      w,
      h,
      angle,
      operations: {
        limitRatio: operations.limitRatio
      }
    };
    if (type === 'group') {
      (initialValues.operations as any).deepResize = operations.deepResize;
    }
    ref.current?.setFieldsValue(initialValues);
  }, [element]);

  return useMemo(() => {
    return (
      <Form ref={ref} style={style} className={classnames(rootClassName, className)} onValuesChange={onValuesChange}>
        {/* <Row className={rowClassName}>
          <Tooltip title={element?.uuid}>
            <Input className={inputClassName} size="small" disabled value={element?.uuid} />
          </Tooltip>
        </Row> */}
        <Row className={rowClassName}>
          <Col span={10} className={colClassName}>
            <Form.Item<FieldType> className={formItemClassName} name="x">
              <InputNumber className={inputClassName} size="small" placeholder="X" prefix={'X'} disabled={disabled} formatter={formatter} parser={formatter} />
            </Form.Item>
          </Col>
          <Col span={10} className={colClassName}>
            <Form.Item<FieldType> className={formItemClassName} name="y">
              <InputNumber className={inputClassName} size="small" placeholder="Y" prefix={'Y'} disabled={disabled} formatter={formatter} parser={formatter} />
            </Form.Item>
          </Col>
        </Row>
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
          <Col span={4} className={colClassName}>
            <Form.Item<FieldType> className={formItemClassName} name={['operations', 'limitRatio']}>
              <SwitchButton icon={<IconConstrain />} size="small" disabled={disabled} />
            </Form.Item>
          </Col>
        </Row>
        <Row className={rowClassName}>
          <Col span={10} className={colClassName}>
            <Form.Item<FieldType> className={formItemClassName} name="angle">
              <InputNumber
                className={inputClassName}
                size="small"
                placeholder="Angle"
                prefix={<IconRotation style={{ fontSize: 14 }} />}
                disabled={disabled}
                formatter={angleFormatter}
                parser={angleFormatter}
                suffix={'°'}
              />
            </Form.Item>
          </Col>
        </Row>

        {element?.type === 'group' && (
          <Row className={rowClassName}>
            <Col span={18} className={colClassName}>
              {moduleLocale.deepResizeInGroup}
            </Col>
            <Col span={6} className={colClassName}>
              <Form.Item<FieldType> className={formItemClassName} name={['operations', 'deepResize']}>
                <Switch size="small" />
              </Form.Item>
            </Col>
          </Row>
        )}
      </Form>
    );
  }, [moduleLocale, disabled, element]);
};

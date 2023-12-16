import { useContext, useMemo, useState, useEffect, useRef } from 'react';
import type { LinearGradientColor, RadialGradientColor, GradientStop, ElementSize } from 'idraw';
import { colorToLinearGradientCSS } from 'idraw';
import { Radio, Row, Col, Form, InputNumber } from 'antd';
import type { FormInstance } from 'antd';
import { SolidColorPicker } from './solid-color-picker';
import { modName } from './config';
import type { ColorValue, ColorModeType } from './types';
import { GradientPicker } from './gradient';

import { ConfigContext } from '../../../config-provider';
import IconSolidColor from '../../../../icons/solid-color';
import IconResize from '../../../../icons/resize';
import IconDoubleCircle from '../../../../icons/double-circle';

type LinearFieldType = Partial<LinearGradientColor>;
type RadialFieldType = Partial<RadialGradientColor>;

export * from './types';

export type MultipleColorPickerProps = {
  value?: ColorValue;
  onChange?: (value: ColorValue) => void;
  elementSize?: ElementSize;
  disabledLinearGradient?: boolean;
  disabledRadialGradient?: boolean;
};

function checkColorModeType(color?: ColorValue): ColorModeType {
  let type: ColorModeType = 'solid';
  if (color && (color as LinearGradientColor | RadialGradientColor)?.type) {
    type = (color as LinearGradientColor | RadialGradientColor).type;
  }
  return type;
}

export function MultipleColorPicker(props: MultipleColorPickerProps) {
  const { value, onChange, elementSize, disabledLinearGradient, disabledRadialGradient } = props;
  const [css, setCSS] = useState(colorToLinearGradientCSS(value));
  const [mode, setMode] = useState<ColorModeType>(checkColorModeType(value));
  const [currentPickedColor, setCurrentPickedColor] = useState<string>('#000000');
  const [internalColor, setInternalColor] = useState<string | null>(null);
  const [internalLinearGradient, setInternalLinearGradient] = useState<LinearGradientColor | null>(null);
  const [internalRadialGradient, setInternalRadialGradient] = useState<RadialGradientColor | null>(null);
  const refActiveStop = useRef<GradientStop | null>(null);

  const refLinearForm = useRef<FormInstance>(null);
  const refRadialForm = useRef<FormInstance>(null);

  const { createPrefixName } = useContext(ConfigContext);
  const getPrefixName = createPrefixName(modName);
  const rootClassName = getPrefixName();
  const headerClassName = getPrefixName('header');
  const internalPickerClassName = getPrefixName('internal-picker');
  const radioGroupClassName = getPrefixName('radio-group');

  const rowClassName = getPrefixName('row');
  const colClassName = getPrefixName('col');
  const inputClassName = getPrefixName('input');
  const formItemClassName = getPrefixName('form-item');

  useEffect(() => {
    setCSS(colorToLinearGradientCSS(value));
    setMode(checkColorModeType(value));
    if (typeof value === 'string') {
      setInternalColor(value);
      setCurrentPickedColor(value);
    } else if (value?.type === 'linear-gradient') {
      setInternalLinearGradient(value);
    } else if (value?.type === 'radial-gradient') {
      setInternalRadialGradient(value);
    }
  }, [value]);

  useEffect(() => {
    if (mode === 'linear-gradient' && (value as LinearGradientColor)?.type === mode) {
      refLinearForm.current?.setFieldsValue(value as LinearGradientColor);
    } else if (mode === 'radial-gradient' && (value as RadialGradientColor)?.type === mode) {
      refRadialForm.current?.setFieldsValue(value as RadialGradientColor);
    }
  }, [mode, value]);

  const onModeChange = (changedMode: string) => {
    let targetValue: ColorValue | undefined;
    if (changedMode === 'linear-gradient') {
      targetValue = {
        type: 'linear-gradient',
        start: {
          x: 0,
          y: 0
        },
        end: {
          x: 0,
          y: elementSize?.h || 0
        },
        stops: []
      };
      if (typeof value === 'string') {
        targetValue.stops = [
          { offset: 0, color: value },
          { offset: 0.5, color: value },
          { offset: 1, color: value }
        ];
        setInternalLinearGradient(targetValue);
      } else if ((value as RadialGradientColor)?.type === 'radial-gradient') {
        targetValue.stops = [...(value?.stops || [])];
        setInternalLinearGradient(targetValue);
      }
      refLinearForm.current?.setFieldsValue(targetValue);
    } else if (changedMode === 'radial-gradient') {
      targetValue = {
        type: 'radial-gradient',
        inner: {
          x: (elementSize?.w || 0) / 2,
          y: (elementSize?.h || 0) / 2,
          radius: 0
        },
        outer: {
          x: (elementSize?.w || 0) / 2,
          y: (elementSize?.h || 0) / 2,
          radius: Math.min((elementSize?.w || 0) / 2, (elementSize?.h || 0) / 2)
        },
        stops: []
      };
      if (typeof value === 'string') {
        targetValue.stops = [
          { offset: 0, color: value },
          { offset: 0.5, color: value },
          { offset: 1, color: value }
        ];
        setInternalRadialGradient(targetValue);
      } else if ((value as LinearGradientColor)?.type === 'linear-gradient') {
        targetValue.stops = [...(value?.stops || [])];
        setInternalRadialGradient(targetValue);
      }
      refRadialForm.current?.setFieldsValue(targetValue);
    } else if (changedMode === 'solid') {
      targetValue = value;
      if ((value as LinearGradientColor)?.type === 'linear-gradient') {
        targetValue = (value as LinearGradientColor)?.stops?.[0]?.color || '#000000';
        setInternalColor(targetValue);
      } else if ((value as RadialGradientColor)?.type === 'radial-gradient') {
        targetValue = (value as RadialGradientColor)?.stops?.[0]?.color || '#000000';
        setInternalColor(targetValue);
      }
    }
    if (targetValue) {
      onChange?.(targetValue);
    }
  };

  const triggerChange = (e: { color: string }) => {
    if (mode === 'solid') {
      onChange?.(e.color);
    } else if (refActiveStop.current) {
      if (mode === 'linear-gradient' && internalLinearGradient && Array.isArray(internalLinearGradient?.stops)) {
        const stops = [...internalLinearGradient.stops];
        for (let i = 0; i < stops.length; i++) {
          if (stops[i].offset === refActiveStop.current.offset) {
            stops[i].color = e.color;
            break;
          }
        }
        const newGradient = { ...internalLinearGradient, ...{ stops } };
        setInternalLinearGradient(newGradient);
        onChange?.(newGradient);
      } else if (mode === 'radial-gradient' && internalRadialGradient && Array.isArray(internalRadialGradient?.stops)) {
        const stops = [...internalRadialGradient.stops];
        for (let i = 0; i < stops.length; i++) {
          if (stops[i].offset === refActiveStop.current.offset) {
            stops[i].color = e.color;
            break;
          }
        }
        const newGradient = { ...internalRadialGradient, ...{ stops } };
        setInternalRadialGradient(newGradient);
        onChange?.(newGradient);
      }
    }
  };

  const onLinearValuesChange = (value: LinearFieldType) => {
    const newLinear: LinearGradientColor = { ...internalLinearGradient } as LinearGradientColor;
    if (value?.start) {
      newLinear.start = { ...newLinear.start, ...value.start };
    }
    if (value?.end) {
      newLinear.end = { ...newLinear.end, ...value.end };
    }
    onChange?.(newLinear);
  };

  const onRadialValuesChange = (value: RadialFieldType) => {
    const newRadial: RadialGradientColor = { ...internalRadialGradient } as RadialGradientColor;
    if (value?.inner) {
      newRadial.inner = { ...newRadial.inner, ...value.inner };
    }
    if (value?.outer) {
      newRadial.outer = { ...newRadial.outer, ...value.outer };
    }
    onChange?.(newRadial);
  };

  return useMemo(() => {
    return (
      <div className={rootClassName}>
        {!disabledLinearGradient && !disabledRadialGradient && (
          <div className={headerClassName}>
            <Radio.Group
              className={radioGroupClassName}
              size="small"
              buttonStyle="solid"
              value={mode}
              onChange={({ target: { value } }) => {
                onModeChange(value);
              }}
            >
              <Radio.Button value="solid">
                <IconSolidColor />
              </Radio.Button>
              {!disabledLinearGradient && (
                <Radio.Button value="linear-gradient">
                  <IconResize />
                </Radio.Button>
              )}
              {!disabledRadialGradient && (
                <Radio.Button value="radial-gradient">
                  <IconDoubleCircle />
                </Radio.Button>
              )}
            </Radio.Group>
          </div>
        )}

        {!disabledLinearGradient && mode === 'linear-gradient' && (
          <div style={{ marginBottom: 10 }}>
            <Form ref={refLinearForm} onValuesChange={onLinearValuesChange}>
              <Row className={rowClassName}>
                <Col className={colClassName} span="4">
                  Start
                </Col>
                <Col className={colClassName} span="10">
                  <Form.Item className={formItemClassName} name={['start', 'x']}>
                    <InputNumber className={inputClassName} size="small" prefix="X" />
                  </Form.Item>
                </Col>
                <Col className={colClassName} span="10">
                  <Form.Item className={formItemClassName} name={['start', 'y']}>
                    <InputNumber className={inputClassName} size="small" prefix="Y" />
                  </Form.Item>
                </Col>
              </Row>
              <Row className={rowClassName}>
                <Col className={colClassName} span="4">
                  End
                </Col>
                <Col className={colClassName} span="10">
                  <Form.Item className={formItemClassName} name={['end', 'x']}>
                    <InputNumber className={inputClassName} size="small" prefix="X" />
                  </Form.Item>
                </Col>
                <Col className={colClassName} span="10">
                  <Form.Item className={formItemClassName} name={['end', 'y']}>
                    <InputNumber className={inputClassName} size="small" prefix="Y" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        )}
        {!disabledRadialGradient && mode === 'radial-gradient' && (
          <div style={{ marginBottom: 10 }}>
            <Form ref={refRadialForm} onValuesChange={onRadialValuesChange}>
              <Row className={rowClassName}>
                <Col className={colClassName} span="4">
                  Inner
                </Col>
                <Col className={colClassName} span="10">
                  <Form.Item className={formItemClassName} name={['inner', 'x']}>
                    <InputNumber className={inputClassName} size="small" prefix="X" />
                  </Form.Item>
                </Col>
                <Col className={colClassName} span="10">
                  <Form.Item className={formItemClassName} name={['inner', 'y']}>
                    <InputNumber className={inputClassName} size="small" prefix="Y" />
                  </Form.Item>
                </Col>
              </Row>
              <Row className={rowClassName}>
                <Col className={colClassName} span="4"></Col>
                <Col className={colClassName} span="10">
                  <Form.Item className={formItemClassName} name={['inner', 'radius']}>
                    <InputNumber className={inputClassName} size="small" prefix="R" />
                  </Form.Item>
                </Col>
              </Row>
              <Row className={rowClassName}>
                <Col className={colClassName} span="4">
                  Outer
                </Col>
                <Col className={colClassName} span="10">
                  <Form.Item className={formItemClassName} name={['outer', 'x']}>
                    <InputNumber className={inputClassName} size="small" prefix="X" />
                  </Form.Item>
                </Col>
                <Col className={colClassName} span="10">
                  <Form.Item className={formItemClassName} name={['outer', 'y']}>
                    <InputNumber className={inputClassName} size="small" prefix="Y" />
                  </Form.Item>
                </Col>
              </Row>
              <Row className={rowClassName}>
                <Col className={colClassName} span="4"></Col>
                <Col className={colClassName} span="10">
                  <Form.Item className={formItemClassName} name={['outer', 'radius']}>
                    <InputNumber className={inputClassName} size="small" prefix="R" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        )}
        {(!disabledLinearGradient || !disabledRadialGradient) && (mode === 'linear-gradient' || mode === 'radial-gradient') && (
          <GradientPicker
            mode={mode}
            value={value}
            currentPickedColor={currentPickedColor}
            internalColor={internalColor}
            internalLinearGradient={internalLinearGradient}
            internalRadialGradient={internalRadialGradient}
            onChange={(val: ColorValue) => {
              if ((val as LinearGradientColor)?.type === 'linear-gradient') {
                setInternalLinearGradient(val as LinearGradientColor);
                onChange?.(val as RadialGradientColor);
              } else if ((val as RadialGradientColor)?.type === 'radial-gradient') {
                setInternalRadialGradient(val as RadialGradientColor);
                onChange?.(val as RadialGradientColor);
              }
            }}
            onSelectStop={(stop) => {
              if (stop?.color) {
                setCurrentPickedColor(stop.color);
              }
              refActiveStop.current = stop;
            }}
          />
        )}
        <SolidColorPicker
          value={currentPickedColor}
          className={internalPickerClassName}
          onChange={(e) => {
            setCurrentPickedColor(e);
            triggerChange({ color: e });
          }}
        />
      </div>
    );
  }, [mode, css, internalColor, internalLinearGradient, internalRadialGradient, currentPickedColor, disabledLinearGradient, disabledRadialGradient]);
}

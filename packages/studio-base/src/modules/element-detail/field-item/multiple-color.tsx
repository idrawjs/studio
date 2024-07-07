import React, { useMemo, useRef, useContext, useEffect } from 'react';
import type { ElementSize } from 'idraw';
import { colorToCSS } from 'idraw';
import { ConfigContext } from '../../config-provider';
import { Popover, Input } from 'antd';
import { MultipleColorPicker } from './multiple-color-picker';
import { ColorValue } from './multiple-color-picker';
import { useModuleLocale } from '../hooks';
import { generateClassName } from '../../../css';

const modName = 'base-element-field-multiple-color';

export type MultipleColorProps = {
  value?: ColorValue;
  onChange?: (value: ColorValue) => void;
  elementSize?: ElementSize;
  disabled?: boolean;
  disabledLinearGradient?: boolean;
  disabledRadialGradient?: boolean;
};

export function MultipleColor(props: MultipleColorProps) {
  const { value, onChange, disabled, elementSize, disabledLinearGradient, disabledRadialGradient } = props;
  const moduleLocale = useModuleLocale();
  const getColorText = (value?: ColorValue) => {
    let text: string = '';
    if (typeof value === 'string') {
      text = value;
    } else if (['linear-gradient', 'radial-gradient'].includes(value?.type as string)) {
      text = moduleLocale.gradient;
    }
    return text;
  };
  const valueStr = getColorText(value);
  const isHex = typeof value === 'string' ? true : false;

  const { container, getContainer } = useContext(ConfigContext);
  const rootClassName = generateClassName(modName);
  const previewClassName = generateClassName(modName, 'preview');
  const refContainer = useRef<HTMLDivElement | null | undefined>(container);

  useEffect(() => {
    if (!refContainer.current && container) {
      refContainer.current = container;
    }
  }, [container]);

  return useMemo(() => {
    const css = colorToCSS(value || 'transparent');
    return (
      <>
        <Input
          className={rootClassName}
          size="small"
          disabled={disabled}
          prefix={
            disabled ? (
              <span />
            ) : (
              <Popover
                placement="left"
                getPopupContainer={getContainer}
                style={{ padding: 0 }}
                content={
                  <MultipleColorPicker
                    value={value}
                    elementSize={elementSize}
                    disabledLinearGradient={disabledLinearGradient}
                    disabledRadialGradient={disabledRadialGradient}
                    onChange={onChange}
                  />
                }
                trigger="click"
                // getPopupContainer={getContainer}
                // getTooltipContainer={getContainer}
              >
                <span className={previewClassName} style={{ background: css }} />
              </Popover>
            )
          }
          readOnly={!isHex}
          value={valueStr}
          onChange={(e) => {
            onChange?.(e.target.value);
          }}
        />
      </>
    );
  }, [value, onChange, disabled, elementSize]);
}

import React, { useContext, useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { Dropdown, InputNumber, Button } from 'antd';
import type { MenuProps } from 'antd';
import { formatNumber } from 'idraw';
import { ConfigContext } from '../config-provider';
import IconScale from '../../icons/scale';

const modName = 'base-scale-selector';

export interface ScaleSelectorProps {
  defaultValue?: string;
  value?: string;
  className?: string;
  style?: CSSProperties;
  onChange?: (value: string) => void;
}

export const ScaleSelector = (props: ScaleSelectorProps) => {
  const { className, style, defaultValue, value, onChange } = props;
  const { createPrefixName } = useContext(ConfigContext);
  const getPrefixName = createPrefixName(modName);
  const menuItemClassName = getPrefixName('menu-item');
  const inputClassName = getPrefixName('input');
  const [customValue, setCustomValue] = useState<number>(100);

  useEffect(() => {
    const newValue = formatNumber(parseFloat(value || '1') * 100);
    setCustomValue(newValue);
  }, [value]);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const { key } = e;
    // domEvent.stopPropagation();
    onChange?.(key);
  };

  const menuItemClickEvent = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <span className={menuItemClassName}>
          <InputNumber
            className={inputClassName}
            size="small"
            value={customValue}
            suffix="%"
            onClick={menuItemClickEvent}
            step={1}
            min={10}
            max={10000}
            controls={false}
            onChange={(e) => {
              if (e && e > 0) {
                const newScale = formatNumber(e / 100);
                onChange?.(`${newScale}`);
                // setCustomValue(newScale);
              }
            }}
          />
        </span>
      ),
      key: 'custom'
    },
    ...[0.5, 1, 2, 3].map((num: number) => {
      return {
        key: `${num}`,
        label: <span className={menuItemClassName}>{`${formatNumber(num * 100)}%`}</span>
      };
    })
  ];

  const menuProps: MenuProps = {
    items,
    onClick: handleMenuClick,
    selectedKeys: [`${value || defaultValue}`]
  };

  return useMemo(() => {
    return (
      <Dropdown className={classnames(getPrefixName(), className)} menu={menuProps}>
        <Button icon={<IconScale />} size="small">{`${formatNumber(parseFloat(value || '1') * 100)}%`}</Button>
      </Dropdown>
    );
  }, [className, style, defaultValue, value, onChange, customValue]);
};

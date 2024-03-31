import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { Select } from 'antd';
import type { LocaleCode } from '../../locale';
import { generateClassName } from '../../css';

const Option = Select.Option;

const modName = 'base-locale-selector';

export interface LocaleSelectorProps {
  defaultValue?: LocaleCode;
  value?: LocaleCode;
  className?: string;
  style?: CSSProperties;
  onChange?: (value: LocaleCode) => void;
}

export const LocaleSelector = (props: LocaleSelectorProps) => {
  const { className, style, defaultValue, value, onChange } = props;

  return useMemo(() => {
    return (
      <Select
        style={style}
        className={classnames(generateClassName(modName), className)}
        size="small"
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
      >
        <Option value="en-US">English</Option>
        <Option value="zh-CN">中文</Option>
      </Select>
    );
  }, [className, style, defaultValue, value, onChange]);
};

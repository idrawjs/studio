import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import type { LocaleCode } from '../../locale';
import { generateClassName } from '../../css';
import { IconInternational } from '../../icons';

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
  const items: MenuProps['items'] = [
    {
      label: 'English',
      key: 'en-US'
    },
    {
      label: '中文',
      key: 'zh-CN'
    }
  ];

  const menuProps: MenuProps = {
    items,
    selectedKeys: [(defaultValue || value || items[0]?.key) as string],
    onClick: ({ key }) => {
      onChange?.(key as LocaleCode);
    }
  };

  return useMemo(() => {
    return (
      <Dropdown menu={menuProps} placement="bottom">
        <Button style={style} className={classnames(generateClassName(modName), className)} size="small" type="text">
          <IconInternational />
        </Button>
      </Dropdown>
    );
  }, [className, style, defaultValue, value, onChange, menuProps]);
};

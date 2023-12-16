import React from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { Switch } from 'antd';
import { createPrefixName } from '../../css';
import IconDark from '../../icons/dark';
import IconLight from '../../icons/light';

const modName = 'base-theme-switch';

const prefixName = createPrefixName(modName);

export type ThemeKey = 'dark' | 'light';

export interface ThemeSwitchProps {
  className?: string;
  style?: CSSProperties;
  onChange?: (e: { theme: ThemeKey }) => void;
  theme?: ThemeKey;
  defaultTheme?: ThemeKey;
}

const getChecked = (theme?: ThemeKey) => {
  if (typeof theme === 'undefined') {
    return;
  }
  return theme === 'light' ? true : false;
};

function getTheme(checked: boolean): ThemeKey {
  if (checked === true) {
    return 'light';
  } else {
    return 'dark';
  }
}

export const ThemeSwitch = (props: ThemeSwitchProps) => {
  const { className, style, onChange, theme, defaultTheme } = props;

  return (
    <Switch
      className={classnames([prefixName(), className])}
      style={style}
      checkedChildren={<IconLight style={{ height: '100%' }} />}
      unCheckedChildren={<IconDark style={{ height: '100%' }} />}
      checked={getChecked(defaultTheme)}
      defaultChecked={getChecked(theme)}
      onChange={(checked: boolean) => {
        const changedTheme = getTheme(checked);
        onChange?.({ theme: changedTheme });
      }}
    />
  );
};

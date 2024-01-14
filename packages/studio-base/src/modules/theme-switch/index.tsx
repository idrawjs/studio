import React from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { Switch } from 'antd';
import { createPrefixName } from '../../css';
import IconDark from '../../icons/dark';
import IconLight from '../../icons/light';
import type { ThemeMode } from '../../types';

const modName = 'base-theme-switch';

const prefixName = createPrefixName(modName);

export interface ThemeSwitchProps {
  className?: string;
  style?: CSSProperties;
  onChange?: (e: { theme: ThemeMode }) => void;
  theme?: ThemeMode;
  defaultTheme?: ThemeMode;
}

const getChecked = (theme?: ThemeMode) => {
  if (typeof theme === 'undefined') {
    return;
  }
  return theme === 'light' ? true : false;
};

function getTheme(checked: boolean): ThemeMode {
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

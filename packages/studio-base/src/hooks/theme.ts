import { generateClassName } from '../css';
import classnames from 'classnames';
import type { ThemeMode } from '../types';

export const useThemeClassName = (props: { themeMode?: ThemeMode }) => {
  const { themeMode } = props;
  const themeName = 'theme';
  const themeClassName = generateClassName(themeName);
  const themeDarkClassName = generateClassName(themeName, 'dark');
  const className = classnames({
    [themeClassName]: true,
    [themeDarkClassName]: themeMode === 'dark'
  });
  return { themeMode, className };
};

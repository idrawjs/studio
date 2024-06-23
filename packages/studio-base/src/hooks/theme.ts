import classnames from 'classnames';
// import { useContext } from 'react';
import { generateClassName } from '../css';
import type { ThemeMode } from '../types';
// import { ConfigContext } from '../modules/config-provider';

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

// export const useAutoThemeClassName = () => {
//   const { themeMode } = useContext(ConfigContext);
//   const { className } = useThemeClassName({ themeMode });
//   return [className];
// };

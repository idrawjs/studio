import React from 'react';
import { createContext, useEffect, useState, useContext } from 'react';
import { ConfigProvider as AntdConfigProvider, theme } from 'antd';
import classnames from 'classnames';
import { createPrefixName, generateClassName, getClassNameTopPrefix, setClassNameTopPrefix } from '../../css';
import { LocaleCode } from '../../locale';
import { DEFAULT_LOCALE_CODE } from '../../locale';
import { ThemeMode } from '../../types';

export interface ConfigContextValue {
  topPrefix: string;
  createPrefixName: typeof createPrefixName;
  generateClassName: typeof generateClassName;
  getClassNameTopPrefix: typeof getClassNameTopPrefix;
  setClassNameTopPrefix: typeof setClassNameTopPrefix;
  localeCode?: LocaleCode;
  themeMode?: ThemeMode;
  container?: HTMLDivElement | null;
}

const getDefaultConfigValue = (customValue?: Partial<ConfigContextValue>) => {
  if (customValue?.topPrefix && typeof customValue?.topPrefix === 'string') {
    setClassNameTopPrefix(customValue.topPrefix);
  }
  const value: ConfigContextValue = {
    topPrefix: getClassNameTopPrefix(),
    createPrefixName,
    generateClassName,
    getClassNameTopPrefix,
    setClassNameTopPrefix,
    localeCode: DEFAULT_LOCALE_CODE,
    ...(customValue || {})
  };
  return value;
};

export const ConfigContext: React.Context<ConfigContextValue> = createContext<ConfigContextValue>(getDefaultConfigValue());

export interface ConfigProviderProps extends Pick<Partial<ConfigContextValue>, 'topPrefix' | 'localeCode' | 'container' | 'themeMode'> {
  children?: React.ReactNode;
}
export const ConfigProvider: React.FC<ConfigProviderProps> = (props) => {
  const { children, topPrefix, localeCode, container, themeMode } = props;
  const contextValue: ConfigContextValue = getDefaultConfigValue({
    topPrefix,
    localeCode
  });

  const themeName = 'theme';
  const [context, setContext] = useState<ConfigContextValue>(contextValue);
  const { createPrefixName } = useContext(ConfigContext);
  const themePrefixName = createPrefixName(themeName);
  const themeClassName = themePrefixName();
  const themeDarkClassName = themePrefixName('dark');

  useEffect(() => {
    setContext({
      ...context,
      ...{ localeCode, container }
    });
  }, [localeCode, container]);

  return (
    <ConfigContext.Provider value={{ ...context }}>
      <AntdConfigProvider theme={{ algorithm: themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
        <div className={classnames([themeClassName, themeMode === 'dark' ? themeDarkClassName : ''])}>{children}</div>
      </AntdConfigProvider>
    </ConfigContext.Provider>
  );
};

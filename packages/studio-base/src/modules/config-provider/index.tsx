// import * as React from 'react';
import { createContext, useEffect, useState } from 'react';
import { createPrefixName, getPrefixName, getClassNameTopPrefix, setClassNameTopPrefix } from '../../css';
import { LocaleCode } from '../../locale';
import { DEFAULT_LOCALE_CODE } from '../../locale';

export interface ConfigContextValue {
  topPrefix: string;
  createPrefixName: typeof createPrefixName;
  getPrefixName: typeof getPrefixName;
  getClassNameTopPrefix: typeof getClassNameTopPrefix;
  setClassNameTopPrefix: typeof setClassNameTopPrefix;
  localeCode?: LocaleCode;
  container?: HTMLDivElement | null;
}

const getDefaultConfigValue = (customValue?: Partial<ConfigContextValue>) => {
  if (customValue?.topPrefix && typeof customValue?.topPrefix === 'string') {
    setClassNameTopPrefix(customValue.topPrefix);
  }
  const value: ConfigContextValue = {
    topPrefix: getClassNameTopPrefix(),
    createPrefixName,
    getPrefixName,
    getClassNameTopPrefix,
    setClassNameTopPrefix,
    localeCode: DEFAULT_LOCALE_CODE,
    ...(customValue || {})
  };
  return value;
};

export const ConfigContext: React.Context<ConfigContextValue> = createContext<ConfigContextValue>(getDefaultConfigValue());

export interface ConfigProviderProps extends Pick<Partial<ConfigContextValue>, 'topPrefix' | 'localeCode' | 'container'> {
  children?: React.ReactNode;
}
export const ConfigProvider: React.FC<ConfigProviderProps> = (props) => {
  const { children, topPrefix, localeCode, container } = props;
  const contextValue: ConfigContextValue = getDefaultConfigValue({ topPrefix, localeCode });
  const [context, setContext] = useState<ConfigContextValue>(contextValue);

  useEffect(() => {
    setContext({
      ...context,
      ...{ localeCode, container }
    });
  }, [localeCode, container]);

  return <ConfigContext.Provider value={{ ...context }}>{children}</ConfigContext.Provider>;
};

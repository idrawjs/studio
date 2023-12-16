import { useContext, useMemo } from 'react';
import type { Locale, LocaleCode, LocaleModuleName } from './types';
import { ConfigContext } from '../modules/config-provider';
import { localeMap } from './languages';

export const DEFAULT_LOCALE_CODE: LocaleCode = 'en-US';

export const useLocale = <M extends LocaleModuleName = LocaleModuleName>(moduleName: M): readonly [NonNullable<Locale[M]>] => {
  const { localeCode } = useContext(ConfigContext);
  const getLocale = useMemo<NonNullable<Locale[M]>>(() => {
    const currentLocale: Locale = localeMap[localeCode || DEFAULT_LOCALE_CODE] || localeMap[DEFAULT_LOCALE_CODE];
    const locale = currentLocale[moduleName];
    return {
      ...locale
    };
  }, [localeCode, moduleName]);

  return [getLocale] as const;
};

export * from './types';

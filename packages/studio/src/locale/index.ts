import { useContext, useMemo } from 'react';
import { Context } from '../modules/context';
import type { Locale, LocaleModuleName } from '../types';
import { localeMap } from './languages';

export const useLocale = <M extends LocaleModuleName = LocaleModuleName>(moduleName: M): readonly [NonNullable<Locale[M]>] => {
  const { state } = useContext(Context);
  const localeCode = state.localeCode;
  const getLocale = useMemo<NonNullable<Locale[M]>>(() => {
    const currentLocale: Locale = localeMap[localeCode];
    const locale = currentLocale[moduleName];
    return {
      ...locale
    };
  }, [localeCode, moduleName]);

  return [getLocale] as const;
};

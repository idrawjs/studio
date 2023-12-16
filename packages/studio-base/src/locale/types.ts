export type LocaleModuleName = Exclude<keyof Locale, 'locale'>;

export type LocaleCode = 'en-US' | 'zh-CN';

export interface Locale<T = LocaleCode> {
  locale: T;
  Header: Record<string, string>;
  ElementDetail: {
    basicAttributes: string;
    borderAttribute: string;
    contentAttribute: string;
    shadowAttribute: string;
    x: string;
    y: string;
    w: string;
    h: string;
    background: string;
    solid: string;
    dash: string;
    inside: string;
    outside: string;
    centerLine: string;
    gradient: string;
    opacity: string;
    mixedBorderWidth: string;
    mixedBorderRadius: string;
  };
}

export type LocaleMap = Record<LocaleCode, Locale>;

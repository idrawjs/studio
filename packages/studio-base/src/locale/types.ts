export type LocaleModuleName = Exclude<keyof Locale, 'locale'>;

export type LocaleCode = 'en-US' | 'zh-CN';

export interface Locale<T = LocaleCode> {
  locale: T;
  Header: Record<string, string>;
  LayoutDetail: {
    layout: string;
    groupLayout: string;
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
    overflow: string;
    hidden: string;
    visible: string;
  };
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
    overflow: string;
    hidden: string;
    visible: string;
    deepResizeInGroup: string;
    fill: string;
    stroke: string;
  };
  Menu: {
    about: string;
    file: string;
    importJSONFile: string;
    exportJSONFile: string;
    exportImage: string;
    preferences: string;
    rect: string;
    circle: string;
    text: string;
    image: string;
    html: string;
    svg: string;
    group: string;
    devicePixelRatio: string;
  };
}

export type LocaleMap = Record<LocaleCode, Locale>;

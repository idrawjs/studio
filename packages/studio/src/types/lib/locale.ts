export type LocaleModuleName = Exclude<keyof Locale, 'locale'>;

export type LocaleCode = 'en-US' | 'zh-CN';

export interface Locale<T = LocaleCode> {
  locale: T;
  NavMenu: {
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
  contextMenu: {
    copy: string;
    paste: string;
    cut: string;
    delete: string;
    // bringToFront: string;
    // sendToBack: string;
  };
}

export type LocaleMap = Record<LocaleCode, Locale>;

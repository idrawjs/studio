import type { Locale } from '../types';

const localeValues: Locale = {
  locale: 'en-US',
  NavMenu: {
    about: 'About @idraw/studio',
    file: 'File',
    importJSONFile: 'Import JSON file',
    exportJSONFile: 'Export JSON file',
    exportImage: 'Export image',
    preferences: 'Preferences',
    rect: 'Rect',
    circle: 'Circle',
    text: 'Text',
    image: 'Image',
    html: 'HTML',
    svg: 'SVG',
    group: 'Group',
    devicePixelRatio: 'Device pixel ratio'
  },
  contextMenu: {
    copy: 'Copy',
    paste: 'Paste',
    cut: 'Cut'
    // bringToFront: 'Bring to front',
    // sendToBack: 'Send to back'
  }
};

export default localeValues;

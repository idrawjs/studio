import type { Locale } from '../../types';

const localeValues: Locale = {
  locale: 'en-US',
  NavMenu: {
    about: 'About @idraw/studio',
    file: 'File',
    importJSONFile: 'Import JSON file',
    exportJSONFile: 'Export JSON file',
    exportImage: 'Export image',
    preferences: 'Preferences',
    material: 'Material',
    rect: 'Rect',
    circle: 'Circle',
    text: 'Text',
    image: 'Image',
    html: 'HTML',
    svg: 'SVG',
    group: 'Group',
    devicePixelRatio: 'Device pixel ratio',
    materialTempate: 'Material templates'
  },
  Toolbar: {
    layers: 'Layers',
    ruler: 'Ruler',
    attributes: 'Attributes',
    hand: 'Hand tool',
    centerContent: 'Center content'
  },
  PanelPage: {
    pages: 'Pages',
    addPage: 'Add page',
    overview: 'Overview',
    pcPageTemplates: 'PC page templates',
    mobilePageTemplates: 'Mobile page templates'
  },
  TemplatePreview: {
    add: 'Add',
    cancel: 'Cancel'
  },
  contextMenu: {
    copy: 'Copy',
    paste: 'Paste',
    cut: 'Cut',
    delete: 'Delete'
    // bringToFront: 'Bring to front',
    // sendToBack: 'Send to back'
  }
};

export default localeValues;

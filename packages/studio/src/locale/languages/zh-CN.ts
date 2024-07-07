import type { Locale } from '../../types';

const localeValues: Locale = {
  locale: 'zh-CN',
  NavMenu: {
    about: '关于 @idraw/studio',
    file: '文件',
    importJSONFile: '导入JSON文件',
    exportJSONFile: '导出JSON文件',
    exportImage: '导出图片',
    preferences: '预设',
    material: '物料',
    rect: '矩形',
    circle: '圆形',
    text: '文本',
    image: '图片',
    html: 'HTML片段',
    svg: 'SVG片段',
    group: '群组',
    devicePixelRatio: '设备像素比例',
    materialTempate: '物料模板'
  },
  Toolbar: {
    layers: '图层',
    ruler: '标尺',
    attributes: '属性',
    hand: '拖拽工具',
    centerContent: '内容居中'
  },
  PanelPage: {
    pages: '页面',
    addPage: '添加PC页面',
    overview: '预览',
    pcPageTemplates: 'PC页面模板',
    mobilePageTemplates: '移动页面模板'
  },
  contextMenu: {
    copy: '复制',
    paste: '粘贴',
    cut: '剪切',
    delete: '删除'
    // bringToFront: '移到上一个',
    // sendToBack: '移到下一个'
  }
};

export default localeValues;

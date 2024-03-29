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
    rect: '矩形',
    circle: '圆形',
    text: '文本',
    image: '图片',
    html: 'HTML片段',
    svg: 'SVG片段',
    group: '群组',
    devicePixelRatio: '设备像素比例'
  },
  Toolbar: {
    layers: '图层',
    ruler: '标尺',
    attributes: '属性',
    hand: '拖拽工具',
    centerContent: '内容居中'
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

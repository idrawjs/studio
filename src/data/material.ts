import type { GetTemplates, GetTemplatesOptions, TemplateItem } from '@idraw/studio';
import { basePath } from './base';

const materialTemplateList: Array<TemplateItem> = [
  'tpl-button.json',
  'tpl-input.json',
  'tpl-keyboard.json',
  'tpl-link.json',
  'tpl-password.json',
  'tpl-product-card-large.json',
  'tpl-product-card-middle.json',
  'tpl-product-card-small.json',
  'tpl-text.json',
  'tpl-title.json'
].map((item) => ({
  name: item
    .replace(/^tpl/, '')
    .replace(/.json$/, '')
    .replace(/-[a-z]/g, (match: string) => {
      return ` ${match.replace('-', '').toUpperCase()}`;
    })
    .trim(),
  element: null,
  staticResource: `${basePath}/${item}`
}));

export const getMaterialTemplates: GetTemplates = async (opts: GetTemplatesOptions) => {
  const { pageSize = 8, current = 1 } = opts;
  const start = Math.max(0, current - 1) * pageSize;
  const end = current * pageSize;
  const total = materialTemplateList.length;

  const list: TemplateItem[] = [];
  for (let i = start; i < end; i++) {
    const item = materialTemplateList[i];
    if (item) {
      list.push(item);
    }
  }
  return {
    list,
    pageSize,
    current,
    total
  };
};

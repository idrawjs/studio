import type { GetTemplates, GetTemplatesOptions, TemplateItem } from '@idraw/studio';
const basePath = '/static/page';

const pageTemplateList: Array<TemplateItem> = [
  'tpl-blank.json',
  'tpl-loading.json',
  'tpl-guide.json',
  'tpl-home.json',
  'tpl-sign-in.json',
  'tpl-sign-up.json',
  'tpl-list.json',
  'tpl-list-two-columns.json',
  'tpl-list-two-columns-with-more-info.json',
  'tpl-detail.json',
  'tpl-forget-password-verification.json',
  'tpl-forget-password.json',
  'tpl-message.json',
  'tpl-notification.json',
  'tpl-chat.json',
  'tpl-profile-edit.json',
  'tpl-profile.json',
  'tpl-schedule.json',
  'tpl-search.json',
  'tpl-code-verification.json'
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

export const getPageTemplates: GetTemplates = async (opts: GetTemplatesOptions) => {
  const { pageSize = 8, current = 1 } = opts;
  const start = Math.max(0, current - 1) * pageSize;
  const end = current * pageSize;
  const total = pageTemplateList.length;

  const list: TemplateItem[] = [];
  for (let i = start; i < end; i++) {
    const item = pageTemplateList[i];
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

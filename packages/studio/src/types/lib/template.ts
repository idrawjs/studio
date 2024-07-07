import type { Element } from 'idraw';

export type TemplateItem = {
  name: string;
  element: Element<'group'> | null;
  staticResource?: string | null;
};

export type TemplatePerPage = {
  list: TemplateItem[];
  pageSize: number;
  current: number; // start 1
  total: number;
};

export type GetTemplatesOptions = {
  pageSize: number;
  current: number; // start 1
};

export type GetTemplates = (opts: GetTemplatesOptions) => TemplatePerPage | Promise<TemplatePerPage>;

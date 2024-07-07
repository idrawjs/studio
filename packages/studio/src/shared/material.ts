import type { GetTemplates } from '../types';
import button from './element/material-button';
import input from './element/material-input';
import link from './element/material-link';
import password from './element/material-password';
import text from './element/material-text';
import title from './element/material-title';

export const getDefaultMaterialTemplates: GetTemplates = (opts) => {
  return {
    list: [
      {
        name: 'Button',
        element: button
      },
      {
        name: 'Input',
        element: input
      },
      {
        name: 'Password',
        element: password
      },
      {
        name: 'Text',
        element: text
      },
      {
        name: 'Title',
        element: title
      },
      {
        name: 'Link',
        element: link
      }
    ],
    pageSize: 8,
    current: 1,
    total: 8
  };
};

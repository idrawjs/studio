import type { GetTemplates } from '../types';
import pageIPhoneLoading from './element/iphone-loading-page';
import pageIPhoneBlank from './element/iphone-blank-page';

export const getDefaultPageTemplates: GetTemplates = (opts) => {
  return {
    list: [
      {
        name: 'Blank Page',
        element: pageIPhoneBlank
      },
      {
        name: 'Loading Page',
        element: pageIPhoneLoading
      }
    ],
    pageSize: 8,
    current: 1,
    total: 2
  };
};

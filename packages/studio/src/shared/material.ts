import type { GetTemplates } from '../types';
import pageIphoneLoading from './element/iphone-loading-page';

export const getDefaultMaterialTemplates: GetTemplates = (opts) => {
  return {
    list: [
      {
        name: 'Loading',
        element: pageIphoneLoading
      }
    ],
    pageSize: 8,
    current: 1,
    total: 8
  };
};

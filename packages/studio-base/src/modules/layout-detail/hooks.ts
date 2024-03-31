import { useLocale } from '../../locale';
const moduleName = 'LayoutDetail';

export const useModuleLocale = () => {
  const [moduleLocale] = useLocale(moduleName);
  return moduleLocale;
};

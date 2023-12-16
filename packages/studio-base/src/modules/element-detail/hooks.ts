import { useLocale } from '../../locale';
const moduleName = 'ElementDetail';

export const useModuleLocale = () => {
  const [moduleLocale] = useLocale(moduleName);
  return moduleLocale;
};

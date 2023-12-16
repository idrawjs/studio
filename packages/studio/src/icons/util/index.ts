import type { CSSProperties } from 'react';
import { useContext } from 'react';
import { ConfigContext } from '@idraw/studio-base';

const modName = 'icon';

export const useIconClassName = () => {
  const { getPrefixName } = useContext(ConfigContext);
  const iconClassName = getPrefixName(modName);
  return { iconClassName };
};

export interface IconProps {
  className?: string;
  style?: CSSProperties;
}

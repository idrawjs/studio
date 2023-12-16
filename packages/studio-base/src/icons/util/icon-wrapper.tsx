import React, { CSSProperties, useMemo, useContext } from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../../modules/config-provider';

const iconPrefixBaseName = 'icon';

export const useIconClassName = () => {
  const { getPrefixName } = useContext(ConfigContext);
  const iconClassName = getPrefixName(iconPrefixBaseName);
  return { iconClassName };
};

export interface IconWrapperProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export const IconWrapper = (props: IconWrapperProps) => {
  const { className, style, children, ...restProps } = props;
  const { iconClassName } = useIconClassName();
  return useMemo(() => {
    return (
      <span className={classnames([iconClassName, className])} style={style} {...restProps}>
        {children}
      </span>
    );
  }, [iconClassName]);
};

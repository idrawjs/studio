import React, { CSSProperties, useMemo } from 'react';
import classnames from 'classnames';
// import { ConfigContext } from '../../modules/config-provider';
import { generateClassName } from '../../css';

const iconPrefixBaseName = 'icon';

export const useIconClassName = () => {
  // const { generateClassName } = useContext(ConfigContext);
  const iconClassName = generateClassName(iconPrefixBaseName);
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
  }, [iconClassName, style, className]);
};

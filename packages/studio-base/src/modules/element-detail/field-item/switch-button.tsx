import React from 'react';
import { Button } from 'antd';
import type { ButtonProps } from 'antd';

type SwitchButtonProps = Omit<ButtonProps, 'onChange'> & {
  value?: boolean;
  onChange?: (value: boolean) => void;
};

export const SwitchButton: React.FC<SwitchButtonProps> = (props: SwitchButtonProps) => {
  const { value, onChange, ...restProps } = props;

  const triggerChange = (changedValue: boolean) => {
    onChange?.(changedValue);
  };

  const onValueChange = () => {
    const newValue = !value;
    triggerChange(newValue);
  };

  return <Button {...restProps} type={value ? 'primary' : 'default'} onClick={onValueChange} />;
};

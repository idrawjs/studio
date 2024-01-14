import React, { useEffect, useState, useMemo, useContext } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { Button, type ButtonProps } from 'antd';
import { ConfigContext, IconLayer, IconSetting, IconRuler, IconDrag } from '@idraw/studio-base';
import type { SharedEvent, SharedStore } from '../../types';

// const RadioButton = Radio.Button;
// const RadioGroup = Radio.Group;
const modName = 'mod-toolbar';

export interface ToolbarProps {
  className?: string;
  style?: CSSProperties;
  openLeftSider: boolean;
  openRightSider: boolean;
  onClickToggleLayer?: () => void;
  onClickToggleSetting?: () => void;
  sharedStore: SharedStore;
  sharedEvent: SharedEvent;
}

export const Toolbar = (props: ToolbarProps) => {
  const { className, style, openLeftSider, openRightSider, onClickToggleLayer, onClickToggleSetting, sharedStore } = props;
  // const [mode, setMode] = useState<string>('select');
  const iconStyle = { fontSize: 16 };
  const { createPrefixName } = useContext(ConfigContext);
  const generateClassName = createPrefixName(modName);
  const rootClassName = generateClassName();
  const leftClassName = generateClassName('left');
  const rightClassName = generateClassName('right');
  // const middleClassName = generateClassName('middle');
  const btnClassName = generateClassName('btn');
  // const modeSwitchClassName = generateClassName('mode-switch');
  const [toggleDrag, setToggleDrag] = useState<boolean>(false);
  const [toggleRuler, setToggleRuler] = useState<boolean>(true);

  useEffect(() => {
    const idraw = sharedStore.get('idraw');
    idraw?.reset({
      enableRuler: toggleRuler,
      enableDrag: toggleDrag,
      enableSelect: !toggleDrag
    });
  }, [toggleDrag, toggleRuler]);

  const btnProps: ButtonProps = {
    size: 'small',
    className: btnClassName,
    shape: 'default'
  };

  return useMemo(() => {
    return (
      <div style={style} className={classnames(rootClassName, className)}>
        <div className={leftClassName}></div>
        {/* <RadioGroup className={classnames(middleClassName, modeSwitchClassName)} value={mode} onChange={(e) => setMode(e.target.value)}>
          <RadioButton value="select">
            <IconMouse style={iconStyle} />
          </RadioButton>
          <RadioButton value="pen">
            <IconPen style={iconStyle} />
          </RadioButton>
          <RadioButton value="hand">
            <IconHand style={iconStyle} />
          </RadioButton>
          <RadioButton value="more">
            <IconMore style={iconStyle} />
          </RadioButton>
        </RadioGroup> */}
        <div className={rightClassName}>
          <Button {...btnProps} type={openLeftSider ? 'primary' : 'default'} icon={<IconLayer style={iconStyle} />} onClick={onClickToggleLayer} />
          <Button {...btnProps} type={openRightSider ? 'primary' : 'default'} icon={<IconSetting style={iconStyle} />} onClick={onClickToggleSetting} />
          <Button
            {...btnProps}
            type={toggleRuler ? 'primary' : 'default'}
            icon={<IconRuler style={{ ...iconStyle, fontSize: 20 }} />}
            onClick={() => {
              setToggleRuler(!toggleRuler);
            }}
          />
          <Button
            {...btnProps}
            type={toggleDrag ? 'primary' : 'default'}
            icon={<IconDrag style={{ ...iconStyle, fontSize: 20 }} />}
            onClick={() => {
              setToggleDrag(!toggleDrag);
            }}
          />
        </div>
      </div>
    );
  }, [openLeftSider, openRightSider, onClickToggleLayer, onClickToggleSetting, toggleDrag, toggleRuler]);
};

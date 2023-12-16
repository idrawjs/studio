import React, { useState, useMemo, useContext } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { Button, type ButtonProps } from 'antd';
import { ConfigContext } from '@idraw/studio-base';
import { Context } from '../context';
import IconLayer from '../../icons/layer';
import IconSetting from '../../icons/setting';
// import IconMouse from '../../icons/mouse';
// import IconPen from '../../icons/pen';
// import IconHand from '../../icons/hand';
// import IconMore from '../../icons/more';
import IconRuler from '../../icons/ruler';

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
}

export const Toolbar = (props: ToolbarProps) => {
  const { className, style, openLeftSider, openRightSider, onClickToggleLayer, onClickToggleSetting } = props;
  // const [mode, setMode] = useState<string>('select');
  const iconStyle = { fontSize: 16 };
  const { createPrefixName } = useContext(ConfigContext);
  const getPrefixName = createPrefixName(modName);
  const rootClassName = getPrefixName();
  const leftClassName = getPrefixName('left');
  const rightClassName = getPrefixName('right');
  // const middleClassName = getPrefixName('middle');
  const btnClassName = getPrefixName('btn');
  // const modeSwitchClassName = getPrefixName('mode-switch');
  const { state, dispatch } = useContext(Context);

  const onClickToggleRuler = () => {
    dispatch({
      payload: {
        showRuler: !state.showRuler
      },
      type: 'update'
    });
  };

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
            type={state.showRuler ? 'primary' : 'default'}
            icon={<IconRuler style={{ ...iconStyle, fontSize: 20 }} />}
            onClick={onClickToggleRuler}
          />
        </div>
      </div>
    );
  }, [openLeftSider, openRightSider, onClickToggleLayer, onClickToggleSetting, state.showRuler]);
};

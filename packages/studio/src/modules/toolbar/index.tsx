import React, { useEffect, useState, useMemo } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { Button, type ButtonProps, Tooltip } from 'antd';
import { generateClassName, IconLayer, IconSetting, IconRuler, IconDrag, IconAim } from '@idraw/studio-base';
import type { SharedEvent, SharedStore } from '../../types';
import { useLocale } from '../../locale';
import { ActionMenu } from './action-menu';

const modName = 'mod-toolbar';

const useModuleLocale = () => {
  const [moduleLocale] = useLocale('Toolbar');
  return moduleLocale;
};

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
  const { className, style, openLeftSider, openRightSider, onClickToggleLayer, onClickToggleSetting, sharedEvent, sharedStore } = props;
  // const [mode, setMode] = useState<string>('select');
  const iconStyle = { fontSize: 16 };
  const rootClassName = generateClassName(modName);
  const leftClassName = generateClassName(modName, 'left');
  const rightClassName = generateClassName(modName, 'right');
  // const middleClassName = generateClassName('middle');
  const btnClassName = generateClassName(modName, 'btn');
  // const modeSwitchClassName = generateClassName('mode-switch');
  const [toggleDrag, setToggleDrag] = useState<boolean>(false);
  const [toggleRuler, setToggleRuler] = useState<boolean>(true);
  const moduleLocale = useModuleLocale();

  useEffect(() => {
    const idraw = sharedStore.getStatic('idraw');
    if (toggleRuler === true) {
      idraw?.enable('ruler');
    } else {
      idraw?.disable('ruler');
    }
  }, [toggleRuler]);

  useEffect(() => {
    const idraw = sharedStore.getStatic('idraw');
    idraw?.setMode(toggleDrag ? 'drag' : 'select');
  }, [toggleDrag]);

  const btnProps: ButtonProps = {
    size: 'small',
    className: btnClassName,
    shape: 'default'
  };

  return useMemo(() => {
    return (
      <div style={style} className={classnames(rootClassName, className)}>
        <div className={leftClassName}></div>

        <div className={rightClassName}>
          <Tooltip title={moduleLocale.layers}>
            <Button {...btnProps} type={openLeftSider ? 'primary' : 'default'} icon={<IconLayer style={iconStyle} />} onClick={onClickToggleLayer} />
          </Tooltip>
          <Tooltip title={moduleLocale.attributes}>
            <Button {...btnProps} type={openRightSider ? 'primary' : 'default'} icon={<IconSetting style={iconStyle} />} onClick={onClickToggleSetting} />
          </Tooltip>
          <Tooltip title={moduleLocale.ruler}>
            <Button
              {...btnProps}
              type={toggleRuler ? 'primary' : 'default'}
              icon={<IconRuler style={{ ...iconStyle, fontSize: 20 }} />}
              onClick={() => {
                setToggleRuler(!toggleRuler);
              }}
            />
          </Tooltip>
          <Tooltip title={moduleLocale.hand}>
            <Button
              {...btnProps}
              type={toggleDrag ? 'primary' : 'default'}
              icon={<IconDrag style={{ ...iconStyle, fontSize: 20 }} />}
              onClick={() => {
                setToggleDrag(!toggleDrag);
              }}
            />
          </Tooltip>
          <Tooltip title={moduleLocale.centerContent}>
            <Button
              {...btnProps}
              type="text"
              icon={<IconAim style={{ ...iconStyle, fontSize: 20 }} />}
              onClick={() => {
                const idraw = sharedStore.getStatic('idraw');
                idraw?.centerContent();
              }}
            />
          </Tooltip>
          <ActionMenu sharedEvent={sharedEvent} sharedStore={sharedStore} />
        </div>
      </div>
    );
  }, [openLeftSider, openRightSider, onClickToggleLayer, onClickToggleSetting, toggleDrag, toggleRuler, moduleLocale]);
};

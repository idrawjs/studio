import React, { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { Button, Tooltip } from 'antd';
import type { ButtonProps } from 'antd';
import { IconRedo, IconUndo } from '@idraw/studio-base';
import type { SharedEvent, SharedStore } from '../../types';
import { useLocale } from '../../locale';

const useModuleLocale = () => {
  const [moduleLocale] = useLocale('Toolbar');
  return moduleLocale;
};
// const modName = 'mod-nav-menu';

export interface ActionMenuProps {
  className?: string;
  style?: CSSProperties;
  sharedEvent: SharedEvent;
  sharedStore: SharedStore;
}

export const ActionMenu = (props: ActionMenuProps) => {
  const { style, sharedEvent, sharedStore } = props;
  const moduleLocale = useModuleLocale();
  const [canRedo, setCanRedo] = useState<boolean>(false);
  const [canUndo, setCanUndo] = useState<boolean>(false);

  const btnProps: ButtonProps = {
    size: 'small',
    type: 'text'
  };

  useEffect(() => {
    const snapshotRecorder = sharedStore.get('snapshotRecorder');
    const doCallback = (e: { canRedo: boolean; canUndo: boolean }) => {
      setCanRedo(e.canRedo);
      setCanUndo(e.canUndo);
    };
    const undoCallback = (e: { canRedo: boolean; canUndo: boolean }) => {
      setCanRedo(e.canRedo);
      setCanUndo(e.canUndo);
    };
    const redoCallback = (e: { canRedo: boolean; canUndo: boolean }) => {
      setCanRedo(e.canRedo);
      setCanUndo(e.canUndo);
    };
    if (snapshotRecorder) {
      snapshotRecorder.on('do', doCallback);
      snapshotRecorder.on('undo', undoCallback);
      snapshotRecorder.on('redo', redoCallback);
    }

    return () => {
      if (snapshotRecorder) {
        snapshotRecorder.off('do', doCallback);
        snapshotRecorder.off('undo', undoCallback);
        snapshotRecorder.off('redo', redoCallback);
      }
    };
  }, []);

  const navList: Array<{ key: string; title: string; button: React.ReactNode; onClick: () => void; disabled?: boolean }> = [
    {
      key: 'redo',
      title: moduleLocale.redo,
      button: <IconRedo style={{ fontSize: 14 }} />,
      disabled: !canRedo,
      onClick: () => {
        sharedEvent.trigger('redo');
      }
    },
    {
      key: 'undo',
      title: moduleLocale.undo,
      button: <IconUndo style={{ fontSize: 14 }} />,
      disabled: !canUndo,
      onClick: () => {
        sharedEvent.trigger('undo');
      }
    }
  ];

  return useMemo(() => {
    return (
      <div
        style={{
          ...style,
          ...{
            width: 100,
            display: 'flex',
            flexDirection: 'row'
          }
        }}
        // className={classnames(rootClassName, className)}
      >
        {navList.map((item, i) => {
          return (
            <Tooltip key={i} placement="top" title={item.title}>
              <Button
                {...btnProps}
                disabled={item.disabled}
                style={{ width: 28, textAlign: 'center', justifyContent: 'center', alignItems: 'center', display: 'inline-flex' }}
                key={i}
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  item.onClick();
                }}
              >
                {item.button}
              </Button>
            </Tooltip>
          );
        })}
      </div>
    );
  }, [moduleLocale, canRedo, canUndo]);
};

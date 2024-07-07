import React, { useMemo, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { generateClassName, IconVisible, IconCheckCircle } from '@idraw/studio-base';
import type { Element } from 'idraw';
import { iDraw } from 'idraw';
import { Button, Spin, Alert, Tooltip } from 'antd';
import type { TemplateItem } from '../../types';

const modName = 'item';

export interface PreviewItemProps {
  className?: string;
  style?: CSSProperties;
  parentModName: string;
  width: number;
  height: number;
  onMount?: (e: { idraw: iDraw }) => void;
  item: TemplateItem;
  onSelect: (e: { element: Element<'group'> | null }) => void;
}

export const PreviewItem = (props: PreviewItemProps) => {
  const { parentModName, className, style, width, height, onMount, item, onSelect, ...divAttrs } = props;
  const refDom = useRef<HTMLDivElement | null>(null);
  const refIDraw = useRef<iDraw | null>(null);
  const refPageElement = useRef<Element<'group'> | null>(item.element);
  const rootClassName = generateClassName(parentModName, modName);
  const nameClassName = generateClassName(parentModName, modName, 'name');
  const actionClassName = generateClassName(parentModName, modName, 'action');
  const alertClassName = generateClassName(parentModName, modName, 'alert');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    if (width > 0 && height > 0 && refDom.current) {
      if (!refIDraw.current) {
        refIDraw.current = new iDraw(refDom.current, {
          width,
          height,
          devicePixelRatio: 1
        });
      }
    }
    return () => {
      const idraw = refIDraw.current;
      idraw?.destroy();
      refIDraw.current = null;
    };
  }, []);

  useEffect(() => {
    const idraw = refIDraw.current;
    if (idraw) {
      idraw.setMode('readOnly');
      idraw.$offBoardWatcherEvents();
      const { element, staticResource } = item;
      if (element) {
        idraw.setData({
          elements: [element]
        });
        idraw.centerContent();
      } else if (staticResource) {
        setLoading(true);
        setErrorText(null);
        window
          .fetch(staticResource)
          .then((res) => res.json())
          .then((res) => {
            refPageElement.current = res;
            idraw.setData({
              elements: [res]
            });
            idraw.centerContent();
          })
          .catch((err: Error) => {
            const text = [err.name, err.message].join(', ');
            setErrorText(text);
          })
          .finally(() => {
            setLoading(false);
          });
      }
      onMount?.({ idraw });
    }
  }, [item]);

  return useMemo(() => {
    return (
      <Spin spinning={loading}>
        <div
          style={{
            ...style,
            ...{
              width,
              minHeight: height
            }
          }}
          className={classnames(rootClassName, className)}
          {...divAttrs}
        >
          <Tooltip placement="top" title={item.name}>
            <div className={nameClassName}>{item.name}</div>
          </Tooltip>
          <div ref={refDom}></div>
          <div className={actionClassName}>
            <Button.Group size="large">
              {/* <Button size="large" type="primary">
                <IconVisible style={{ fontSize: 20 }} />
              </Button> */}
              <Button size="large" type="primary">
                <IconCheckCircle
                  style={{ fontSize: 20 }}
                  onClick={() => {
                    const element = refPageElement.current;
                    if (element) {
                      element.name = item.name;
                    }
                    onSelect({
                      element
                    });
                  }}
                />
              </Button>
            </Button.Group>
          </div>
          {errorText && <Alert className={alertClassName} type="error" message={errorText} banner />}
        </div>
      </Spin>
    );
  }, [loading, errorText, item]);
};

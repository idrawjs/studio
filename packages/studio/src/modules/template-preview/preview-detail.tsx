import React, { useEffect, useRef, useImperativeHandle } from 'react';
import { iDraw } from 'idraw';
import type { Data, IDrawOptions } from 'idraw';
import { generateClassName } from '@idraw/studio-base';

const modName = 'detail';

export type PreviewDetailHandler = {
  resetData: (data: Data) => void;
};

export type PreviewDetailProps = {
  canvasWidth: number;
  canvasHeight: number;
  data: Data;
  parentModName: string;
  handler: React.Ref<PreviewDetailHandler>;
};

export const PreviewDetail: React.FC<PreviewDetailProps> = (props: PreviewDetailProps) => {
  const { data, canvasWidth, canvasHeight, parentModName, handler } = props;
  const refCanvas = useRef<HTMLDivElement | null>(null);
  const refIDraw = useRef<iDraw | null>(null);

  const rootClassName = generateClassName(parentModName, modName);
  const canvasClassName = generateClassName(parentModName, modName, 'canvas');

  useImperativeHandle(
    handler,
    () => {
      return {
        resetData: (data: Data) => {
          refIDraw.current?.setData(data);
          refIDraw.current?.centerContent();
        }
      };
    },
    []
  );

  useEffect(() => {
    if (!refIDraw.current) {
      if (refCanvas.current) {
        const idrawOptions: IDrawOptions = {
          width: canvasWidth,
          height: canvasHeight,
          devicePixelRatio: window.devicePixelRatio
        };
        const idraw = new iDraw(refCanvas.current, idrawOptions);
        idraw.setData(data);
        idraw.centerContent();
        refIDraw.current = idraw;
      }
    }
    return () => {
      if (refIDraw.current) {
        refIDraw.current.destroy();
        refIDraw.current = null;
      }
    };
  }, []);

  return (
    <div className={rootClassName}>
      <div ref={refCanvas} className={canvasClassName} />
    </div>
  );
};

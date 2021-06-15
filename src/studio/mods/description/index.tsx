import * as React from 'react';
import { TypeElemDesc, TypeElement } from '@idraw/types';
import { StudioContext } from './../../context';
import { getElement } from './../../util/data';
import eventHub from './../../util/event-hub';
import { RectDescForm } from './rect';

const { useContext, useCallback } = React;

const supportElemList = ['rect']; // TODO 

export const Description = () => {
  const context = useContext(StudioContext);
  const { data, selectedElementUUID } = context;
  const elem: TypeElement<keyof TypeElemDesc> = getElement(data, selectedElementUUID);

  const onChangeElementDesc = useCallback((desc: TypeElemDesc[keyof TypeElemDesc]) => {
    if (elem) {
      elem.desc = { ...elem.desc, ...desc };
      eventHub.trigger('studioUpdateElement', elem);
    }
  }, [selectedElementUUID]);

  return (
    <div className="idraw-studio-mod-desc">
      {supportElemList.includes(elem?.type) ? (
        <>
          {elem?.type === 'rect' && (
            <RectDescForm
              elem={elem as TypeElement<'rect'>}
              onChange={onChangeElementDesc}
            />
          )}
        </>
      ) : (
        <div className="no-select-data">No Data</div>
      )}
    </div>
  )
}


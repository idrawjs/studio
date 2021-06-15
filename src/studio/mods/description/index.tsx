import * as React from 'react';
import { TypeElemDesc, TypeElement } from '@idraw/types';
import { StudioContext } from './../../context';
import { getElement } from './../../util/data';
// import eventHub from './../../util/event-hub';
import { RectDescForm } from './rect';

const { useContext } = React;

const supportElemList = ['rect']; // TODO 

export const Description = () => {
  const context = useContext(StudioContext);
  const { data, selectedElementUUID } = context;
  const elem: TypeElement<keyof TypeElemDesc> = getElement(data, selectedElementUUID);

  return (
    <div className="idraw-studio-mod-desc">
      {supportElemList.includes(elem?.type) ? (
        <>
          {elem?.type === 'rect' && (
            <RectDescForm elem={elem as TypeElement<'rect'>} />
          )}
        </>
      ) : (
        <div className="no-select-data">No Data</div>
      )}
    </div>
  )
}


import * as React from 'react';
import { StudioContext } from './../../context';

const { useContext } = React;

export const Attribute = () => {
  const context = useContext(StudioContext);
  const { selectedElementUUID } = context;
  return (
    <div className="idraw-studio-mod-attribute">
      {selectedElementUUID ? (
        <div>{selectedElementUUID}</div>
      ) : (
        <div className="no-select-data">No Data</div>
      )}
    </div>
  )
}


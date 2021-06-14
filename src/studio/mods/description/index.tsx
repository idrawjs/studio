import * as React from 'react';
import { StudioContext } from './../../context';

const { useContext } = React;

export const Description = () => {
  const context = useContext(StudioContext);
  const { selectedElementUUID } = context;
  return (
    <div className="idraw-studio-mod-desc">
      {selectedElementUUID ? (
        <div>{selectedElementUUID}</div>
      ) : (
        <div className="no-select-data">No Data</div>
      )}
    </div>
  )
}


import * as React from 'react';
import { StudioContext } from './../../context';

const { useContext } = React;

export const Description = () => {
  const context = useContext(StudioContext);
  const { selectedElement } = context;
  return (
    <div className="idraw-studio-mod-desc">
      {selectedElement?.uuid ? (
        <div>{selectedElement?.uuid}</div>
      ) : (
        <div className="no-select-data">No Data</div>
      )}
    </div>
  )
}


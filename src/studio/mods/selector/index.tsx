import * as React from 'react';
import { TypeElement, TypeElemDesc } from '@idraw/types';
import { VirtualDrag } from '../virtual-drag';
import eventHub from '../../util/event-hub';


export type TypeSelectDataItem = {
  name: string,
  icon: React.ReactElement,
  element: TypeElement<keyof TypeElemDesc>
}


export const Selector = (props: {
  dataList?: TypeSelectDataItem[]
}) => {
  const { dataList = [] } = props;
  const onActionEnd = React.useCallback((e, element: TypeElement<keyof TypeElemDesc>) => {
    eventHub.trigger('studioDragNewElement', {
      clientX: e.clientX,
      clientY: e.clientY,
      element: element,
    })
  }, []);

  return (
    <div className="idraw-studio-mod-selector">
      <div className="studio-selector-element-list">
        {dataList.map((elem, i) => {
          const { icon, element } = elem;
          return (
            <div className="studio-selector-element-item" key={i}>
              <VirtualDrag onActionEnd={(e) => {
                onActionEnd(e, element);
              }}>
                {icon}
              </VirtualDrag>
            </div>
          )
        })}
      </div>
    </div>
  )
}

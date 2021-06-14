import * as React from 'react';
import { List } from '../../../ui/antd';
import classnames from 'classnames';
import eventHub from '../../util/event-hub';
import {
  TypeElement, TypeElemDesc
} from '@idraw/types';

type TypeProps = {
  elements: TypeElement<keyof TypeElemDesc>[]
  selectedUUID: string | null
}


export const Elements = (props: TypeProps) => {

  const { elements, selectedUUID } = props;

  return (
    <div className="idraw-studio-element">
      <List
        size="small"
        dataSource={elements}
        renderItem={(item) => {
          return (
            <List.Item
              className={classnames({
              'idraw-studio-element-item': true,
              'element-item-active': (item.uuid && selectedUUID && item.uuid === selectedUUID)
              })}
              onClick={() => {
                eventHub.trigger('studioSelectElement', item.uuid);
              }}
            >
              {item.name || 'Unnamed'}
            </List.Item>
          )
        }}
      />
    </div>
  )
}
 
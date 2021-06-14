import * as React from 'react';
import { List } from '../../../ui/antd';
import classnames from 'classnames';
import eventHub from '../../util/event-hub';import { StudioContext } from './../../context';

const { useContext } = React;


// type TypeProps = {}


export const Elements = () => {

const context = useContext(StudioContext);
const { data, selectedElementUUID } = context;

  return (
    <div className="idraw-studio-mod-element">
      <List
        size="small"
        dataSource={data.elements}
        renderItem={(item) => {
          return (
            <List.Item
              className={classnames({
                'idraw-studio-element-item': true,
                'element-item-active': (item.uuid && selectedElementUUID && item.uuid === selectedElementUUID)
              })}
              onClick={() => {
                eventHub.trigger('studioSelectElement', { uuid: item.uuid });
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
 
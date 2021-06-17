import * as React from 'react';
import { List } from '../../../ui/antd';
import classnames from 'classnames';
import eventHub from '../../util/event-hub';import { StudioContext } from './../../context';

const { useContext } = React;


type TypeProps = {
  maxHeight?: number
}


export const Elements = (props: TypeProps) => {

  const context = useContext(StudioContext);
  const { data, selectedElementUUID } = context;
  const style: React.HTMLAttributes<HTMLDivElement>['style'] = {};
  if (props.maxHeight > 0) {
    style.maxHeight = props.maxHeight;
    style.height = props.maxHeight;
  }

  return (
    <div className="idraw-studio-mod-element" style={style}>
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
 
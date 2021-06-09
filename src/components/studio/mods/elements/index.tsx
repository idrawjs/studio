import * as React from 'react';
import { List } from 'antd';
import classnames from 'classnames';
import {
  TypeElement, TypeElemDesc
} from '@idraw/types';


type TypeProps = {
  elements: TypeElement<keyof TypeElemDesc>[]
  selectedUUID: string
}

const Elements = (props: TypeProps) => {

  const { elements, selectedUUID } = props;

  return (
    <div className="idraw-studio-element">
      <List
        size="small"
        dataSource={elements}
        renderItem={(item) => {
          return (
          <List.Item>
            <span
              className={classnames({
                'idraw-studio-element-item': true,
                'element-item-active': item.uuid === selectedUUID
              })}
            >
              {item.name || 'Unnamed'}
            </span>
          </List.Item>)
        }}
      />
    </div>
  )
}

export default Elements
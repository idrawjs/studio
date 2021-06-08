import * as React from 'react';
import { List } from 'antd';
import {
  TypeElement, TypeElemDesc
} from '@idraw/types';


type TypeProps = {
  elements: TypeElement<keyof TypeElemDesc>[]
  selectedUUID?: string
}

const Elements = (props: TypeProps) => {

  const { elements } = props;

  return (
    <div>
      <List
        size="small"
        dataSource={elements}
        renderItem={(item) => {
          return (<List.Item>{item.name || 'Unnamed'}</List.Item>)
        }}
      />
    </div>
  )
}

export default Elements
import * as React from 'react';
import { TypeElement, TypeElemDesc } from '@idraw/types';
import util from '@idraw/util';
import { List } from 'antd';
import { StudioContext } from './../../context';
import { Item } from './item';

const { useContext } = React;

type TypeProps = {
  maxHeight?: number;
};

export const Elements = (props: TypeProps) => {
  const context = useContext(StudioContext);
  const { data } = context;
  const style: React.HTMLAttributes<HTMLDivElement>['style'] = {};
  if (props.maxHeight > 0) {
    style.maxHeight = props.maxHeight;
    style.height = props.maxHeight;
  }

  return (
    <div className="idraw-studio-mod-element" style={style}>
      <List
        size="small"
        dataSource={util.deepClone(data.elements).reverse()}
        renderItem={(item, index) => {
          const elem = item as TypeElement<keyof TypeElemDesc>;
          return (
            <List.Item>
              <Item element={elem} index={index} total={data.elements.length} />
            </List.Item>
          );
        }}
      />
    </div>
  );
};

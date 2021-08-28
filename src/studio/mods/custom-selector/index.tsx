import * as React from 'react';
import { Selector, TypeSelectDataItem } from '../selector';


type TypeProps = {
  dataList: TypeSelectDataItem[],
  current?: number,
  pageSize?: number,
  total?: number,
  onChange?: (page: number) => void;
}

export function CustomSelector(props: TypeProps) {
  const { dataList } = props;
  return (
    <div>
      <Selector dataList={dataList} />
    </div>
  )
}

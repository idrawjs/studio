import * as React from 'react';
import { Pagination } from 'antd';
import { Selector, TypeMaterialItem } from '../selector';


type TypeProps = {
  dataList: TypeMaterialItem[],
  current?: number,
  pageSize?: number,
  total?: number,
  onChange?: (page: number) => void;
}

export function CustomSelector(props: TypeProps) {
  const { dataList } = props;
  return (
    <div className="idraw-studio-custom-selector">
      <Selector dataList={dataList} />
      <div className="custom-selector-pagination">
        <Pagination size="small" 
          total={150} pageSize={10} showSizeChanger={false}
          simple={true}
        />
      </div>
    </div>
  )
}

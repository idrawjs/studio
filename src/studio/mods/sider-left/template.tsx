import * as React from 'react';
import { TypeDataBase } from '@idraw/types';


type TypeTheme = {
  name: string,
  key: string,
  data: TypeDataBase,
}

type TypeProps = {
  width: number,
  customTemplates?: TypeTheme[],
  customTemplatesPagination?: {
    current: number,
    pageSize: number,
    total: number,
    onChange: (page: number) => void;
  }
}

const dataList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export function Templates(props: TypeProps) {

  return (
    <div style={{width: props.width}} className="idraw-studio-siderleft-templates">
      <div className="studio-templates-list">
        {dataList.map((item, i) => {
          console.log('item ===', item);
          return (
            <div key={i} className="studio-templates-item">
              
            </div>
          )
        })}
      </div>
    </div>
  )
}

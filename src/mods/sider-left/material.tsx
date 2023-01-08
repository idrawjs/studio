import * as React from 'react';
import { Collapse } from 'antd';
// import { DoubleLeftOutlined } from '@ant-design/icons';
import { Selector } from '../selector';
import { TypeMaterial } from '../../types';
import { CustomSelector } from '../custom-selector';
// import eventHub from './../../util/event-hub';
import { generalDataList } from './data/general';
import { iconDataList } from './data/icon';

const { Panel } = Collapse;

type TypeProps = {
  width: number,
  customMaterials?: TypeMaterial[],
  customMaterialsPagination?: {
    current: number,
    pageSize: number,
    total: number,
    onChange: (page: number) => void;
  }
}

export function Materials(props: TypeProps) {

  return (
    <div style={{width: props.width}} >
      <Collapse
        bordered={false} 
        defaultActiveKey={['general', 'icon', 'custom']}
        expandIconPosition={'end'}
        className="idraw-studio-siderleft-collapse"
      >
        <Panel header="General" key="general" className="idraw-studio-siderleft-panel">
          <Selector dataList={generalDataList} />
        </Panel>
        <Panel header="Icon" key="icon" className="idraw-studio-siderleft-panel">
          <Selector dataList={iconDataList} />
        </Panel>
        {Array.isArray(props.customMaterials) && (
          <Panel header="Custom" key="custom" className="idraw-studio-siderleft-panel" >
            <CustomSelector
              dataList={props.customMaterials}
              {...(props.customMaterialsPagination || {})}
            />
          </Panel>
        )}
      </Collapse>
    </div>
  )
}

import * as React from 'react';
import { Layout, Collapse } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Selector, TypeSelectDataItem } from '../selector';
import { CustomSelector } from '../custom-selector';
import eventHub from './../../util/event-hub';
import { generalDataList } from './data/general';
import { iconDataList } from './data/icon';

const { Panel } = Collapse;
const { Sider } = Layout;

type TypeProps = {
  width: number,
  customElements?: TypeSelectDataItem[],
  customElementsPagination?: {
    current: number,
    pageSize: number,
    total: number,
    onChange: (page: number) => void;
  }
}

export function SiderLeft(props: TypeProps) {

  return (
    <Sider width={props.width} className="idraw-studio-siderleft">
      <div className="idraw-studio-siderleft-header">
        <DoubleLeftOutlined
          className="studio-siderleft-header-icon  siderleft-close-btn"
          onClick={() => {
            eventHub.trigger('studioCloseLeftSider', true);
          }}
        />
      </div>
      <Collapse
        bordered={false} 
        defaultActiveKey={['general', 'icon', 'custom']}
        expandIconPosition={'right'}
        className="idraw-studio-siderleft-collapse"
      >
        <Panel header="General" key="general" className="idraw-studio-siderleft-panel">
          <Selector dataList={generalDataList} />
        </Panel>
        <Panel header="Icon" key="icon" className="idraw-studio-siderleft-panel">
          <Selector dataList={iconDataList} />
        </Panel>
        {Array.isArray(props.customElements) && (
          <Panel header="Custom" key="custom" className="idraw-studio-siderleft-panel" >
            <CustomSelector
              dataList={props.customElements}
              {...(props.customElementsPagination || {})}
            />
          </Panel>
        )}
      </Collapse>
    </Sider>
  )
}


export function SiderLeftBtn(props: { style?: React.HTMLAttributes<HTMLDivElement>['style'] }) {
  return (
    <div
      style={props.style}
      className="idraw-studio-siderleft-open-btn"
      onClick={() => {
        eventHub.trigger('studioCloseLeftSider', false);
      }}
    >
      <DoubleRightOutlined
        className="siderleft-open-btn-icon"
      />
    </div>
  )
}
 
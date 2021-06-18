import * as React from 'react';
import { Layout, Collapse } from '../../../ui/antd';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import eventHub from './../../util/event-hub';

const { Panel } = Collapse;
const { Sider } = Layout;

type TypeProps = {
  width: number
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
        defaultActiveKey={['1', '2']}
        expandIconPosition={'right'}
        className="idraw-studio-siderleft-collapse"
      >
        <Panel header="001" key="1" className="idraw-studio-siderleft-panel">
          001
        </Panel>
        <Panel header="002" key="2" className="idraw-studio-siderleft-panel" >
          002
        </Panel>
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
        onClick={() => {
          eventHub.trigger('studioCloseLeftSider', true);
        }}
      />
    </div>
  )
}
 
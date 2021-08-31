import * as React from 'react';
import { Layout } from 'antd';
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import { TypeSelectDataItem } from '../selector'; 
import eventHub from './../../util/event-hub'; 
import { SiderMaterial } from './material';
 
const { Sider, Content } = Layout;

type TypeProps = {
  close: boolean;
  width: number,
  asideLayout: { width: number }
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
      <Layout style={{
        height: '100%',
        overflow: 'auto'
      }}>
        <Sider width={props.asideLayout.width} className="idraw-studio-siderleft-aside">
          aside
        </Sider>
        <Content style={{
          height: '100%',
          overflow: 'auto'
        }}>
          <SiderMaterial 
            width={props.width - props.asideLayout.width}
            customElements={props.customElements}
            customElementsPagination={props.customElementsPagination}
          />
        </Content>
      </Layout>
      <div className="idraw-studio-siderleft-closebtn" onClick={() => {
        eventHub.trigger('studioCloseLeftSider', !props.close);
      }}>
        {props.close === true ? (
          <DoubleRightOutlined />
        ) : (
          <DoubleLeftOutlined />
        )}
      </div>
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
 
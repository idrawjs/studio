import * as React from 'react';
import { Layout } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';
import { TypeSelectDataItem } from '../selector'; 
import eventHub from './../../util/event-hub'; 
import { SiderMaterial } from './material';
 
const { Sider, Content } = Layout;

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

const asideLayout = {
  width: 50
};

export function SiderLeft(props: TypeProps) {

  return (
    <Sider width={props.width} className="idraw-studio-siderleft">
      <Layout style={{
        height: '100%',
        overflow: 'auto'
      }}>
        <Sider width={asideLayout.width} className="idraw-studio-siderleft-aside">
          aside
        </Sider>
        <Content style={{
          height: '100%',
          overflow: 'auto'
        }}>
          <SiderMaterial 
             width={props.width - asideLayout.width}
             customElements={props.customElements}
             customElementsPagination={props.customElementsPagination}
          />
        </Content>
      </Layout>
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
 
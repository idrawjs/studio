import * as React from 'react';
import { Layout, Menu } from 'antd';
import StudioHeader from './mods/header';
import SiderLeft from './mods/sider-left';
import SiderRight from './mods/sider-right';

const { SubMenu } = Menu;
const {Content, Sider } = Layout;

type TypeProps = {
  customStyle?: React.HTMLAttributes<HTMLDivElement>['style']
}

function Studio(props: TypeProps) {

  return (
    <div className="studio-container" style={props.customStyle}>
      <Layout style={{height: '100%'}}>
        <StudioHeader />
        <Layout>
          <SiderLeft />
          <Content
            className="site-layout-background"
            style={{}} >
            Content
          </Content>
          <SiderRight />
        </Layout>
      </Layout>

    </div>
  )
}

export default Studio
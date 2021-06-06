import * as React from 'react';
import { Layout } from 'antd';
import StudioHeader from './mods/header';
import SiderLeft from './mods/sider-left';
import SiderRight from './mods/sider-right';
import StudioContent from './mods/content';

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
          <StudioContent />
          <SiderRight />
        </Layout>
      </Layout>

    </div>
  )
}

export default Studio
import * as React from 'react';
import { Layout } from 'antd';
import StudioHeader from './mods/header';
import SiderLeft from './mods/sider-left';
import SiderRight from './mods/sider-right';
import StudioContent from './mods/content';
import { layoutConfig } from './layout';

type TypeProps = {
  width?: number;
  height?: number;
}


function Studio(props: TypeProps) {

  return (
    <div className="studio-container" 
      style={createStyle(props)}
    >
      <Layout style={{height: '100%'}}>
        <StudioHeader height={layoutConfig.header.height} />
        <Layout>
          <SiderLeft width={layoutConfig.siderLeft.width} />
          <StudioContent
            width={props.width - layoutConfig.siderLeft.width - layoutConfig.siderRight.width}
            height={props.height - layoutConfig.header.height}
          />
          <SiderRight width={layoutConfig.siderRight.width} />
        </Layout>
      </Layout>

    </div>
  )
}

function createStyle(
  props: TypeProps
): React.HTMLAttributes<HTMLDivElement>['style'] {
  const style = {
    width: 800,
    height: 600,
  };
  if (props.width > 0) {
    style.width = props.width;
  }
  if (props.height > 0) {
    style.height = props.height;
  }
  return style;
}

export default Studio
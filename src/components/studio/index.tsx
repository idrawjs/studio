import * as React from 'react';
import { Layout } from 'antd';
import { TypeData } from '@idraw/types';
import StudioHeader from './mods/header';
import SiderLeft from './mods/sider-left';
import SiderRight from './mods/sider-right';
import StudioContent from './mods/content';
import { layoutConfig } from './layout';
import eventHub from './util/event-hub';

const { useState, useEffect } = React;

type TypeProps = {
  width?: number;
  height?: number;
  data?: TypeData;
}

function Studio(props: TypeProps) {

  const [data, setData] = useState<TypeData>({elements: []});
  const [selectedElementUUID, setSelectedElementUUID] = useState<string>('');

  useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
    eventHub.on('selectElement', (uuid) => {
      setSelectedElementUUID(uuid);
      console.log('selectedElementUUID ===', selectedElementUUID);
    });
  }, [selectedElementUUID]);

  return (
    <div className="studio-container" 
      style={createStyle(props)}
    >
      <Layout style={{height: '100%'}}>
        <StudioHeader height={layoutConfig.header.height} />
        <Layout>
          <SiderLeft width={layoutConfig.siderLeft.width} />
          <StudioContent
            data={props.data}
            width={props.width - layoutConfig.siderLeft.width - layoutConfig.siderRight.width}
            height={props.height - layoutConfig.header.height}
          />
          <SiderRight
            width={layoutConfig.siderRight.width}
            data={data}
            selectedElementUUID={selectedElementUUID}
          />
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
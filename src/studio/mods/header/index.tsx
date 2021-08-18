import * as React from 'react';
import { Layout, Input } from 'antd';
import { Box } from './box';
import { ZoomAction } from './zoom';
import { RecordAction } from './record';


const { Header, } = Layout;

type TypeProps = {
  height: number;
}

export function StudioHeader(props: TypeProps) {

  return (
    <Header className="idraw-studio-header"
      style={{height: props.height}}
    >
      <ZoomAction />
      <RecordAction />
      <Box>
        <div>
          <Input size="small" />
        </div>
        <div>
          <Input size="small" />
        </div>
      </Box>
    </Header>
  )
}

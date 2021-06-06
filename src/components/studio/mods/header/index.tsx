import * as React from 'react';
import { Layout } from 'antd';
const { Header, } = Layout;

type TypeProps = {
  height: number;
}

function StudioHeader(props: TypeProps) {
  return (
    <Header className="idraw-studio-header"
      style={{height: props.height}}
    >
      header
    </Header>
  )
}

export default StudioHeader
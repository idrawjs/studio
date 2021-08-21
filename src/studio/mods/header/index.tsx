import * as React from 'react';
import { Layout } from 'antd';
import { ZoomAction } from './zoom';
import { RecordAction } from './record';
import { SizeAction } from './size';
import { DownloadAction } from './download';

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
      <SizeAction />
      <DownloadAction />
    </Header>
  )
}

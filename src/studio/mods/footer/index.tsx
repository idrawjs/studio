import * as React from 'react';
import { Layout } from 'antd';

const { Footer, } = Layout;

type TypeProps = {
  height: number;
}

export function StudioFooter(props: TypeProps) {

  return (
    <Footer className="idraw-studio-footer" style={{height: props.height}}>
      {/* footer */}
    </Footer>
  )
}

 
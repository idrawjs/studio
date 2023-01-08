import * as React from 'react';
import { Layout } from 'antd';

const { Footer, } = Layout;

type TypeProps = {
  height: number;
}

export function StudioFooter(props: TypeProps) {

  return (
    <Footer className="idraw-studio-footer" style={{
        ...{
          background: '#ffffff',
          borderTop: '1px solid #dadce0',
          height: 40,  padding: 0,
          display: 'flex',
          flexDirection: 'row',
        },
        ...{
          height: props.height, 
          padding: 0
        }
      }}>
      {/* footer */}
    </Footer>
  )
}

 
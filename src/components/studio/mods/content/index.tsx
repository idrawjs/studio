import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Layout } from 'antd'; 
import IDraw from 'idraw';
import { TypeData } from '@idraw/types';


const { Content } = Layout;

type TypeProps = {
  height: number;
  width: number;
  data?: TypeData;
}

function StudioContent(props: TypeProps) {

  const mount = useRef(null);

  useEffect(() => {
    const mountDiv = mount.current as HTMLDivElement;
    const idraw = new IDraw(mountDiv, {
      width: props.width,
      height: props.height,
      devicePixelRatio: 4,
    }, {});
    if (props.data) {
      idraw.initData(props.data);
    }
    idraw.draw();
  }, []);

  return (
    <Content >
      <div style={{
        width: props.width,
        height: props.height,
      }} ref={mount}></div>
    </Content>
  )
}

export default StudioContent
import * as React from 'react';
import { useEffect, useRef, useCallback } from 'react';
import IDraw from 'idraw';
import { TypeData } from '@idraw/types';
import { Layout } from '../../../ui/antd'; 
import eventHub from '../../util/event-hub';
import ScrollBox from './scroll-box';

const { Content } = Layout;

type TypeProps = {
  height: number;
  width: number;
  contextWidth: number;
  contextHeight: number;
  data?: TypeData;
}

function StudioContent(props: TypeProps) {

  const mount = useRef(null);
  
  useEffect(() => {
    const mountDiv = mount.current as HTMLDivElement;
    const idraw = new IDraw(mountDiv, {
      width: props.width,
      height: props.height,
      contextWidth: props.contextWidth,
      contextHeight: props.contextHeight,
      devicePixelRatio: 4,
    }, {});

    idraw.on('changeData', (data) => {
      eventHub.trigger('studioChangeData', data);
    });
    idraw.on('screenSelectElement', (elem) => {
      eventHub.trigger('studioSelectElement', elem.uuid)
    });
    
    eventHub.on('studioScaleScreen', (num) => {
      idraw.scale(num);
      idraw.draw();
    });
    eventHub.on('studioSelectElement', (uuid: string) => {
      idraw.selectElementByUUID(uuid);
    });
    if (props.data) {
      idraw.initData(props.data);
    }
    const screenInfo = idraw.scale(1);
    console.log('screenInfo ====', screenInfo);
    idraw.draw();
  }, []);

  return (
    <Content className="idraw-studio-content">
      <ScrollBox
        onScrollX={() => {

        }}
        onScrollY={() => {
          
        }}
      >
        <div style={{
          width: props.width,
          height: props.height,
        }} ref={mount}></div>
      </ScrollBox>
    </Content>
  )
}


export default StudioContent
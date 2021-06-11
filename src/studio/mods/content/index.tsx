import * as React from 'react';
import { useEffect, useRef, useState, useContext } from 'react';
import IDraw from 'idraw';
import { TypeData, TypeScreenPosition } from '@idraw/types';
import { Layout } from '../../../ui/antd'; 
import eventHub from '../../util/event-hub';
import ScrollBox from './scroll-box';
import { StudioContext } from './../../context';

const { Content } = Layout;

type TypeProps = {
  height: number;
  width: number;
  contextWidth: number;
  contextHeight: number;
}

function StudioContent(props: TypeProps) {
  const context = useContext(StudioContext);
  const { data } = context;
  const { width, height } = props;
  const mount = useRef(null);
  const [idraw, setIDraw] = useState<IDraw>(null);
  const [position, setPosition] = useState<TypeScreenPosition>({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  })
  
  useEffect(() => {
    const mountDiv = mount.current as HTMLDivElement;
    const idraw = new IDraw(mountDiv, {
      width: width,
      height: height,
      contextWidth: props.contextWidth,
      contextHeight: props.contextHeight,
      devicePixelRatio: 4,
    }, {});
    setIDraw(idraw);

    idraw.on('changeData', (data) => {
      eventHub.trigger('studioChangeData', data);
    });
    idraw.on('screenSelectElement', (elem) => {
      eventHub.trigger('studioSelectElement', elem.uuid)
    });
    
    // studio event
    eventHub.on('studioScaleScreen', (num) => {
      const screenInfo = idraw.scale(num);
      // console.log('screenInfo ===', screenInfo);
      setPosition(screenInfo.position);
      idraw.draw();
    });
    eventHub.on('studioSelectElement', (uuid: string) => {
      idraw.selectElementByUUID(uuid);
    });

    if (data) {
      idraw.initData(data);
    }
    const screenInfo = idraw.scale(1);
    setPosition(screenInfo.position);
    idraw.draw();
  }, []);

  return (
    <Content className="idraw-studio-content">
      <ScrollBox
        width={width}
        height={height}
        position={position}
        onScrollX={(scrollX: number) => {
          idraw.scrollX(scrollX);
          idraw.draw();
        }}
        onScrollY={(scrollY: number) => {
          idraw.scrollY(scrollY);
          idraw.draw();
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
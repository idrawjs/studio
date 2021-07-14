import * as React from 'react';
import { useEffect, useRef, useContext, useCallback } from 'react';
import IDraw from 'idraw';
// import { TypeData, TypeScreenPosition } from '@idraw/types';
import { Layout } from '../../../ui/antd'; 
import eventHub from '../../util/event-hub';
// import ScrollBox from './scroll-box';
import { StudioContext } from './../../context';
import { onDragOver } from './../../mods/global';

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
  
  useEffect(() => {
    const mountDiv = mount.current as HTMLDivElement;
    const idraw = new IDraw(mountDiv, {
      width: width,
      height: height,
      contextWidth: props.contextWidth,
      contextHeight: props.contextHeight,
      devicePixelRatio: 4,
    }, {
      scrollWrapper: {
        use: true,
        color: '#bbbbbb',
        lineWidth: 10,
      }
    });
    // setIDraw(idraw);

    idraw.on('changeData', (data) => {
      eventHub.trigger('studioChangeData', data);
    });

    idraw.on('screenSelectElement', (elem) => {
      idraw.selectElementByUUID(elem.uuid, {
        useMode: true,
      });
      eventHub.trigger('studioSelectElement', {
        uuid: elem.uuid,
        useMode: true,
      })
    });
    
    // studio event
    eventHub.on('studioScaleScreen', (num) => {
      idraw.scale(num);
      idraw.draw();
    });
    eventHub.on('studioSelectElement', (data) => {
      idraw.selectElementByUUID(data.uuid, { useMode: data.useMode });
    });
    eventHub.on('studioUpdateElement', (elem) => {
      idraw.updateElement(elem);
    });
    eventHub.on('studioDeleteElement', (uuid: string) => {
      idraw.deleteElement(uuid);
    });
    eventHub.on('studioIDrawResetWidth', (width: number) => {
      idraw.resetSize({ width })
    });
    eventHub.on('studioDragNewElement', (params) => {
      const { clientX, clientY, element } = params;
      const mountDOM = mount.current as HTMLDivElement;
      const mountRect = mountDOM.getBoundingClientRect();
      const dragX = clientX - mountRect.x;
      const dragY = clientY - mountRect.y;

      element.x = dragX;
      element.y = dragY;
      
      // TODO
      console.log({dragX, dragY});

      idraw.addElement(element);
    });

    eventHub.on('studioUndo', () => {
      return idraw.undo();
    });
    eventHub.on('studioRedo', () => {
      return idraw.redo();
    })

    if (data) {
      idraw.initData(data);
    }
    idraw.scale(1);
    idraw.draw();
  }, []);

  const onDragFeekback = useCallback(() => {
    // e.preventDefault();
  }, [])

  return (
    <Content className="idraw-studio-content">
      <div style={{
          width: props.width,
          height: props.height,
        }} ref={mount}
        onDrop={onDragFeekback}
        onDragOver={onDragOver}
      ></div>
    </Content>
  )
}


export default StudioContent
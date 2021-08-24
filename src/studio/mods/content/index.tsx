import * as React from 'react';
import { useEffect, useRef, useState, useContext, useCallback } from 'react';
import iDraw from 'idraw';
import { TypeElement } from '@idraw/types';
import { Layout } from 'antd'; 
import eventHub from '../../util/event-hub';
import { StudioContext } from './../../context';
import { onDragOver } from './../../mods/global';
import { showExportImage } from './../dialog';
import { TextMask } from './../mask';

const { Content } = Layout;

type TypeProps = {
  height: number;
  width: number;
  contextWidth: number;
  contextHeight: number;
  devicePixelRatio: number;
}

function StudioContent(props: TypeProps) {
  const context = useContext(StudioContext);
  const { data } = context;
  const { width, height } = props;
  const mount = useRef(null); 
  const [ textElem, setTextElem ] = useState<TypeElement<'text'>|null>(null);
  const [idrawObj, setIDrawObj] = useState<iDraw|null>(null)
  
  useEffect(() => {
    const mountDiv = mount.current as HTMLDivElement;
    const idraw = new iDraw(mountDiv, {
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
    setIDrawObj(idraw);

    idraw.on('changeData', (data) => {
      eventHub.trigger('studioChangeData', data);
    });

    // idraw.on('changeScreen', (data) => {
    //   console.log('xxxx changeScreen = ', data)
    // });

    idraw.on('screenSelectElement', (elem) => {
      idraw.selectElement(elem.uuid, {
        useMode: true,
      });
      eventHub.trigger('studioSelectElement', {
        uuid: elem.uuid,
        useMode: true,
      })
    });
    idraw.on('screenDoubleClickElement', (data) => {
      if (data.element?.type === 'text') {
        const elem = data.element as TypeElement<'text'>;
        setTextElem(elem);
      }
    })
    
    // studio event
    eventHub.on('studioScaleScreen', (num) => {
      idraw.scale(num);
    });
    eventHub.on('studioSelectElement', (data) => {
      idraw.selectElement(data.uuid, { useMode: data.useMode });
    });
    eventHub.on('studioUpdateElement', (elem) => {
      idraw.updateElement(elem);
    });
    eventHub.on('studioDeleteElement', (uuid: string) => {
      idraw.deleteElement(uuid);
    });
    eventHub.on('studioMoveUpElement', (uuid: string) => {
      idraw.moveUpElement(uuid);
    });
    eventHub.on('studioMoveDownElement', (uuid: string) => {
      idraw.moveDownElement(uuid);
    });
    eventHub.on('studioIDrawResetWidth', (width: number) => {
      idraw.resetSize({ width })
    });
    eventHub.on('studioIDrawResetContextSize', (size: { width: number, height: number }) => {
      idraw.resetSize({
        contextWidth: size.width,
        contextHeight: size.height,
      })
    })
    eventHub.on('studioDragNewElement', (params) => {
      const { clientX, clientY, element } = params;
      const mountDOM = mount.current as HTMLDivElement;
      const mountRect = mountDOM.getBoundingClientRect();
      const dragX = clientX - mountRect.x;
      const dragY = clientY - mountRect.y;

      const ctxPoint = idraw.pointScreenToContext({ x: dragX, y: dragY })
      element.x = ctxPoint.x;
      element.y = ctxPoint.y;

      idraw.addElement(element);
    });

    eventHub.on('studioUndo', () => {
      const { data, doRecordCount } = idraw.undo();
      if (data) {
        eventHub.trigger('studioChangeData', data);
      }
      return doRecordCount;
    });
    eventHub.on('studioRedo', () => {
      const { data, undoRecordCount } = idraw.redo();
      if (data) {
        eventHub.trigger('studioChangeData', data);
      }
      return undoRecordCount;
    })
    eventHub.on('studioExportImage', () => {
      showExportImage({ idraw })
    });

    if (data) {
      idraw.setData(data, { 
        triggerChangeEvent: true
      });
    }
    idraw.scale(1);
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
      {textElem !== null && (
        <TextMask element={textElem} idraw={idrawObj} onCloseMask={() => {
          setTextElem(null);
        }} />
      )}
    </Content>
  )
}


export default StudioContent
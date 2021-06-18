import * as React from 'react';
import { Layout } from '../ui/antd';
import { TypeData } from '@idraw/types';
import { StudioHeader } from './mods/header';
import { StudioFooter } from './mods/footer';
import { SiderLeft, SiderLeftBtn } from './mods/sider-left';
import SiderRight from './mods/sider-right';
import StudioContent from './mods/content';
import { layoutConfig } from './layout';
import eventHub from './util/event-hub';
import { StudioContext } from './context';

const { useState, useEffect } = React;


type TypeProps = {
  studioWidth?: number;
  studioHeight?: number;
  contextWidth?: number;
  contextHeight?: number;
  data?: TypeData;
}

function Studio(p: TypeProps) {

  const props = createProps(p);
  const contentSize = createContentSize(props);

  const [data, setData] = useState<TypeData>(props.data || {elements: []});
  const [selectedElementUUID, setSelectedElementUUID] = useState<string>('');
  const [contentWidth, setContentWidth] = useState(contentSize.width);
  const [closeSiderLeft, setCloseSiderLeft] = useState(false);
  const [closeSiderRight, setCloseSiderRight] = useState(false);

  useEffect(() => {
    eventHub.on('studioSelectElement', (data) => {
      setSelectedElementUUID(data.uuid);
    });
    eventHub.on('studioChangeData', (data) => {
      setData(data);
    });
    eventHub.on('studioCloseLeftSider', (status: boolean) => {
      const newContentWidth = calcContentWidth(props, { closeSiderLeft: status,  closeSiderRight});
      setCloseSiderLeft(status);
      setContentWidth(newContentWidth);
      console.log('newContentWidth ===', status, newContentWidth);
      eventHub.trigger('studioIDrawResetWidth', newContentWidth);
    });
    eventHub.on('studioCloseRightSider', (status: boolean) => {
      const newContentWidth = calcContentWidth(props, { closeSiderLeft,  closeSiderRight: status});
      setCloseSiderRight(status);
      setContentWidth(newContentWidth);
    });
  }, []);

  return (
    <StudioContext.Provider value={{
      data,
      selectedElementUUID,
    }}>
      <div className="studio-container" 
        style={createStyle(props)}
      >
        <Layout style={{height: '100%'}}>
          <StudioHeader height={layoutConfig.header.height} />
          <Layout style={{position: 'relative'}}>
            {closeSiderLeft && (
              <SiderLeftBtn style={{position: 'absolute', left: 0, top: 0, zIndex: 1,}} />
            )}
            <SiderLeft
              width={closeSiderLeft ? 0 : layoutConfig.siderLeft.width}
              // height={contentSize.height}
            />
            <StudioContent
              width={contentWidth}
              height={contentSize.height}
              contextWidth={contentSize.contextWidth}
              contextHeight={contentSize.contextHeight}
            />
            <SiderRight
              width={closeSiderRight ? 0 : layoutConfig.siderRight.width}
              height={contentSize.height}
            />
          </Layout>
          <StudioFooter height={layoutConfig.footer.height}/>
        </Layout>
      </div>
    </StudioContext.Provider>
  )
}

function createStyle(
  props: TypeProps
): React.HTMLAttributes<HTMLDivElement>['style'] {
  const style: React.HTMLAttributes<HTMLDivElement>['style'] = {};
  if (props.studioWidth > 0) {
    style.width = props.studioWidth;
  }
  if (props.studioHeight > 0) {
    style.height = props.studioHeight;
  }
  return style;
}

function createProps (props: TypeProps) {
  const defaultProps: TypeProps = {
    studioWidth: 960,
    studioHeight: 720,
    contextWidth: 400,
    contextHeight: 300,
  };
  return {
    ...defaultProps,
    ...props
  }
}

function createContentSize(props: TypeProps) {
  const width = props.studioWidth - layoutConfig.siderLeft.width - layoutConfig.siderRight.width
  const height = props.studioHeight - layoutConfig.header.height - layoutConfig.footer.height;
  const contextWidth = props.contextWidth || width;
  const contextHeight = props.contextHeight || height;
  return {
    width,
    height,
    contextWidth,
    contextHeight
  }
}

function calcContentWidth(
  props: TypeProps,
  opts: { closeSiderLeft: boolean, closeSiderRight: boolean
}): number {
  let contentWidth = props.studioWidth;
  if (opts.closeSiderLeft !== true) {
    contentWidth = contentWidth - layoutConfig.siderLeft.width;
  }
  if (opts.closeSiderRight !== true) {
    contentWidth = contentWidth - layoutConfig.siderRight.width;
  }
  return contentWidth;
}

export default Studio
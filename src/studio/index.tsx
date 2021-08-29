import * as React from 'react';
import { Layout } from 'antd';
import { TypeDataBase, TypeData, } from '@idraw/types';
import { StudioHeader } from './mods/header';
import { StudioFooter } from './mods/footer';
import { SiderLeft, SiderLeftBtn } from './mods/sider-left';
import { SiderRight, SiderRightBtn } from './mods/sider-right';
import StudioContent from './mods/content';
import { layoutConfig } from './layout';
import eventHub from './util/event-hub';
import { StudioContext, TypeContextData } from './context';
import { initData } from './util/data';
import { TypeSelectDataItem } from './mods/selector';

const { useState, useEffect } = React;


type TypeProps = {
  studioWidth?: number;
  studioHeight?: number;
  contextWidth?: number;
  contextHeight?: number;
  devicePixelRatio?: number;
  data?: TypeDataBase | TypeData;
  customElements?: TypeSelectDataItem[],
  customElementsPagination?: {
    current: number,
    pageSize: number,
    total: number,
    onChange: (page: number) => void;
  }
}

function Studio(p: TypeProps) {

  const props = createProps(p);
  const contentSize = createContentSize(props);

  const [data, setData] = useState<TypeData>(initData(props.data || {elements: []}));
  const [selectedElementUUID, setSelectedElementUUID] = useState<string>('');
  const [contextSize, setContextSize] = useState<TypeContextData['contextSize']>({
    width: contentSize.contextWidth,
    height: contentSize.contextHeight,
  })
  

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
    eventHub.on('studioCloseLeftSider', ((status: boolean) => {
      setCloseSiderLeft(status);
    }));
    eventHub.on('studioCloseRightSider', (status: boolean) => {
      setCloseSiderRight(status);
    });
    eventHub.on('studioIDrawResetContextSize', (size: { width: number, height: number }) => {
      setContextSize(size);
    });
  }, []);

  useEffect(() => {
    eventHub.trigger('studioIDrawResetWidth', contentWidth);
  }, [contentWidth]);

  useEffect(() => {
    const newContentWidth = calcContentWidth(props, { closeSiderLeft,  closeSiderRight});
    setContentWidth(newContentWidth);
  }, [closeSiderLeft,  closeSiderRight]);

  return (
    <StudioContext.Provider value={{
      data,
      selectedElementUUID,
      contextSize,
    }}>
      <div className="studio-container" 
        style={createStyle(props)}
      >
        <Layout style={{height: '100%'}}>
          <StudioHeader 
            height={layoutConfig.header.height}
          />
          <Layout style={{position: 'relative'}}>
            <SiderLeft
              width={closeSiderLeft ? 0 : layoutConfig.siderLeft.width}
              // height={contentSize.height}
              customElements={props.customElements}
              customElementsPagination={props.customElementsPagination}
            />
            <StudioContent
              width={contentWidth}
              height={contentSize.height}
              contextWidth={contentSize.contextWidth}
              contextHeight={contentSize.contextHeight}
              devicePixelRatio={props.devicePixelRatio}
            />
            <SiderRight
              width={closeSiderRight ? 0 : layoutConfig.siderRight.width}
              height={contentSize.height}
            />
            {closeSiderLeft && (
              <SiderLeftBtn style={{position: 'absolute', left: 10, top: 10, zIndex: 1,}} />
            )}
            {closeSiderRight && (
              <SiderRightBtn style={{position: 'absolute', right: 10, top: 10, zIndex: 1,}} />
            )}
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
    devicePixelRatio: 2,
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
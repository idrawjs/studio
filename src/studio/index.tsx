import * as React from 'react';
import { Layout } from '../ui/antd';
import { TypeData } from '@idraw/types';
import { StudioHeader } from './mods/header';
import { StudioFooter } from './mods/footer';
import { SiderLeft } from './mods/sider-left';
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

  const [data, setData] = useState<TypeData>(props.data || {elements: []});
  const [selectedElementUUID, setSelectedElementUUID] = useState<string>('');

  const contentSize = createContentSize(props);

  useEffect(() => {
    eventHub.on('studioSelectElement', (data) => {
      setSelectedElementUUID(data.uuid);
    });
    eventHub.on('studioChangeData', (data) => {
      setData(data);
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
          <Layout>
            <SiderLeft width={layoutConfig.siderLeft.width} />
            <StudioContent
              width={contentSize.width}
              height={contentSize.height}
              contextWidth={contentSize.contextWidth}
              contextHeight={contentSize.contextHeight}
            />
            <SiderRight
              width={layoutConfig.siderRight.width}
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

export default Studio
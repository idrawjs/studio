import React, { useState, useCallback, useContext } from 'react';
import { Layout, Collapse, Tag } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Elements } from '../elements';
import { Attribute } from '../attribute';
import { Description } from '../description';
import eventHub from './../../util/event-hub';
import { getSelectedElement } from './../../util/data';
import { StudioContext } from './../../context';

const { Panel } = Collapse;
const { Sider } = Layout;
type TypeProps = {
  close: boolean;
  width: number;
  height: number;
};

const panelHeaderHeight = 30;
const siderHeaderHeight = 24;

const descTagColorMap = {
  text: 'magenta',
  rect: 'volcano',
  circle: 'green',
  image: 'blue',
  svg: 'geekblue',
  html: 'purple',
  _: 'default'
};

export function SiderRight(props: TypeProps) {
  const { width, height } = props;
  const panelContentMaxHeight =
    (height - siderHeaderHeight) / 2 - panelHeaderHeight;
  const [elemMaxHeight, setElemMaxHeight] = useState(panelContentMaxHeight);
  const [descMaxHeight, setDescMaxHeight] = useState(panelContentMaxHeight);
  const { selectedElementUUID, data } = useContext(StudioContext);

  const selectedElement = getSelectedElement(selectedElementUUID, data);

  const onCollapseChange = useCallback(
    (key: string | string[]) => {
      let keys: string[] = [];
      if (typeof key === 'string') {
        keys.push(key);
      } else if (Array.isArray(key)) {
        keys = key;
      }
      if (keys.length > 0) {
        const maxHeight =
          (height - siderHeaderHeight - panelHeaderHeight * 2) / keys.length;
        if (keys.includes('elements')) {
          setElemMaxHeight(maxHeight);
        }
        if (keys.includes('description')) {
          setDescMaxHeight(maxHeight);
        }
      }
    },
    [elemMaxHeight, descMaxHeight]
  );

  return (
    <Sider width={width} className="idraw-studio-siderright">
      <Collapse
        bordered={false}
        defaultActiveKey={['elements', 'description']}
        expandIconPosition={'end'}
        className="idraw-studio-siderright-collapse"
        onChange={onCollapseChange}
      >
        <Panel
          header="Elements"
          key="elements"
          className="idraw-studio-siderright-panel"
        >
          <Elements maxHeight={elemMaxHeight} />
        </Panel>
        <Panel
          header={
            <>
              <span style={{ marginRight: 4 }}>Description</span>
              {selectedElement?.type && (
                <Tag
                  color={
                    descTagColorMap[selectedElement?.type] ||
                    descTagColorMap['_']
                  }
                >
                  {selectedElement?.type}
                </Tag>
              )}
            </>
          }
          key="description"
          className="idraw-studio-siderright-panel"
        >
          <div style={{ height: descMaxHeight - 4, overflow: 'scroll' }}>
            <Attribute />
            <Description />
          </div>
        </Panel>
      </Collapse>
      <div
        className="idraw-studio-siderright-closebtn"
        onClick={() => {
          eventHub.trigger('studioCloseRightSider', !props.close);
        }}
      >
        {props.close === true ? (
          <DoubleLeftOutlined />
        ) : (
          <DoubleRightOutlined />
        )}
      </div>
    </Sider>
  );
}

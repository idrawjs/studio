import * as React from 'react';
import { Layout, Collapse } from '../../../ui/antd';
import { Elements } from '../elements';
import { Attribute } from '../attribute';
import { Description } from '../description';

const { useState, useCallback } = React;
const { Panel } = Collapse;
const { Sider } = Layout;
type TypeProps = {
  width: number,
  height: number,
}

const panelHeaderHeight = 30;

function SiderRight(props: TypeProps) {
  const { width, height } = props;
  const panelContentMaxHeight = (height / 2) - 30;
  const [elemMaxHeight, setElemMaxHeight] = useState(panelContentMaxHeight);
  const [descMaxHeight, setDescMaxHeight] = useState(panelContentMaxHeight);

  const onCollapseChange = useCallback((key: string|string[]) => {
    let keys: string[] = [];
    if (typeof key === 'string') {
      keys.push(key);
    } else if (Array.isArray(key)) {
      keys = key;
    }
    if (keys.length > 0) {
      const maxHeight = (height - panelHeaderHeight * 2) / keys.length;
      if (keys.includes('elements')) {
        setElemMaxHeight(maxHeight);
      }
      if (keys.includes('description')) {
        setDescMaxHeight(maxHeight);
      }
    }
    
  }, [elemMaxHeight, descMaxHeight]);

  return (
    <Sider width={width} className="idraw-studio-siderright">
      <Collapse
        bordered={false} 
        defaultActiveKey={['elements', 'description']}
        expandIconPosition={'right'}
        className="idraw-studio-siderright-collapse"
        onChange={onCollapseChange}
      >
        <Panel header="Elements" key="elements" className="idraw-studio-siderright-panel">
          <Elements maxHeight={elemMaxHeight}/>
        </Panel>
        <Panel header="Description" key="description" className="idraw-studio-siderright-panel" >
          <div style={{height: descMaxHeight, overflow: 'scroll'}}>
            <Attribute />
            <Description />
          </div>
        </Panel>
      </Collapse>
    </Sider>
  )
}

export default SiderRight
import * as React from 'react';
import { Layout, Collapse } from '../../../ui/antd';
import Elements from '../elements';
import { StudioContext } from './../../context';

const { useContext } = React;
const { Panel } = Collapse;
const { Sider } = Layout;
type TypeProps = {
  width: number,
}

function SiderRight(props: TypeProps) {
  const { width } = props;
  const context = useContext(StudioContext);
  const { data, selectedElementUUID } = context;
  return (
    <Sider width={width} className="idraw-studio-siderright">
      <Collapse
        bordered={false} 
        defaultActiveKey={['1']}
        expandIconPosition={'right'}
      >
        <Panel header="Elements" key="1" >
          <Elements elements={data.elements} selectedUUID={selectedElementUUID} />
        </Panel>
        <Panel header="Attribute" key="2" >
          <div>attribute</div>
        </Panel>
        <Panel header="Description" key="3" >
          <div>description</div>
        </Panel>
      </Collapse>
    </Sider>
  )
}

export default SiderRight
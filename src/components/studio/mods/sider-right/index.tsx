import * as React from 'react';
import { Layout, Collapse } from 'antd';
import Elements from './../elements';

const { Panel } = Collapse;
const { Sider } = Layout;
type TypeProps = {
  width: number
}

function SiderRight(props: TypeProps) {

  return (
    <Sider width={props.width} className="idraw-studio-siderright">
      <Collapse
        bordered={false} 
        defaultActiveKey={['1']}
        expandIconPosition={'right'}
      >
        <Panel header="Elements" key="1" >
          <Elements />
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
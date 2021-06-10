import * as React from 'react';
import { Layout, Collapse } from '../../../ui/antd';
import { TypeData } from '@idraw/types';
import Elements from '../elements';


const { Panel } = Collapse;
const { Sider } = Layout;
type TypeProps = {
  width: number,
  data: TypeData,
  selectedElementUUID: string
}

function SiderRight(props: TypeProps) {
  const { data, width, selectedElementUUID } = props;
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
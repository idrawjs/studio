import * as React from 'react';
import { Layout, Collapse } from '../../../ui/antd';
import { Elements } from '../elements';
import { Attribute } from '../attribute';
import { Description } from '../description';

const { Panel } = Collapse;
const { Sider } = Layout;
type TypeProps = {
  width: number,
}

function SiderRight(props: TypeProps) {
  const { width } = props;
  return (
    <Sider width={width} className="idraw-studio-siderright">
      <Collapse
        bordered={false} 
        defaultActiveKey={['elements', 'attribute', 'description']}
        expandIconPosition={'right'}
      >
        <Panel header="Elements" key="elements" >
          <Elements />
        </Panel>
        <Panel header="Attribute" key="attribute" >
          <Attribute />
        </Panel>
        <Panel header="Description" key="description" >
          <Description />
        </Panel>
      </Collapse>
    </Sider>
  )
}

export default SiderRight
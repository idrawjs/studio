import * as React from 'react';
import { List } from 'antd';

const data = [
  1,2,3,4,5,6,7
]

const Mod = () => {
  return (
    <div>
      <List
        size="small"
        // header={<div>Header</div>}
        // footer={<div>Footer</div>}
        dataSource={data}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
    </div>
  )
}

export default Mod
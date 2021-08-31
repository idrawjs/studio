import { useState } from 'react';
import { Layout } from 'antd';
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { TypeSelectDataItem } from '../selector'; 
import eventHub from './../../util/event-hub'; 
import { Materials } from './material';
import { Themes } from './theme';
import { Aside } from './aside';
 
const { Sider, Content } = Layout;

type TypeProps = {
  close: boolean;
  width: number,
  asideLayout: { width: number }
  customElements?: TypeSelectDataItem[],
  customElementsPagination?: {
    current: number,
    pageSize: number,
    total: number,
    onChange: (page: number) => void;
  }
}



export function SiderLeft(props: TypeProps) {

  const [asideActiveTab, setActiveTab] = useState<string>('themes');
  const contentList: {
    key: string,
    content: React.ReactElement,
  }[] = [
    {
      key: 'themes',
      content: <Themes />
    },
    {
      key: 'materials',
      content: <Materials
        width={props.width - props.asideLayout.width}
        customElements={props.customElements}
        customElementsPagination={props.customElementsPagination}
      />
    }
  ]

  return (
    <Sider width={props.width} className="idraw-studio-siderleft">
      <Layout style={{
        height: '100%',
        overflow: 'auto'
      }}>
        <Sider width={props.asideLayout.width} className="idraw-studio-siderleft-aside">
          <Aside size={props.asideLayout.width} activeTab={asideActiveTab}
            onChangeTab={(value: string = '') => {
              setActiveTab(value);
            }}
          />
        </Sider>
        <Content style={{
          height: '100%',
          overflow: 'auto'
        }}>
          {contentList.map((item, i) => {
            return (
              <div key={i}
                className={classnames({
                'idraw-studio-siderleft-content': true,
                'content-active ': asideActiveTab === item.key})}>
              {item.content}
              </div> 
            );
          })}
        </Content>
      </Layout>
      <div className="idraw-studio-siderleft-closebtn" onClick={() => {
        eventHub.trigger('studioCloseLeftSider', !props.close);
      }}>
        {props.close === true ? (
          <DoubleRightOutlined />
        ) : (
          <DoubleLeftOutlined />
        )}
      </div>
    </Sider>
  )
}


 
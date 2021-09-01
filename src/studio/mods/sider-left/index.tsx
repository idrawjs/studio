import { useState } from 'react';
import { Layout } from 'antd';
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { TypeMaterial, TypeTemplate } from '../../types'; 
import eventHub from './../../util/event-hub'; 
import { Materials } from './material';
import { Templates } from './template';
import { Aside } from './aside';
 
const { Sider, Content } = Layout;

type TypeProps = {
  close: boolean;
  width: number,
  asideLayout: { width: number }
  customMaterials?: TypeMaterial[],
  customMaterialsPagination?: {
    current: number,
    pageSize: number,
    total: number,
    onChange: (page: number) => void;
  },
  customTemplates?: TypeTemplate[],
  customTemplatesPagination?: {
    current: number,
    pageSize: number,
    total: number,
    onChange: (currentPage: number) => void;
  }
}



export function SiderLeft(props: TypeProps) {

  const [asideActiveTab, setActiveTab] = useState<string>('templates');
  const contentList: {
    key: string,
    content: React.ReactElement,
  }[] = [
    {
      key: 'templates',
      content: <Templates
        width={props.width - props.asideLayout.width}
        customTemplates={props.customTemplates}
        customTemplatesPagination={props.customTemplatesPagination}
      />
    },
    {
      key: 'materials',
      content: <Materials
        width={props.width - props.asideLayout.width}
        customMaterials={props.customMaterials}
        customMaterialsPagination={props.customMaterialsPagination}
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


 
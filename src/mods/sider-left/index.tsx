import React from 'react';
import { useState, memo, useMemo } from 'react';
import { Layout } from 'antd';
import {
  DoubleRightOutlined,
  DoubleLeftOutlined,
  ReconciliationOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import classnames from 'classnames';
import { TypeMaterial, TypeTemplate } from '../../types';
import eventHub from './../../util/event-hub';
import { Materials } from './material';
import { Templates } from './template';
import { Aside } from './aside';

const TemplatesMemo = memo(Templates);
const { Sider, Content } = Layout;

type TypeProps = {
  close: boolean;
  width: number;
  asideLayout: { width: number };
  customMaterials?: TypeMaterial[];
  customMaterialsPagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number) => void;
  };
  customTemplates?: TypeTemplate[];
  customTemplatesPagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (currentPage: number) => void;
  };
};

export function SiderLeft(props: TypeProps) {
  const { customTemplates } = props;
  const contentList: {
    key: string;
    content: React.ReactElement;
  }[] = [
    {
      key: 'templates',
      content: (
        <TemplatesMemo
          width={props.width - props.asideLayout.width}
          customTemplates={useMemo(
            () => props.customTemplates,
            [props.customTemplates]
          )}
          customTemplatesPagination={useMemo(
            () => props.customTemplatesPagination,
            [props.customTemplatesPagination]
          )}
        />
      )
    },
    {
      key: 'materials',
      content: (
        <Materials
          width={props.width - props.asideLayout.width}
          customMaterials={props.customMaterials}
          customMaterialsPagination={props.customMaterialsPagination}
        />
      )
    }
  ];
  const tabList = [
    {
      name: 'Templates',
      key: 'templates',
      Icon: <ReconciliationOutlined />
    },
    {
      name: 'Materials',
      key: 'materials',
      Icon: <AppstoreOutlined />
    }
  ];

  let defaultTabKey = tabList[0]?.key;
  if (Array.isArray(customTemplates) !== true) {
    tabList.shift();
    contentList.shift();
    defaultTabKey = tabList[0]?.key;
  }

  const [asideActiveTab, setActiveTab] = useState<string>(defaultTabKey);

  return (
    <Sider width={props.width} className="idraw-studio-siderleft">
      <Layout
        style={{
          height: '100%',
          overflow: 'auto'
        }}
      >
        <Sider
          width={props.asideLayout.width}
          className="idraw-studio-siderleft-aside"
        >
          <Aside
            size={props.asideLayout.width}
            activeTab={asideActiveTab}
            tabList={tabList}
            onChangeTab={(value: string) => {
              setActiveTab(value || '');
            }}
          />
        </Sider>
        <Content
          style={{
            height: '100%',
            overflow: 'auto'
          }}
        >
          {contentList.map((item, i) => {
            return (
              <div
                key={i}
                className={classnames({
                  'idraw-studio-siderleft-content': true,
                  'content-active ': asideActiveTab === item.key
                })}
              >
                {item.content}
              </div>
            );
          })}
        </Content>
      </Layout>
      <div
        className="idraw-studio-siderleft-closebtn"
        onClick={() => {
          eventHub.trigger('studioCloseLeftSider', !props.close);
        }}
      >
        {props.close === true ? (
          <DoubleRightOutlined />
        ) : (
          <DoubleLeftOutlined />
        )}
      </div>
    </Sider>
  );
}

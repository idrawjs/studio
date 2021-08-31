import classnames from 'classnames';
import {
  ReconciliationOutlined, AppstoreOutlined
} from '@ant-design/icons';
import { Tooltip  } from 'antd';

type TypeProps = {
  size: number;
  activeTab: string,
  onChangeTab: (value: string) => void;
}

const tabList: {
  name: string,
  key: string,
  Comp: React.ReactElement
}[] = [
  {
    name: 'Themes',
    key: 'themes',
    Comp: <ReconciliationOutlined />
  },
  {
    name: 'Materials',
    key: 'materials',
    Comp: <AppstoreOutlined />
  }
]

export function Aside(props: TypeProps) {
  const { size, activeTab } = props;
  return (
    <div className="idraw-studio-siderleft-aside" style={{width: size}}>
      {tabList.map((tab, i) => {
        return (
        <div key={i} className={classnames({
            'siderleft-aside-tab-item': true,
            'tab-active': tab.key === activeTab
          })}
          onClick={() => {
            props.onChangeTab(tab.key)
          }}
        >
          <Tooltip title={tab.name} placement="right">
            {tab.Comp}
          </Tooltip>
        </div>)
      })}
    </div>
  )
}
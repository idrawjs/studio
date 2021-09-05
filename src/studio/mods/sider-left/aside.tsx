import classnames from 'classnames';
import { Tooltip  } from 'antd';

type TypeProps = {
  size: number;
  activeTab: string,
  tabList: {
    name: string,
    key: string,
    Icon: React.ReactElement
  }[],
  onChangeTab: (value: string) => void;
}

export function Aside(props: TypeProps) {
  const { size, activeTab, tabList } = props;
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
            {tab.Icon}
          </Tooltip>
        </div>)
      })}
    </div>
  )
}
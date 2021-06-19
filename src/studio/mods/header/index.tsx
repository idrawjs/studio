import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { Layout, Select } from '../../../ui/antd';
import classnames from 'classnames';
import {
  ZoomInOutlined, ZoomOutOutlined, UndoOutlined, RedoOutlined,
} from '@ant-design/icons';
import eventHub from '../../util/event-hub';

const { Header, } = Layout;

type TypeProps = {
  height: number;
}

export function StudioHeader(props: TypeProps) {

  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    
  }, []);

  const onChangeScale = useCallback((num) => {
    setScale(num);
    eventHub.trigger('studioScaleScreen', num);
  }, []);

  return (
    <Header className="idraw-studio-header"
      style={{height: props.height}}
    >
      <Box>
        <Select size="small"
          style={{width: 100}}
          value={scale}
          onChange={onChangeScale}
          options={[
            {label: '25%', value: 0.25},
            {label: '50%', value: 0.5},
            {label: '75%', value: 0.75},
            {label: '100%', value: 1},
            {label: '125%', value: 1.25},
            {label: '150%', value: 1.5},
            {label: '200%', value: 2},
            {label: '300%', value: 3},
            {label: '400%', value: 4},
          ]}/>
      </Box>
      <Box noBoarder={true}>
        <ZoomInOutlined className="idraw-studio-header-icon" />
      </Box>
      <Box>
        <ZoomOutOutlined className="idraw-studio-header-icon"/>
      </Box>
      <Box noBoarder={true}>
        <UndoOutlined className="idraw-studio-header-icon"/>
      </Box>
      <Box>
        <RedoOutlined className="idraw-studio-header-icon"/>
      </Box>
    </Header>
  )
}

const Box: React.FC<{
  noBoarder?: boolean,
  style?: React.HTMLAttributes<HTMLDivElement>['style'],
}> = (props) => {
  return (
    <div
      className={classnames({
        'idraw-studio-header-box': true,
        'no-border': props.noBoarder === true,
      })}
      style={props.style || {}}
    >
      {props.children}
    </div>
  )
}
 
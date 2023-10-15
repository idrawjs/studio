import * as React from 'react';
import { useState, useCallback } from 'react';
import { Select, } from 'antd';
import classnames from 'classnames';
import {
  ZoomInOutlined, ZoomOutOutlined,
} from '@ant-design/icons';
import { Box } from './box';
import eventHub from '../../util/event-hub';


const zoomData = [
  {label: '25%', value: 0.25},
  {label: '50%', value: 0.5},
  {label: '75%', value: 0.75},
  {label: '100%', value: 1},
  {label: '125%', value: 1.25},
  {label: '150%', value: 1.5},
  {label: '200%', value: 2},
  {label: '300%', value: 3},
  {label: '400%', value: 4},
]

function getZoomInValue(value): number | null {
  let val: number | null = null;
  for (let i = 0; i < zoomData.length; i++) {
    const item = zoomData[i];
    if (item.value === value) {
      if (zoomData[i + 1]) {
        val = zoomData[i + 1].value
      }
      break;
    }
  }
  return val;
}

function getZoomOutValue(value): number | null {
  let val: number | null = null;
  for (let i = 0; i < zoomData.length; i++) {
    const item = zoomData[i];
    if (item.value === value) {
      if (zoomData[i - 1]) {
        val = zoomData[i - 1].value
      }
      break;
    }
  }
  return val;
}

export function ZoomAction() {

  const [scale, setScale] = useState<number>(1);

  const onChangeScale = useCallback((num) => {
    setScale(num);
    eventHub.trigger('studioScaleScreen', num);
  }, [scale]);

  const onClickZoomIn = useCallback(() => {
    const num = getZoomInValue(scale);
    if (num > 0) {
      setScale(num);
      eventHub.trigger('studioScaleScreen', num);
    }
  }, [scale]);

  const onClickZoomOut = useCallback(() => {
    const num = getZoomOutValue(scale);
    if (num > 0) {
      setScale(num);
      eventHub.trigger('studioScaleScreen', num);
    }
  }, [scale]);

  return (
    <>
      <Box>
        <Select size="small"
          style={{width: 100}}
          value={scale}
          onChange={onChangeScale}
          options={zoomData}/>
      </Box>
      <Box noBoarder={true}>
        <ZoomInOutlined
          onClick={onClickZoomIn}
          className={classnames({
            'idraw-studio-header-icon': true,
            'icon-disable': getZoomInValue(scale) === null,
          })} 
        />
      </Box>
      <Box>
        <ZoomOutOutlined
          onClick={onClickZoomOut}
          className={classnames({
            'idraw-studio-header-icon': true,
            'icon-disable': getZoomOutValue(scale) === null,
          })} 
        />
      </Box>
    </>
  )
}

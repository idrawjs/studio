import { useContext, useState, useCallback, useEffect } from 'react';
import { Input, Select } from 'antd';
import { Box, BoxText } from './box';
import { StudioContext } from './../../context';
import { isUnIntegerNumber } from './../../util/data';
import eventHub from './../../util/event-hub';

const pixelRatioOptions = [
  {label: 1, value: 1},
  {label: 2, value: 2},
  {label: 3, value: 3},
  {label: 4, value: 8},
]

export function SizeAction() {

  const context = useContext(StudioContext);
  const { contextSize } = context;
  const [width, setWidth] = useState<number>(contextSize.width);
  const [height, setHeight] = useState<number>(contextSize.height);
  const [devicePixelRatio, setDevicePixelRatio] = useState<number>(contextSize.devicePixelRatio);

  useEffect(() => {
    eventHub.on('studioIDrawResetContextSize', function (data) {
      if (data.width > 0) {
        setWidth(data.width);
      }
      if (data.height > 0) {
        setHeight(data.height);
      }
      if (data.devicePixelRatio > 0) {
        setDevicePixelRatio(data.devicePixelRatio);
      }
    });
  }, []);

  const onChangeWidth = useCallback((e) => {
    const num = e.target.value * 1;
    if (isUnIntegerNumber(num)) {
      setWidth(num);
      eventHub.trigger('studioIDrawResetContextSize', {
        width: num,
        height,
        devicePixelRatio,
      });
    }
  }, [height, devicePixelRatio]);

  const onChangeHeight = useCallback((e) => {
    const num = e.target.value * 1;
    if (isUnIntegerNumber(num)) {
      setHeight(num);
      eventHub.trigger('studioIDrawResetContextSize', {
        width,
        height: num,
        devicePixelRatio,
      });
    }
  }, [width, devicePixelRatio])

  const onChangePixelRatio = useCallback((value) => {
    const num = value * 1;
    if (isUnIntegerNumber(num)) {
      setDevicePixelRatio(num);
      eventHub.trigger('studioIDrawResetContextSize', {
        width,
        height,
        devicePixelRatio: num,
      });
    }
  }, [height, width])

  return (
    <>
      <Box noBoarder={true}>
        <BoxText text={'Width:'} />
        <Input 
          value={width} size="small" style={{width: 70}} type="number"
          onChange={onChangeWidth}
        />
      </Box>
      <Box noBoarder={true}>
        <BoxText text={'Height:'} />
        <Input 
          value={height} size="small" style={{width: 70}} type="number"
          onChange={onChangeHeight}
        />
      </Box>
      <Box>
        <BoxText text={'PixelRatio:'} />
        <Select value={devicePixelRatio} size="small" style={{width: 50}}
          options={pixelRatioOptions} onChange={onChangePixelRatio}
        />
      </Box>
    </>
  )
}
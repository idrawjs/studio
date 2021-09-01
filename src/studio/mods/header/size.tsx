import { useContext, useState, useCallback, useEffect } from 'react';
import { Input } from 'antd';
import { Box, BoxText } from './box';
import { StudioContext } from './../../context';
import { isUnIntegerNumber } from './../../util/data';
import eventHub from './../../util/event-hub';

export function SizeAction() {

  const context = useContext(StudioContext);
  const { contextSize } = context;
  const [width, setWidth] = useState(contextSize.width);
  const [height, setHeight] = useState(contextSize.height);

  useEffect(() => {
    eventHub.on('studioIDrawResetContextSize', function (data) {
      if (data.width > 0) {
        setWidth(data.width);
      }
      if (data.height > 0) {
        setHeight(data.height);
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
      });
    }
  }, [height]);

  const onChangeHeight = useCallback((e) => {
    console.log('onChangeHeight =', e.target.value);
    const num = e.target.value * 1;
    if (isUnIntegerNumber(num)) {
      setHeight(num);
      eventHub.trigger('studioIDrawResetContextSize', {
        width,
        height: num,
      });
    }
  }, [width])

  return (
    <>
      <Box noBoarder={true}>
        <BoxText text={'Width:'} />
        <Input 
          value={width} size="small" style={{width: 70}} type="number"
          onChange={onChangeWidth}
        />
      </Box>
      <Box>
        <BoxText text={'Height:'} />
        <Input 
          value={height} size="small" style={{width: 70}} type="number"
          onChange={onChangeHeight}
        />
      </Box>
    </>
  )
}
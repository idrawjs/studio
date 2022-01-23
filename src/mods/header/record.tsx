import * as React from 'react';
import { useCallback } from 'react';
import {
  UndoOutlined, RedoOutlined,
} from '@ant-design/icons';
import { Box } from './box';
import eventHub from '../../util/event-hub';

export function RecordAction() {

  const onClickUndo = useCallback(() => {
    eventHub.trigger('studioUndo', undefined);
  }, []);

  const onClickRedo = useCallback(() => {
    eventHub.trigger('studioRedo', undefined);
  }, []);

  return (
    <>
      <Box noBoarder={true}>
        <UndoOutlined
          onClick={onClickUndo}
          className="idraw-studio-header-icon"/>
      </Box>
      <Box>
        <RedoOutlined
          onClick={onClickRedo}
          className="idraw-studio-header-icon"/>
      </Box>
    </>
  )
}

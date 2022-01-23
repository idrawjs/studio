import * as React from 'react';
import { useCallback } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Box } from './box';
import eventHub from '../../util/event-hub';

export function DownloadAction() {

  const onClickDwnload = useCallback(() => {
    eventHub.trigger('studioExportImage', undefined);
  }, []);

  return (
    <Box>
      <DownloadOutlined
        onClick={onClickDwnload}
        className="idraw-studio-header-icon"/>
    </Box>
  )
}

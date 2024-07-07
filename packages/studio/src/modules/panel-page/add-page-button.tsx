import React, { useState, useMemo, useContext } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { ConfigContext, generateClassName, IconFileAdd } from '@idraw/studio-base';
import { Button, Drawer, message } from 'antd';
import { calcElementListSize, deepCloneElement } from 'idraw';
import type { PointSize } from 'idraw';
import type { SharedEvent, SharedStore, GetTemplates } from '../../types';
import { useLocale } from '../../locale';
import { TemplatePreview, templatePreivewDrawerStyles } from '../template-preview';
import { getDefaultPageTemplates } from '../../shared/page';

const modName = 'add-page-button';

export interface AddPageButtonProps {
  className?: string;
  style?: CSSProperties;
  parentModName: string;
  sharedEvent: SharedEvent;
  sharedStore: SharedStore;
  inPageOverview: boolean;
  getPageTemplates?: GetTemplates;
}

export const AddPageButton = (props: AddPageButtonProps) => {
  const { className, style, parentModName, inPageOverview, sharedEvent, sharedStore, getPageTemplates } = props;
  const rootClassName = generateClassName(parentModName, modName);
  const [moduleLocale] = useLocale('PanelPage');
  const { getContainer } = useContext(ConfigContext);
  const [openPageTemplates, setOpenPageTemplates] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  return useMemo(() => {
    return (
      <>
        <Button
          size="small"
          type="text"
          style={style}
          className={classnames(rootClassName, className)}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpenPageTemplates(true);
          }}
        >
          <IconFileAdd style={{ fontSize: 18 }} />
        </Button>
        <Drawer
          title={moduleLocale.addPage}
          placement="left"
          onClose={() => {
            setOpenPageTemplates(false);
          }}
          styles={templatePreivewDrawerStyles}
          open={openPageTemplates}
          getContainer={getContainer}
        >
          <TemplatePreview
            getTemplates={getPageTemplates || getDefaultPageTemplates}
            onSelect={({ element }) => {
              if (!element) {
                messageApi?.error('Unexpected data'); // TODO
                return;
              }
              const elem = deepCloneElement(element);
              const idraw = sharedStore.get('idraw');
              const data = idraw?.getData();
              const start: PointSize = { x: 0, y: 0 };
              if (idraw && Array.isArray(data?.elements)) {
                const elementListSize = calcElementListSize(data.elements);
                start.x = elementListSize.x;
                start.y = elementListSize.y;
              }
              sharedEvent.trigger('addPage', {
                element: {
                  ...elem,
                  ...start
                },
                inPageOverview
              });
              setOpenPageTemplates(false);
            }}
          />
        </Drawer>
        {contextHolder}
      </>
    );
  }, [style, className, inPageOverview, moduleLocale, openPageTemplates]);
};

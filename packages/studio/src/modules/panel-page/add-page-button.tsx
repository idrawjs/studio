import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { generateClassName, IconDown, IconFileAdd } from '@idraw/studio-base';
import { Space, Button, Dropdown } from 'antd';
import { calcElementListSize, createUUID, type Element } from 'idraw';
import { SharedEvent, SharedStore } from '../../types';

const modName = 'add-page-button';

export interface AddPageButtonProps {
  className?: string;
  style?: CSSProperties;
  parentModName: string;
  sharedEvent: SharedEvent;
  sharedStore: SharedStore;
  inPageOverview: boolean;
}

export const AddPageButton = (props: AddPageButtonProps) => {
  const { className, style, parentModName, inPageOverview, sharedEvent, sharedStore } = props;
  const rootClassName = generateClassName(parentModName, modName);

  return useMemo(() => {
    return (
      <Dropdown
        trigger={['click', 'click']}
        placement="bottom"
        menu={{
          items: [
            {
              key: 'pc-page',
              label: 'PC page',
              onClick: (e) => {
                e.domEvent.stopPropagation();
                const idraw = sharedStore.get('idraw');
                const data = idraw?.getData();
                if (idraw && Array.isArray(data?.elements)) {
                  const elementListSize = calcElementListSize(data.elements);
                  const width = 1200;
                  const height = 800;
                  const pageElement: Element<'group'> = {
                    uuid: createUUID(),
                    type: 'group',
                    name: 'Unamed PC page',
                    x: elementListSize.x + elementListSize.w + 100,
                    y: elementListSize.y,
                    w: width,
                    h: height,
                    detail: {
                      background: '#FFFFFF',
                      children: [
                        {
                          uuid: createUUID(),
                          type: 'rect',
                          name: 'Box',
                          x: 50,
                          y: 50,
                          w: 1100,
                          h: 400,
                          detail: {
                            background: '#D9D9D9'
                          }
                        },
                        {
                          uuid: createUUID(),
                          type: 'rect',
                          name: 'Box',
                          x: 50,
                          y: 500,
                          w: 1100,
                          h: 200,
                          detail: {
                            background: '#D9D9D9'
                          }
                        }
                      ]
                    },
                    extends: {
                      isPage: true
                    }
                  };
                  sharedEvent.trigger('addPage', {
                    element: pageElement,
                    inPageOverview
                  });
                }
              }
            },
            {
              key: 'mobile-page',
              label: 'Mobile page',
              onClick: (e) => {
                e.domEvent.stopPropagation();
                const idraw = sharedStore.get('idraw');
                const data = idraw?.getData();
                if (idraw && Array.isArray(data?.elements)) {
                  const elementListSize = calcElementListSize(data.elements);
                  const width = 750;
                  const height = 2000;
                  const pageElement: Element<'group'> = {
                    uuid: createUUID(),
                    type: 'group',
                    name: 'Unamed Mobile page',
                    x: elementListSize.x + elementListSize.w + 100,
                    y: elementListSize.y,
                    w: width,
                    h: height,
                    detail: {
                      background: '#FFFFFF',
                      children: [
                        {
                          uuid: createUUID(),
                          type: 'rect',
                          name: 'Box',
                          x: 40,
                          y: 40,
                          w: 670,
                          h: 400,
                          detail: {
                            background: '#D9D9D9'
                          }
                        },
                        {
                          uuid: createUUID(),
                          type: 'rect',
                          name: 'Box',
                          x: 40,
                          y: 480,
                          w: 670,
                          h: 600,
                          detail: {
                            background: '#D9D9D9'
                          }
                        }
                      ]
                    },
                    extends: {
                      isPage: true
                    }
                  };
                  sharedEvent.trigger('addPage', {
                    element: pageElement,
                    inPageOverview
                  });
                }
              }
            }
          ]
        }}
      >
        <Button
          size="small"
          type="text"
          style={style}
          className={classnames(rootClassName, className)}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Space.Compact>
            <IconFileAdd style={{ fontSize: 18 }} />
            <IconDown style={{ fontSize: 10, marginLeft: 2 }} />
          </Space.Compact>
        </Button>
      </Dropdown>
    );
  }, [style, className, inPageOverview]);
};

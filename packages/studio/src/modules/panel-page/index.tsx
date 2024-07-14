import React, { useContext, useEffect, useMemo, useState, useRef } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { generateClassName, ElementTree, PageTree, getElementTree, IconDoubleLeft, IconLeft, IconLayout, getPageTree } from '@idraw/studio-base';
import { updateElementInList, moveElementPosition, getGroupQueueFromList, findElementFromListByPosition, eventKeys } from 'idraw';
import type { ElementPosition } from 'idraw';
import { Dropdown, Button, Collapse, Empty } from 'antd';
import type { CollapseProps } from 'antd';
import { Context } from '../context';
import type { SharedEvent, SharedStore, HookUseContextMenuOptions, StudioState, GetTemplates } from '../../types';
import { useLocale } from '../../locale';
import { AddPageButton } from './add-page-button';

const modName = 'mod-panel-page';

export interface PanelPageProps {
  className?: string;
  height: number;
  style?: CSSProperties;
  defaultSelectedElementUUIDs?: string[];
  sharedStore: SharedStore;
  sharedEvent: SharedEvent;
  useContextMenuOptions: HookUseContextMenuOptions;
  getPageTemplates?: GetTemplates;
}

const pageTreeKey = 'page-tree';
const elementTreeKey = 'element-tree';

const pageTreeHeightRatio = 1;
const elementTreeHeightRatio = 3;

export const PanelPage = (props: PanelPageProps) => {
  const { className, style, height, defaultSelectedElementUUIDs = [], sharedStore, sharedEvent, useContextMenuOptions, getPageTemplates } = props;
  const { state, dispatch } = useContext(Context);
  const { pageTree, elementTree, selectedUUIDs, editingData, editingDataPosition, data } = state;

  const refElementTree = useRef<{
    scrollTo: (e: { key: string | number; align?: 'top' | 'bottom' | 'auto'; offset?: number }) => void;
  } | null>(null);
  const refPageTree = useRef<{
    scrollTo: (e: { key: string | number; align?: 'top' | 'bottom' | 'auto'; offset?: number }) => void;
  } | null>(null);

  const headerHeight = 32;
  // const refContentActiveKeys = useRef<string[]>([pageTreeKey, elementTreeKey]);
  const [activeKeys, setActiveKeys] = useState<string[]>([pageTreeKey, elementTreeKey]);
  const [pageTreeHeight, setPageTreeHeight] = useState<number>(0);
  const [elementTreeHeight, setElementTreeHeight] = useState<number>(0);

  const [expandedElementKeys, setExpandedElementKeys] = useState<string[]>(defaultSelectedElementUUIDs);
  const rootClassName = generateClassName(modName);
  const contentClassName = generateClassName(modName, 'content');
  const headerClassName = generateClassName(modName, 'header');
  const headerTitleClassName = generateClassName(modName, 'header', 'title');
  const headerBtnClassName = generateClassName(modName, 'header', 'btn');
  const [contextMenuOptions] = useContextMenuOptions({ sharedEvent, sharedStore });
  const [moduleLocale] = useLocale('PanelPage');
  const [inPageOverview, setInPageOverview] = useState<boolean>(false);
  const refInPageOverview = useRef<boolean>(inPageOverview);
  const refPreviousSelectedUUIDs = useRef<string[]>([]);

  const getSelectedPageKeys = () => {
    const keys: string[] = [];
    const elem = findElementFromListByPosition([editingDataPosition[0]], state.data.elements);
    if (elem?.uuid) {
      keys.push(elem.uuid);
    }
    return keys;
  };
  const [selectedPageUUIDs, setSelectedPageUUIDs] = useState<string[]>(getSelectedPageKeys());

  useEffect(() => {
    const idraw = sharedStore.get('idraw');
    const listenSelectedPage = (e: { uuids: string[] }) => {
      if (refInPageOverview.current === true) {
        const { uuids = [] } = e;
        setSelectedPageUUIDs([...uuids]);
      }
    };
    idraw?.on(eventKeys.select, listenSelectedPage);

    return () => {
      idraw?.off(eventKeys.select, listenSelectedPage);
    };
  }, []);

  useEffect(() => {
    if (editingDataPosition.length === 1 && pageTree.length > 0) {
      const pageUUID = pageTree[editingDataPosition[0]]?.uuid;
      if (pageUUID && !selectedPageUUIDs.includes(pageUUID)) {
        setSelectedPageUUIDs([pageUUID]);
        // setTimeout(() => {
        //   // TODO
        //   refPageTree.current?.scrollTo({
        //     key: pageUUID
        //   });
        // }, 300);
      }
    }
  }, [editingDataPosition]);

  const resetContentHeight = (keys: string[]) => {
    const totalRatio = pageTreeHeightRatio + elementTreeHeightRatio;
    if (keys.includes(pageTreeKey) && keys.includes(elementTreeKey)) {
      const restHeight = height - headerHeight * 2;
      setPageTreeHeight((restHeight * pageTreeHeightRatio) / totalRatio);
      setElementTreeHeight((restHeight * elementTreeHeightRatio) / totalRatio);
    } else if (keys.includes(pageTreeKey) && !keys.includes(elementTreeKey)) {
      const contentHeight = height - headerHeight * 2;
      setPageTreeHeight(contentHeight);
      setElementTreeHeight(0);
    } else if (!keys.includes(pageTreeKey) && keys.includes(elementTreeKey)) {
      const contentHeight = height - headerHeight * 2;
      setPageTreeHeight(0);
      setElementTreeHeight(contentHeight);
    } else {
      setPageTreeHeight(0);
      setElementTreeHeight(0);
    }
  };

  useEffect(() => {
    const idraw = sharedStore?.get('idraw');
    let currentKeys: string[] = [];
    if (inPageOverview === true) {
      sharedEvent.trigger('resetEditingView', { type: 'back-root', position: null });
      setSelectedPageUUIDs([]);
      currentKeys = [pageTreeKey];
      setActiveKeys(currentKeys);
      idraw?.disable('selectInGroup');
    } else {
      const pageKeys: string[] = [];
      if (pageTree.length > 0) {
        pageKeys.push(pageTree[0].uuid);
        sharedEvent.trigger('resetEditingView', { type: 'go-to-page', position: [0] });
      }
      setSelectedPageUUIDs(pageKeys);
      idraw?.enable('selectInGroup');
      currentKeys = [pageTreeKey, elementTreeKey];
      setActiveKeys(currentKeys);
    }
    resetContentHeight(currentKeys);
  }, [height, inPageOverview]);

  useEffect(() => {
    refInPageOverview.current = inPageOverview;
    sharedEvent.trigger('switchPageOverview', { isPageOverview: !!inPageOverview });
  }, [inPageOverview]);

  const getCurrentName = () => {
    if (editingDataPosition.length === 0) {
      return '';
    }
    const elem = findElementFromListByPosition(editingDataPosition, state.data.elements);
    return elem?.name || elem?.type || '';
  };

  const selectElementsByPositions = (positions: ElementPosition[]) => {
    const idraw = sharedStore.get('idraw');
    idraw?.selectElementsByPositions(positions);
  };

  useEffect(() => {
    const scrollToLayer = ({ uuid }: { uuid: string }) => {
      if (uuid) {
        refElementTree.current?.scrollTo({
          key: uuid,
          align: 'top'
          // offset: 0
        });
      }
    };
    sharedEvent.on('scrollToLayer', scrollToLayer);
    return () => {
      sharedEvent.off('scrollToLayer', scrollToLayer);
    };
  }, []);

  useEffect(() => {
    if (selectedUUIDs.length === 1) {
      if (refPreviousSelectedUUIDs.current[0] !== selectedUUIDs[0]) {
        refElementTree.current?.scrollTo({
          key: selectedUUIDs[0],
          align: 'auto'
        });
      }
    }
    refPreviousSelectedUUIDs.current = [...selectedUUIDs];
  }, [selectedUUIDs]);

  useEffect(() => {
    if (!selectedUUIDs[0]) {
      return;
    }
    if (selectedUUIDs.length === 1) {
      const groupQueue = getGroupQueueFromList(selectedUUIDs[0], editingData.elements);
      const uuidQueue = groupQueue.map((elem) => elem.uuid);
      if (selectedUUIDs[0]) {
        uuidQueue.push(selectedUUIDs[0]);
      }
      const newExpandedKeys = [...expandedElementKeys];
      uuidQueue.forEach((uuid: string) => {
        if (!newExpandedKeys.includes(uuid)) {
          newExpandedKeys.push(uuid);
        }
      });

      setExpandedElementKeys(newExpandedKeys);
    }
  }, [selectedUUIDs, editingData]);

  const onClickBackPageRootEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editingDataPosition.length > 1) {
      sharedEvent.trigger('resetEditingView', { type: 'go-to-group', position: [editingDataPosition[0]] });
    }
  };

  const onClickBackOne = (e: React.MouseEvent) => {
    e.stopPropagation();
    sharedEvent.trigger('resetEditingView', { type: 'back-one', position: null });
  };

  const items: CollapseProps['items'] = [
    {
      key: pageTreeKey,
      collapsible: inPageOverview ? 'disabled' : undefined,
      label: (
        <div className={headerClassName} style={{ height: headerHeight }}>
          <div style={{ display: 'flex' }}>
            <span style={{ marginRight: 10 }}>{moduleLocale.pages}</span>
            <Button
              className={headerBtnClassName}
              style={{ marginLeft: '10px' }}
              size="small"
              icon={<IconLayout />}
              type={inPageOverview ? 'primary' : 'default'}
              onClick={(e) => {
                e.stopPropagation();
                setInPageOverview(!inPageOverview);
              }}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <AddPageButton
              inPageOverview={inPageOverview}
              parentModName={modName}
              sharedEvent={sharedEvent}
              sharedStore={sharedStore}
              getPageTemplates={getPageTemplates}
            />
          </div>
        </div>
      ),
      children: (
        <div className={contentClassName} style={{ height: pageTreeHeight }}>
          {pageTree.length > 0 ? (
            <PageTree
              ref={refPageTree}
              height={pageTreeHeight}
              treeData={pageTree}
              selectedKeys={selectedPageUUIDs}
              onTitleChange={({ uuid, value }) => {
                updateElementInList(uuid, { name: value }, data.elements);

                const pageTree = getPageTree(data);
                const payload: Partial<StudioState> = {
                  pageTree,
                  data: { ...data }
                };
                if (editingDataPosition.length === 0) {
                  payload.editingData = { ...data };
                  const elementTree = getElementTree(data);
                  payload.elementTree = elementTree;
                }
                dispatch({
                  type: 'update',
                  payload
                });
              }}
              onSelect={(e) => {
                if (e?.positions.length === 1) {
                  const idraw = sharedStore.get('idraw');
                  idraw?.trigger(eventKeys.select, { uuids: [] });
                  idraw?.trigger(eventKeys.clearSelect);
                  if (inPageOverview) {
                    if (!selectedPageUUIDs?.includes(e.uuids[0])) {
                      selectElementsByPositions(e.positions);
                      setSelectedPageUUIDs([e.uuids[0]]);
                    }
                    return;
                  }

                  sharedEvent.trigger('resetEditingView', { type: 'go-to-page', position: e.positions[0] });

                  const keys: string[] = [];
                  const elem = findElementFromListByPosition(e.positions[0], state.data.elements);
                  if (elem?.uuid) {
                    keys.push(elem.uuid);
                    setSelectedPageUUIDs(keys);
                  }
                }
              }}
              onDrop={(e) => {
                if (!(e.from.length === 1 && e.to.length === 1)) {
                  return;
                }
                const { elements } = moveElementPosition(data.elements, {
                  from: e.from,
                  to: e.to
                });

                const pageTree = getPageTree(data);
                const payload: Partial<StudioState> = {
                  pageTree,
                  data: { ...data, ...{ elements } }
                };
                if (editingDataPosition.length === 0) {
                  payload.editingData = { ...data, ...{ elements } };
                  const elementTree = getElementTree(data);
                  payload.elementTree = elementTree;
                }
                dispatch({
                  type: 'update',
                  payload
                });
              }}
              onDelete={({ uuid }) => {
                sharedEvent.trigger('deletePage', { uuid });
              }}
            />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />
          )}
        </div>
      )
    },
    {
      key: elementTreeKey,
      collapsible: inPageOverview ? 'disabled' : undefined,
      label: (
        <div className={headerClassName} style={{ height: headerHeight }}>
          <div style={{ display: 'inline-flex' }}>
            <Button
              className={headerBtnClassName}
              size="small"
              icon={<IconDoubleLeft />}
              disabled={!(editingDataPosition.length > 1)}
              onClick={onClickBackPageRootEdit}
            />
            <Button className={headerBtnClassName} size="small" icon={<IconLeft />} disabled={!(editingDataPosition.length > 1)} onClick={onClickBackOne} />
          </div>
          <span className={headerTitleClassName}>{getCurrentName()}</span>
        </div>
      ),
      children: (
        <Dropdown menu={{ items: contextMenuOptions }} trigger={['contextMenu']}>
          <div className={contentClassName} style={{ height: elementTreeHeight }}>
            {elementTree.length > 0 ? (
              <ElementTree
                ref={refElementTree}
                height={elementTreeHeight}
                treeData={elementTree}
                selectedKeys={selectedUUIDs}
                // expandedKeys={expandedElementKeys}
                onTitleChange={({ uuid, value }) => {
                  updateElementInList(uuid, { name: value }, state.editingData.elements);
                  const elementTree = getElementTree(editingData);
                  dispatch({
                    type: 'update',
                    payload: { editingData: { ...editingData }, elementTree }
                  });
                }}
                onOperationToggle={({ uuid, operations }) => {
                  updateElementInList(uuid, { operations }, state.editingData.elements);
                  const elementTree = getElementTree(editingData);
                  dispatch({
                    type: 'update',
                    payload: { editingData: { ...editingData }, elementTree }
                  });
                  const idraw = sharedStore.get('idraw');
                  if (operations.locked === true) {
                    idraw?.cancelElements();
                  }
                }}
                onSelect={(e) => {
                  if (!selectedUUIDs?.includes(e.uuids[0])) {
                    selectElementsByPositions(e.positions);
                  }
                }}
                onDrop={(e) => {
                  const { elements } = moveElementPosition(editingData.elements, {
                    from: e.from,
                    to: e.to
                  });

                  const targetElem = findElementFromListByPosition(e.to, editingData.elements);
                  if (targetElem) {
                    targetElem.x = 0;
                    targetElem.y = 0;
                  }

                  const elementTree = getElementTree(editingData);
                  dispatch({
                    type: 'update',
                    payload: { editingData: { ...editingData, ...{ elements: [...elements] } }, elementTree }
                  });
                }}
                onDelete={({ uuid }) => {
                  sharedEvent.trigger('deleteElement', { uuid });
                }}
                onGoToGroup={(e) => {
                  sharedEvent.trigger('resetEditingView', { type: 'go-to-next-group', position: e.position });
                }}
                onExpand={(keys, { node }) => {
                  const currentKey = node.key as string;
                  if (currentKey) {
                    let newKeys = [...expandedElementKeys];
                    if (expandedElementKeys.includes(currentKey)) {
                      newKeys.splice(newKeys.indexOf(currentKey), 1);
                    } else {
                      newKeys = [...newKeys, ...[currentKey]];
                    }
                    setExpandedElementKeys(newKeys);
                  }
                }}
              />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />
            )}
          </div>
        </Dropdown>
      )
    }
  ];

  return useMemo(() => {
    return (
      <div
        style={style}
        className={classnames(rootClassName, className)}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        <Collapse
          ghost
          collapsible="icon"
          items={items}
          size="small"
          activeKey={activeKeys}
          onChange={(e) => {
            if (Array.isArray(e)) {
              const currentKeys = [...e];
              setActiveKeys(currentKeys);
              resetContentHeight(currentKeys);
            }
          }}
        />
      </div>
    );
  }, [
    height,
    pageTreeHeight,
    elementTreeHeight,
    pageTree,
    elementTree,
    selectedUUIDs,
    expandedElementKeys,
    data.elements,
    editingData.elements,
    editingDataPosition,
    inPageOverview,
    selectedPageUUIDs,
    moduleLocale
  ]);
};

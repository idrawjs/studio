import React, { useContext, useEffect, useMemo, useState, useRef } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { generateClassName, ElementTree, PageTree, getElementTree, IconDoubleLeft, IconLeft, IconLayout, getPageTree } from '@idraw/studio-base';
import { updateElementInList, moveElementPosition, getGroupQueueFromList, findElementFromListByPosition } from 'idraw';
import type { ElementPosition } from 'idraw';
import { Dropdown, Button, Collapse } from 'antd';
import type { CollapseProps } from 'antd';
import { Context } from '../context';
import type { SharedEvent, SharedStore, HookUseContextMenuOptions, StudioState } from '../../types';

const modName = 'mod-panel-page';

export interface PanelPageProps {
  className?: string;
  height: number;
  style?: CSSProperties;
  defaultSelectedElementUUIDs?: string[];
  sharedStore: SharedStore;
  sharedEvent: SharedEvent;
  useContextMenuOptions: HookUseContextMenuOptions;
}

const pageTreeKey = 'page-tree';
const elementTreeKey = 'element-tree';

const pageTreeHeightRatio = 1;
const elementTreeHeightRatio = 3;

export const PanelPage = (props: PanelPageProps) => {
  const { className, style, height, defaultSelectedElementUUIDs = [], sharedStore, sharedEvent, useContextMenuOptions } = props;
  const { state, dispatch } = useContext(Context);
  const { pageTree, elementTree, selectedUUIDs, editingData, editingDataPosition, data } = state;
  const refElementTree = useRef<{
    scrollTo: (e: { key: string | number; align?: 'top' | 'bottom' | 'auto'; offset?: number }) => void;
  } | null>(null);
  const refPageTree = useRef<{
    scrollTo: (e: { key: string | number; align?: 'top' | 'bottom' | 'auto'; offset?: number }) => void;
  } | null>(null);

  const headerHeight = 32;
  const refContentActiveKeys = useRef<string[]>([pageTreeKey, elementTreeKey]);
  const [pageTreeHeight, setPageTreeHeight] = useState<number>(0);
  const [elementTreeHeight, setElementTreeHeight] = useState<number>(0);

  const [expandedElementKeys, setExpandedElementKeys] = useState<string[]>(defaultSelectedElementUUIDs);
  const rootClassName = generateClassName(modName);
  const contentClassName = generateClassName(modName, 'content');
  const headerClassName = generateClassName(modName, 'header');
  const headerTitleClassName = generateClassName(modName, 'header', 'title');
  const headerBtnClassName = generateClassName(modName, 'header', 'btn');
  const [contextMenuOptions] = useContextMenuOptions({ sharedEvent, sharedStore });
  const [inPageOverview, setInPageOverview] = useState<boolean>(false);

  const getSelectedPageKeys = () => {
    const keys: string[] = [];
    const elem = findElementFromListByPosition([editingDataPosition[0]], state.data.elements);
    if (elem?.uuid) {
      keys.push(elem.uuid);
    }
    return keys;
  };
  const [selectedPageUUIDs, setSelectedPageUUIDs] = useState<string[]>(getSelectedPageKeys());

  useEffect(() => {}, [editingDataPosition]);

  const resetContentHeight = () => {
    const keys = refContentActiveKeys.current;
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
    if (inPageOverview === true) {
      refContentActiveKeys.current = [pageTreeKey];
      sharedEvent.trigger('resetEditingView', { type: 'back-root', position: null });
      setSelectedPageUUIDs([]);
      idraw?.disable('selectInGroup');
    } else {
      const pageKeys: string[] = [];
      if (pageTree.length > 0) {
        pageKeys.push(pageTree[0].uuid);
        sharedEvent.trigger('resetEditingView', { type: 'go-to-group', position: [0] });
      }
      setSelectedPageUUIDs(pageKeys);
      idraw?.enable('selectInGroup');
      refContentActiveKeys.current = [pageTreeKey, elementTreeKey];
    }
    resetContentHeight();
  }, [height, inPageOverview]);

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
    sharedEvent.on('scrollToLayer', ({ uuid }) => {
      if (uuid) {
        refElementTree.current?.scrollTo({
          key: uuid,
          align: 'top'
          // offset: 0
        });
      }
    });
  }, []);

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
      label: (
        <div className={headerClassName} style={{ height: headerHeight }}>
          <span style={{ marginRight: 10 }}>Pages</span>
          <Button
            className={headerBtnClassName}
            size="small"
            icon={<IconLayout />}
            type={inPageOverview ? 'primary' : 'default'}
            onClick={(e) => {
              e.stopPropagation();
              setInPageOverview(!inPageOverview);
            }}
          />
        </div>
      ),
      children: (
        <div className={contentClassName} style={{ height: pageTreeHeight }}>
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
            onOperationToggle={({}) => {
              // updateElementInList(uuid, { operations }, state.editingData.elements);
              // const elementTree = getElementTree(editingData);
              // dispatch({
              //   type: 'update',
              //   payload: { editingData: { ...editingData }, elementTree }
              // });
            }}
            onSelect={(e) => {
              if (e?.positions.length === 1) {
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
            onDelete={({}) => {
              // sharedEvent.trigger('deleteElement', { uuid });
            }}
          />
        </div>
      )
    },
    {
      key: elementTreeKey,
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
      collapsible: inPageOverview ? 'disabled' : undefined,
      children: inPageOverview ? null : (
        <Dropdown menu={{ items: contextMenuOptions }} trigger={['contextMenu']}>
          <div className={contentClassName} style={{ height: elementTreeHeight }}>
            <ElementTree
              ref={refElementTree}
              height={elementTreeHeight}
              treeData={elementTree}
              selectedKeys={selectedUUIDs}
              expandedKeys={expandedElementKeys}
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
          </div>
        </Dropdown>
      )
    }
  ];

  return useMemo(() => {
    if (!(Array.isArray(elementTree) && elementTree.length > 0)) {
      return (
        <div
          style={style}
          className={classnames(rootClassName, className)}
          onContextMenu={(e) => {
            e.preventDefault();
          }}
        >
          <div className={headerClassName}>...</div>
          <div className={contentClassName}>
            <div style={{ padding: '20px 0', textAlign: 'center' }}>Empty</div>
          </div>
          {/* <div className={footerClassName}>...</div> */}
        </div>
      );
    }

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
          items={items}
          size="small"
          defaultActiveKey={refContentActiveKeys.current}
          onChange={(e) => {
            if (Array.isArray(e)) {
              refContentActiveKeys.current = [...e];
            }
            resetContentHeight();
          }}
        />
      </div>
    );
  }, [
    height,
    pageTreeHeight,
    elementTreeHeight,
    elementTree,
    selectedUUIDs,
    expandedElementKeys,
    data.elements,
    editingData.elements,
    editingDataPosition,
    contextMenuOptions,
    resetContentHeight,
    inPageOverview,
    selectedPageUUIDs
  ]);
};

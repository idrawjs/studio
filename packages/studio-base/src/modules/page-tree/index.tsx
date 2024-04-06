import React, { useMemo } from 'react';
import classnames from 'classnames';
import { Tree } from 'antd';
import type { CSSProperties } from 'react';
import type { TreeProps } from 'antd';
import type { ElementPosition } from 'idraw';
import { wrapTreeViewData } from './wrap';
import type { TreeNodeProps } from './tree-node';
import type { PageTreeData } from '../../types';
import { IconDown } from '../../icons';
import { generateClassName } from '../../css';

const { DirectoryTree } = Tree;
const modName = 'base-page-tree';

export type PageTreeProps = Pick<TreeNodeProps, 'onTitleChange' | 'onOperationToggle'> & {
  height: number;
  className?: string;
  style?: CSSProperties;
  treeData?: PageTreeData;
  selectedKeys?: string[];
  defaultExpandedKeys?: string[];
  expandedKeys?: string[];
  onSelect?: (e: { uuids: string[]; positions: ElementPosition[] }) => void;
  onDrop?: (e: { from: ElementPosition; to: ElementPosition }) => void;
  onDelete?: (e: { uuid: string }) => void;
};

const treePosToElementPosition = (pos: string) => {
  const elemPos: ElementPosition = pos.split('-').map((i) => parseInt(i));
  elemPos.shift();
  return elemPos;
};

export const PageTree = React.forwardRef((props: PageTreeProps, ref: any) => {
  const { height, className, style, treeData, onTitleChange, onOperationToggle, onSelect, selectedKeys, onDrop, defaultExpandedKeys, expandedKeys, onDelete } =
    props;
  const onSelectNode: TreeProps['onSelect'] = (selectedKeys, info) => {
    const pos = treePosToElementPosition(info.node.pos);
    const positions: ElementPosition[] = [pos];
    const uuids = [selectedKeys[0]] as string[];
    onSelect?.({ uuids, positions });
  };

  const onElementDelete: PageTreeProps['onDelete'] = ({ uuid }) => {
    onDelete?.({ uuid });
  };

  return useMemo(() => {
    const wrappedTreeData = wrapTreeViewData(treeData || [], {
      parentModName: modName,
      generateClassName,
      onTitleChange,
      onOperationToggle,
      onDelete: onElementDelete,
      position: [],
      selectedKeys: selectedKeys || []
    });

    return (
      <DirectoryTree
        ref={ref}
        height={height}
        style={style}
        className={classnames(generateClassName(modName), className)}
        showLine
        blockNode
        // multiple
        selectedKeys={selectedKeys}
        switcherIcon={<IconDown />}
        // icon={(props: any) => {
        //   const type: ElementType | undefined = props?.data?.title?.props?.type;
        //   return getIcon(type);
        // }}
        icon={null}
        onSelect={onSelectNode}
        treeData={wrappedTreeData}
        defaultExpandedKeys={defaultExpandedKeys}
        expandedKeys={expandedKeys}
        draggable={{
          icon: false,
          nodeDraggable: () => true
        }}
        onDrop={(info) => {
          const { dragNode, node, dropToGap, dropPosition } = info;
          const from: ElementPosition = treePosToElementPosition(dragNode.pos);
          const to: ElementPosition = treePosToElementPosition(node.pos);
          if (dropToGap === true && dropPosition >= 0) {
            to[to.length - 1] = dropPosition;
          } else if (node.dragOverGapBottom === true) {
            to[to.length - 1] = to[to.length - 1] + 1;
          } else if (node.dragOverGapTop === true) {
            to[to.length - 1] = Math.max(0, to[to.length - 1] - 1);
          } else if (node.dragOver === true) {
            to.push(0);
          }
          onDrop?.({ from, to });
        }}
      />
    );
  }, [className, style, onSelectNode, treeData, selectedKeys]);
});

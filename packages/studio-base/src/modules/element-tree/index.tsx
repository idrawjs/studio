import React, { useMemo } from 'react';
import classnames from 'classnames';
import { Tree } from 'antd';
import type { CSSProperties } from 'react';
import type { TreeProps, TreeDataNode } from 'antd';
import type { ElementPosition } from 'idraw';
import { wrapTreeViewData } from './wrap';
import type { TreeNodeProps } from './tree-node';
import type { ElementTreeData } from '../../types';
import { IconDown } from '../../icons';
import { generateClassName } from '../../css';

const { DirectoryTree } = Tree;
const modName = 'base-element-tree';

export type ElementTreeProps = Pick<TreeNodeProps, 'onTitleChange' | 'onOperationToggle'> & {
  height: number;
  className?: string;
  style?: CSSProperties;
  treeData?: ElementTreeData;
  selectedKeys?: string[];
  defaultExpandedKeys?: string[];
  onExpand?: (keys: string[], e: { expanded: boolean; nativeEvent: React.PointerEvent; node: TreeDataNode }) => void;
  defaultExpandAll?: boolean;
  onSelect?: (e: { uuids: string[]; positions: ElementPosition[] }) => void;
  onDrop?: (e: { from: ElementPosition; to: ElementPosition }) => void;
  onDelete?: (e: { uuid: string }) => void;
  onGoToGroup?: (e: { uuid: string; position: ElementPosition }) => void;
};

const treePosToElementPosition = (pos: string) => {
  const elemPos: ElementPosition = pos.split('-').map((i) => parseInt(i));
  elemPos.shift();
  return elemPos;
};

export const ElementTree = React.forwardRef((props: ElementTreeProps, ref: any) => {
  const {
    height,
    className,
    style,
    treeData,
    onTitleChange,
    onOperationToggle,
    onSelect,
    selectedKeys,
    onDrop,
    defaultExpandedKeys,
    onDelete,
    onExpand,
    onGoToGroup
  } = props;

  const onSelectNode: TreeProps['onSelect'] = (selectedKeys, info) => {
    const pos = treePosToElementPosition(info.node.pos);
    const positions: ElementPosition[] = [pos];
    const uuids = [selectedKeys[0]] as string[];
    onSelect?.({ uuids, positions });
  };

  const onElementDelete: ElementTreeProps['onDelete'] = ({ uuid }) => {
    onDelete?.({ uuid });
  };

  return useMemo(() => {
    const wrappedTreeData = wrapTreeViewData(treeData || [], {
      parentModName: modName,
      generateClassName,
      onTitleChange,
      onOperationToggle,
      onDelete: onElementDelete,
      onGoToGroup,
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
        icon={null}
        onSelect={onSelectNode}
        treeData={wrappedTreeData}
        defaultExpandedKeys={defaultExpandedKeys}
        onExpand={onExpand as any}
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

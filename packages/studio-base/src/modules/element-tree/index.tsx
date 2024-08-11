import React, { useMemo } from 'react';
import classnames from 'classnames';
import { Tree } from 'antd';
import type { CSSProperties } from 'react';
import type { TreeProps, TreeDataNode } from 'antd';
import type { ElementPosition } from 'idraw';
import { wrapTreeViewData } from './wrap';
import type { TreeNodeProps } from './tree-node';
import type { ElementTreeData, ElementTreeNode } from '../../types';
import { IconDown } from '../../icons';
import { generateClassName } from '../../css';

const { DirectoryTree } = Tree;
const modName = 'base-element-tree';

function reverseElementPosition(position: ElementPosition, treeData: ElementTreeData, opts?: { isToPosition: boolean }): ElementPosition {
  const newPosition: ElementPosition = [];
  let targetNodeList: ElementTreeNode[] = treeData;
  for (let i = 0; i < position.length; i++) {
    const index = position[i];
    let reverseIndex = -1;
    if (index === 0) {
      reverseIndex = targetNodeList.length - 1;
    } else if (index >= targetNodeList.length - 1) {
      reverseIndex = 0;
    } else {
      reverseIndex = targetNodeList.length - 1 - index;
    }
    newPosition.push(reverseIndex);
    targetNodeList = targetNodeList[reverseIndex]?.children as ElementTreeNode[];
  }

  if (opts?.isToPosition === true) {
    if (newPosition.length > 0) {
      newPosition[newPosition.length - 1] += 1;
    }
  }
  return newPosition;
}

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
  onContextMenu?: (e: { uuids: string[]; positions: ElementPosition[] }) => void;
  onDrop?: (e: { from: ElementPosition; to: ElementPosition }) => void;
  onDelete?: (e: { uuid: string }) => void;
  onGoToGroup?: (e: { uuid: string; position: ElementPosition }) => void;
  reverse?: boolean;
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
    onContextMenu,
    selectedKeys,
    onDrop,
    defaultExpandedKeys,
    onDelete,
    onExpand,
    onGoToGroup,
    reverse
  } = props;

  const onSelectNode: TreeProps['onSelect'] = (skeys, info) => {
    const pos = treePosToElementPosition(info.node.pos);
    let positions: ElementPosition[] = [pos];
    if (reverse === true) {
      positions = [reverseElementPosition(pos, treeData || [])];
    }
    const uuids = [skeys[0]] as string[];
    onSelect?.({ uuids, positions });
  };

  const onElementDelete: ElementTreeProps['onDelete'] = ({ uuid }) => {
    onDelete?.({ uuid });
  };

  return useMemo(() => {
    const wrappedTreeData = wrapTreeViewData(treeData || [], {
      parentModName: modName,
      generateClassName,
      onSelect: (e) => {
        onSelect?.(e);
      },
      onContextMenu,
      onTitleChange,
      onOperationToggle,
      onDelete: onElementDelete,
      onGoToGroup,
      position: [],
      selectedKeys: selectedKeys || [],
      reverse: !!reverse
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
          let resultFrom = from;
          let resultTo = to;
          if (reverse === true) {
            resultFrom = reverseElementPosition(from, treeData || []);
            resultTo = reverseElementPosition(to, treeData || [], { isToPosition: true });
          }

          onDrop?.({ from: resultFrom, to: resultTo });
        }}
      />
    );
  }, [className, style, onSelectNode, treeData, selectedKeys]);
});

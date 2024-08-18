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
  reverse?: boolean;
};

const treePosToElementPosition = (pos: string) => {
  const elemPos: ElementPosition = pos.split('-').map((i) => parseInt(i));
  elemPos.shift();
  return elemPos;
};

export function reversePagePosition(position: ElementPosition, treeData: PageTreeData, opts?: { isToPosition: boolean }): ElementPosition {
  const newPosition: ElementPosition = [];
  for (let i = 0; i < position.length; i++) {
    const index = position[i];
    let reverseIndex = -1;
    if (index === 0) {
      reverseIndex = treeData.length - 1;
    } else if (index >= treeData.length - 1) {
      reverseIndex = 0;
    } else {
      reverseIndex = treeData.length - 1 - index;
    }
    newPosition.push(reverseIndex);
  }

  if (opts?.isToPosition === true) {
    if (newPosition.length > 0) {
      newPosition[newPosition.length - 1] += 1;
    }
  }
  return newPosition;
}

export const PageTree = React.forwardRef((props: PageTreeProps, ref: any) => {
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
    expandedKeys,
    onDelete,
    // reverse // TODO
    reverse = true
  } = props;
  const onSelectNode: TreeProps['onSelect'] = (selectedKeys, info) => {
    const pos = treePosToElementPosition(info.node.pos);
    let positions: ElementPosition[] = [pos];
    if (reverse === true) {
      positions = [reversePagePosition(pos, treeData || [])];
    }
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
        multiple
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
          let resultFrom = from;
          let resultTo = to;
          if (reverse === true) {
            resultFrom = reversePagePosition(from, treeData || []);
            resultTo = reversePagePosition(to, treeData || [], { isToPosition: true });
          }

          onDrop?.({ from: resultFrom, to: resultTo });
        }}
      />
    );
  }, [className, style, onSelectNode, treeData, selectedKeys]);
});

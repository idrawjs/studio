import React from 'react';
import type { ElementPosition } from 'idraw';
import type { PageTreeNode, PageTreeData, PageTreeViewNode, PageTreeViewData } from '../../types';
import { TreeNode } from './tree-node';
import type { TreeNodeProps } from './tree-node';

type WrapOptions = Pick<TreeNodeProps, 'onTitleChange' | 'onOperationToggle' | 'onDelete'> & {
  parentModName: string;
  generateClassName: (...args: string[]) => string;
  position: ElementPosition;
  onSelect?: (e: { uuids: string[]; positions: ElementPosition[] }) => void;
  selectedKeys: string[];
};

export function wrapTreeViewData(elementTree: PageTreeData, opts: WrapOptions): PageTreeViewData {
  const tree: PageTreeViewData = [];
  const { position } = opts;
  if (Array.isArray(elementTree)) {
    const pos = [...position];
    elementTree.forEach((node, i) => {
      pos.push(i);
      tree.push(wrapTreeViewNode(node, { ...opts, ...{ position: [...pos] } }));
      pos.pop();
    });
  }
  return tree;
}

const wrapTreeViewNode = (treeNode: PageTreeNode, opts: WrapOptions) => {
  const { parentModName, onTitleChange, onOperationToggle, onDelete, onSelect, position, selectedKeys } = opts;
  const node: PageTreeViewNode = {
    key: treeNode.key,
    // title: treeNode.title,
    title: (
      <TreeNode
        parentModName={parentModName}
        uuid={treeNode.key}
        title={treeNode.title}
        position={position}
        operations={treeNode.operations}
        nodeKey={treeNode.key}
        type={treeNode.type}
        generateClassName={opts.generateClassName}
        onTitleChange={onTitleChange}
        onOperationToggle={onOperationToggle}
        onDelete={onDelete}
        onSelect={onSelect}
        isSelected={selectedKeys?.includes(treeNode.key)}
      />
    )
  };

  return node;
};

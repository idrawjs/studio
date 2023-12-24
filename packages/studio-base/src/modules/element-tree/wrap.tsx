import React from 'react';
import type { ElementPosition } from 'idraw';
import type { ElementTreeNode, ElementTreeData, ElementTreeViewNode, ElementTreeViewData } from '../../types';
import { TreeNode } from './tree-node';
import type { TreeNodeProps } from './tree-node';

type WrapOptions = Pick<TreeNodeProps, 'onTitleChange' | 'onOperationToggle' | 'onDelete'> & {
  getPrefixName: (...args: string[]) => string;
  position: ElementPosition;
  onSelect?: (e: { uuids: string[]; positions: ElementPosition[] }) => void;
};

export function wrapTreeViewData(treeData: ElementTreeData, opts: WrapOptions): ElementTreeViewData {
  const tree: ElementTreeViewData = [];
  const { position } = opts;
  if (Array.isArray(treeData)) {
    const pos = [...position];
    treeData.forEach((node, i) => {
      pos.push(i);
      tree.push(wrapTreeViewNode(node, { ...opts, ...{ position: [...pos] } }));
      pos.pop();
    });
  }
  return tree;
}

const wrapTreeViewNode = (treeNode: ElementTreeNode, opts: WrapOptions) => {
  const { onTitleChange, onOperationToggle, onDelete, onSelect, position } = opts;
  const node: ElementTreeViewNode = {
    key: treeNode.key,
    // title: treeNode.title,
    title: (
      <TreeNode
        uuid={treeNode.key}
        title={treeNode.title}
        position={position}
        operations={treeNode.operations}
        nodeKey={treeNode.key}
        type={treeNode.type}
        getPrefixName={opts.getPrefixName}
        onTitleChange={onTitleChange}
        onOperationToggle={onOperationToggle}
        onDelete={onDelete}
        onSelect={onSelect}
      />
    ),
    children: []
  };
  if (Array.isArray(treeNode.children)) {
    const pos = [...position];
    treeNode.children.forEach((child, i) => {
      pos.push(i);
      node.children.push(wrapTreeViewNode(child, { ...opts, ...{ position: [...pos] } }));
      pos.pop();
    });
  }
  return node;
};

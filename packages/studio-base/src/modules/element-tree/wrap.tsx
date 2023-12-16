import React from 'react';
import type { ElementTreeNode, ElementTreeData, ElementTreeViewNode, ElementTreeViewData } from '../../types';
import { TreeNode } from './tree-node';
import type { TreeNodeProps } from './tree-node';

type WrapOptions = Pick<TreeNodeProps, 'onTitleChange' | 'onOperationToggle' | 'onDelete'> & {
  getPrefixName: (...args: string[]) => string;
};

export function wrapTreeViewData(treeData: ElementTreeData, opts: WrapOptions): ElementTreeViewData {
  const tree: ElementTreeViewData = [];
  if (Array.isArray(treeData)) {
    treeData.forEach((node) => {
      tree.push(wrapTreeViewNode(node, opts));
    });
  }
  return tree;
}

const wrapTreeViewNode = (treeNode: ElementTreeNode, opts: WrapOptions) => {
  const { onTitleChange, onOperationToggle, onDelete } = opts;
  const node: ElementTreeViewNode = {
    key: treeNode.key,
    // title: treeNode.title,
    title: (
      <TreeNode
        title={treeNode.title}
        operatinos={treeNode.operations}
        nodeKey={treeNode.key}
        type={treeNode.type}
        getPrefixName={opts.getPrefixName}
        onTitleChange={onTitleChange}
        onOperationToggle={onOperationToggle}
        onDelete={onDelete}
      />
    ),
    children: []
  };
  if (Array.isArray(treeNode.children)) {
    treeNode.children.forEach((child) => {
      node.children.push(wrapTreeViewNode(child, opts));
    });
  }
  return node;
};

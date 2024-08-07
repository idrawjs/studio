import React from 'react';
import type { ElementPosition } from 'idraw';
import type { ElementTreeNode, ElementTreeData, ElementTreeViewNode, ElementTreeViewData } from '../../types';
import { TreeNode } from './tree-node';
import type { TreeNodeProps } from './tree-node';

type WrapOptions = Pick<TreeNodeProps, 'onTitleChange' | 'onOperationToggle' | 'onDelete' | 'onGoToGroup'> & {
  parentModName: string;
  generateClassName: (...args: string[]) => string;
  position: ElementPosition;
  onSelect?: (e: { uuids: string[]; positions: ElementPosition[] }) => void;
  onContextMenu?: (e: { uuids: string[]; positions: ElementPosition[] }) => void;
  selectedKeys: string[];
  reverse: boolean;
};

export function wrapTreeViewData(elementTree: ElementTreeData, opts: WrapOptions): ElementTreeViewData {
  const tree: ElementTreeViewData = [];
  const { position, reverse } = opts;
  if (Array.isArray(elementTree)) {
    const pos = [...position];
    if (reverse === true) {
      for (let i = elementTree.length - 1; i >= 0; i--) {
        const node = elementTree[i];
        pos.push(i);
        tree.push(wrapTreeViewNode(node, { ...opts, ...{ position: [...pos] } }));
        pos.pop();
      }
    } else {
      elementTree.forEach((node, i) => {
        pos.push(i);
        tree.push(wrapTreeViewNode(node, { ...opts, ...{ position: [...pos] } }));
        pos.pop();
      });
    }
  }
  return tree;
}

const wrapTreeViewNode = (treeNode: ElementTreeNode, opts: WrapOptions) => {
  const { parentModName, onTitleChange, onOperationToggle, onDelete, onSelect, onContextMenu, onGoToGroup, position, selectedKeys } = opts;
  const node: ElementTreeViewNode = {
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
        onContextMenu={onContextMenu}
        onGoToGroup={onGoToGroup}
        isSelected={selectedKeys?.includes(treeNode.key)}
      />
    ),
    children: []
  };
  if (Array.isArray(treeNode.children)) {
    const pos = [...position];
    if (opts.reverse === true) {
      for (let i = treeNode.children.length - 1; i >= 0; i--) {
        const child = treeNode.children[i];
        pos.push(i);
        node.children.push(wrapTreeViewNode(child, { ...opts, ...{ position: [...pos] } }));
        pos.pop();
      }
    } else {
      treeNode.children.forEach((child, i) => {
        pos.push(i);
        node.children.push(wrapTreeViewNode(child, { ...opts, ...{ position: [...pos] } }));
        pos.pop();
      });
    }
  }
  return node;
};

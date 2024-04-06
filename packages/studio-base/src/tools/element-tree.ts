import type { Data, Element, ElementType } from 'idraw';
import type { ElementTreeData, ElementTreeNode } from '../types';

const getElementTreeNode = (elem: Element<ElementType>) => {
  const node: ElementTreeNode = {
    uuid: elem.uuid,
    key: elem.uuid,
    title: elem.name || (elem as Element<'text'>).detail.text || elem.type || 'unamed',
    type: elem.type,
    children: [],
    operations: elem.operations || {}
  };
  if (elem.type === 'group' && Array.isArray((elem as Element<'group'>)?.detail?.children)) {
    (elem as Element<'group'>).detail.children.forEach((child) => {
      node.children.push(getElementTreeNode(child));
    });
  }
  return node;
};

export function getElementTree(data: Data): ElementTreeData {
  const elementTree: ElementTreeData = [];
  data.elements.forEach((elem) => {
    const node = getElementTreeNode(elem);
    elementTree.push(node);
  });
  return elementTree;
}

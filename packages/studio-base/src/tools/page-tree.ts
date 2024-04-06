import type { Element, ElementType } from 'idraw';
import type { PageTreeData, PageTreeNode, StudioData } from '../types';

const getPageTreeNode = (elem: Element<ElementType>) => {
  const node: PageTreeNode = {
    uuid: elem.uuid,
    key: elem.uuid,
    title: elem.name || (elem as Element<'text'>).detail.text || elem.type || 'unamed',
    type: elem.type,
    operations: elem.operations || {}
  };
  return node;
};

export function getPageTree(data: StudioData): PageTreeData {
  const elementTree: PageTreeData = [];
  data.elements.forEach((elem) => {
    if (elem.type === 'group' && elem.extends?.isPage === true) {
      const node = getPageTreeNode(elem);
      elementTree.push(node);
    }
  });
  return elementTree;
}

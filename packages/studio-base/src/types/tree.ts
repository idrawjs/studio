import type { ElementType, ElementOperations } from 'idraw';

export type ElementTreeNode = {
  uuid: string;
  key: string;
  title: string;
  type?: ElementType;
  operations: ElementOperations;
  children: ElementTreeNode[];
};

export type ElementTreeData = ElementTreeNode[];

export type ElementTreeViewNode = {
  key: string;
  // uuid: string;
  title: React.ReactNode;
  children: ElementTreeViewNode[];
};

export type ElementTreeViewData = ElementTreeViewNode[];

export type PageTreeNode = {
  uuid: string;
  key: string;
  title: string;
  type?: ElementType;
  operations: ElementOperations;
};

export type PageTreeData = PageTreeNode[];

export type PageTreeViewNode = {
  key: string;
  title: React.ReactNode;
};

export type PageTreeViewData = PageTreeViewNode[];

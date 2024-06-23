import type { Data, DataLayout, Element, ElementPosition } from 'idraw';
import { getElementPositionFromList, deepClone, findElementFromListByPosition, is, calcElementListSize, createUUID } from 'idraw';
import type { StudioData } from '@idraw/studio-base';

export function cloneEditingData(editingUUID: string | null, data: Data): Data {
  if (!editingUUID) {
    return deepClone(data);
  }
  const position = getElementPositionFromList(editingUUID, data.elements || []);
  return cloneEditingDataByPosition(position, data);
}

export function cloneEditingDataByPosition(position: ElementPosition, data: Data): Data {
  if (position.length === 0) {
    return deepClone(data);
  }
  const elem = findElementFromListByPosition(position, data.elements);

  const editingData: Data = {
    elements: [],
    assets: data.assets // TODO
  };
  if (elem?.type === 'group') {
    const { w, h, detail } = elem as Element<'group'>;
    const { children, ...restDetail } = detail;
    const layout: DataLayout = {
      x: 0,
      y: 0,
      w: w,
      h: h,
      detail: {
        ...restDetail
      },
      operations: {
        position: 'relative'
      }
    };
    editingData.elements = deepClone(children || []);
    editingData.layout = layout;
  }
  return editingData;
}

export function updateEditingDataChildrenToData(editingPosition: ElementPosition, editingData: Data, data: Data) {
  if (editingPosition.length > 0) {
    const elem = findElementFromListByPosition(editingPosition, data.elements);
    if (elem?.type === 'group') {
      (elem as Element<'group'>).detail.children = editingData.elements;
    }
  }
}

export function updateEditingDataLayoutToTargetGroup(editingData: Data, editingPosition: ElementPosition, data: Data) {
  if (editingPosition.length > 0 && editingData?.layout) {
    const layout = editingData.layout;
    const position = editingPosition;
    const elem = findElementFromListByPosition(position, data.elements);

    if (elem?.type === 'group') {
      if (is.w(layout.w)) {
        elem.w = layout.w;
      }
      if (is.h(layout.h)) {
        elem.h = layout.h;
      }
      elem.detail = {
        ...elem.detail,
        ...layout.detail
      };
    }
  }
}

export function wrapPageData(data: Data | StudioData): StudioData {
  let pageData: StudioData = data;

  for (let i = 0; i < data.elements.length; i++) {
    const elem = data.elements[i];
    if (elem.type === 'group' && elem.extends?.isPage === true) {
      return pageData;
    }
  }

  const listSize = calcElementListSize(data.elements);
  let { x, y, w, h } = listSize;
  if (is.x(data?.layout?.x)) {
    x = Math.min(x, data.layout?.x as number);
  }
  if (is.y(data?.layout?.y)) {
    y = Math.min(y, data.layout?.y as number);
  }
  if (is.w(data?.layout?.w)) {
    w = Math.max(w, data.layout?.w as number);
  }
  if (is.h(data?.layout?.h)) {
    h = Math.max(h, data.layout?.h as number);
  }

  data.elements.forEach((elem) => {
    elem.x -= x;
    elem.y -= y;
  });

  pageData = {
    elements: [
      {
        uuid: createUUID(),
        name: 'Default page',
        type: 'group',
        x: 0,
        y: 0,
        w,
        h,
        detail: {
          ...data.layout?.detail,
          children: data.elements,
          ...(w === 0 || h === 0 ? { overflow: 'visible' } : {})
        },
        extends: {
          isPage: true
        }
      }
    ],
    assets: data.assets
  };

  return pageData;
}

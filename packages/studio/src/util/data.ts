import type { Data, DataLayout, Element, ElementPosition } from 'idraw';
import { getElementPositionFromList, deepClone, findElementFromListByPosition, is } from 'idraw';

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
        disableTop: true,
        disableTopLeft: true,
        disableTopRight: true,
        disableLeft: true,
        disableBottomLeft: true
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

import type { Data, Element, ElementPosition } from 'idraw';
import { getElementPositionFromList, deepClone, findElementFromListByPosition } from 'idraw';

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
    editingData.elements = deepClone((elem as Element<'group'>).detail.children || []);
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

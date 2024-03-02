import { findElementsFromList, deepCloneElement, getElementPositionFromList, eventKeys } from 'idraw';
import { getElementTree } from '@idraw/studio-base';
import type { Data, Element } from 'idraw';
import type { SharedEvent, SharedStore } from '../types';

export function initActionEvent(opts: { sharedEvent: SharedEvent; sharedStore: SharedStore }) {
  const { sharedEvent, sharedStore } = opts;

  sharedEvent.on('copy', () => {
    const idraw = sharedStore.get('idraw');
    const selectedUUIDs = sharedStore.get('selectedUUIDs');
    const data = idraw?.getData();
    if (data && Array.isArray(selectedUUIDs) && selectedUUIDs.length > 0) {
      const elements = findElementsFromList(selectedUUIDs, data.elements);
      if (elements.length > 0) {
        sharedStore.set('clipboard', {
          type: 'copy-elements',
          data: elements
        });
      }
    }
  });

  sharedEvent.on('paste', () => {
    const idraw = sharedStore.get('idraw');
    const clipboardCache = sharedStore.get('clipboard');
    const selectedUUIDs = sharedStore.get('selectedUUIDs');

    if (idraw && ['copy-elements', 'cut-elements'].includes(clipboardCache?.type) && Array.isArray(clipboardCache.data)) {
      const elements: Element[] = clipboardCache.data;
      const targetElements: Element[] = [];
      if (clipboardCache.type === 'copy-elements') {
        for (let i = 0; i < elements.length; i++) {
          if (elements[i]) {
            const elem = elements[i];
            const target = deepCloneElement(elem);
            target.name = `${target.name} copy`;
            targetElements.push(target);
          }
        }
      } else if (clipboardCache.type === 'cut-elements') {
        for (let i = 0; i < elements.length; i++) {
          if (elements[i]) {
            const elem = elements[i];
            const target = deepCloneElement(elem);
            target.name = `${target.name}`;
            targetElements.push(target);
          }
        }
      }
      const data = idraw?.getData() as Data;
      const position = getElementPositionFromList(selectedUUIDs[0], data?.elements || []);
      if (position.length > 0) {
        position[position.length - 1]++;
      }
      targetElements.forEach((elem) => {
        idraw.addElement(elem, { position });
      });
      const editingData = idraw?.getData() as Data;
      const treeData = getElementTree(editingData);

      sharedEvent.trigger('dispatch', {
        type: 'update',
        payload: {
          editingData,
          treeData
        }
      });
      idraw.selectElement(targetElements[0].uuid);
      setTimeout(() => {
        sharedEvent.trigger('scrollToLayer', {
          uuid: targetElements[0].uuid
        });
      }, 100);

      // console.log('paste: elements ====== ', elements);
    }
  });

  sharedEvent.on('cut', () => {
    const idraw = sharedStore.get('idraw');
    const selectedUUIDs = sharedStore.get('selectedUUIDs');
    const data = idraw?.getData();
    if (data && Array.isArray(selectedUUIDs) && selectedUUIDs.length > 0) {
      const elements = findElementsFromList(selectedUUIDs, data.elements);

      if (elements.length > 0) {
        sharedStore.set('clipboard', {
          type: 'cut-elements',
          data: elements.map((elem) => deepCloneElement(elem))
        });
      }

      elements.forEach((elem) => {
        idraw?.deleteElement(elem.uuid);
      });
    }

    const editingData = idraw?.getData() as Data;
    const treeData = getElementTree(editingData);

    sharedEvent.trigger('dispatch', {
      type: 'update',
      payload: {
        editingData,
        treeData
      }
    });
    idraw?.trigger(eventKeys.clearSelect);
  });

  sharedEvent.on('delete', () => {
    const idraw = sharedStore.get('idraw');
    const selectedUUIDs = sharedStore.get('selectedUUIDs');
    const data = idraw?.getData();
    if (data && Array.isArray(selectedUUIDs) && selectedUUIDs.length > 0) {
      const elements = findElementsFromList(selectedUUIDs, data.elements);
      if (elements.length > 0) {
        for (let i = 0; i < elements.length; i++) {
          idraw?.deleteElement(elements[i].uuid);
        }
        const editingData = idraw?.getData() as Data;
        const treeData = getElementTree(editingData);
        sharedEvent.trigger('dispatch', {
          type: 'update',
          payload: {
            editingData,
            treeData
          }
        });
        idraw?.trigger(eventKeys.clearSelect);
      }
    }
  });
}

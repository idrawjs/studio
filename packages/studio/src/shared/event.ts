import { findElementsFromList, deepCloneElement } from 'idraw';
import type { Element } from 'idraw';
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
    const clipboardCache = sharedStore.get('clipboard');
    if (['copy-elements', 'cut-elements'].includes(clipboardCache?.type) && Array.isArray(clipboardCache.data)) {
      const elements: Element[] = clipboardCache.data;
      let targetElements: Element[] = [];
      if (clipboardCache.type === 'copy-elements') {
        for (let i = 0; i < elements.length; i++) {
          if (elements[i]) {
            const elem = elements[i];
            const target = deepCloneElement(elem);
            targetElements.push(target);
          }
        }
      } else if (clipboardCache.type === 'cut-elements') {
        targetElements = elements;
      }

      // targetElements.forEach((element) => {
      //   sharedEvent.trigger('addElement', {
      //     element
      //   });
      // });
      // console.log('paste: elements ====== ', elements);
    }
  });

  sharedEvent.on('cut', () => {
    // TODO
    console.log('sharedEvent cut ...');
  });
}

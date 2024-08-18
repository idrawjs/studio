import {
  findElementsFromList,
  deepCloneElement,
  getElementPositionFromList,
  eventKeys,
  parseFileToBase64,
  loadImage,
  createUUID,
  getElementPositionMapFromList,
  findElementQueueFromListByPosition,
  calcPointMoveElementInGroup
} from 'idraw';
import { getElementTree } from '@idraw/studio-base';
import type { Data, Element } from 'idraw';
import type { SharedEvent, SharedStore } from '../types';
import { parseClipboardReadList, type ClipboardReadItem } from '../util/clipboard';

function createInput() {
  const input = document.createElement('input');
  input.style.position = 'fixed';
  input.style.top = `-999999px`;
  input.style.left = `-999999px`;
  input.style.opacity = '0';
  document.body.appendChild(input);
  return input;
}

export function initActionEvent(opts: { sharedEvent: SharedEvent; sharedStore: SharedStore }) {
  const { sharedEvent, sharedStore } = opts;

  sharedEvent.on('copy', () => {
    const idraw = sharedStore.getStatic('idraw');
    const selectedUUIDs = sharedStore.get('selectedUUIDs');
    let data = idraw?.getData();
    let text: string | null = null;
    if (data && Array.isArray(selectedUUIDs) && selectedUUIDs.length > 0) {
      const elements = findElementsFromList(selectedUUIDs, data.elements);
      if (elements.length > 0) {
        text = JSON.stringify(elements);
      }
    }
    if (text) {
      const input = createInput();
      input.value = text;
      input.focus();
      input.select();
      document.execCommand('copy');
      input.remove();
    }

    return;
    // const idraw = sharedStore.getStatic('idraw');
    // const selectedUUIDs = sharedStore.get('selectedUUIDs');
    // const data = idraw?.getData();
    // if (data && Array.isArray(selectedUUIDs) && selectedUUIDs.length > 0) {
    //   const elements = findElementsFromList(selectedUUIDs, data.elements);
    //   if (elements.length > 0) {
    //     sharedStore.set('clipboard', {
    //       type: 'copy-elements',
    //       data: elements
    //     });
    //   }
    // }
  });

  sharedEvent.on('paste', () => {
    return;
    const input = createInput();
    input.addEventListener('paste', () => {
      // pasteFromClipboardReadList(
      //   [
      //     {
      //       type: 'text',
      //       text: input.value
      //     }
      //   ],
      //   opts
      // );
      // input.remove();
    });
    // input.addEventListener('change', () => {
    //   console.log('change.value  ------- ', input.value);
    // });
    setTimeout(() => {
      input.focus();
      const result = document.execCommand('paste', false);
      console.log('exec-cmd-result : ', result);
    }, 1000);
  });

  sharedEvent.on('cut', () => {
    const idraw = sharedStore.getStatic('idraw');
    const selectedUUIDs = sharedStore.get('selectedUUIDs');
    const data = idraw?.getData();
    if (data && Array.isArray(selectedUUIDs) && selectedUUIDs.length > 0) {
      const elements = findElementsFromList(selectedUUIDs, data.elements);

      const text = JSON.stringify(elements);
      const input = createInput();
      input.value = text;
      input.focus();
      input.select();
      document.execCommand('copy');
      input.remove();

      elements.forEach((elem) => {
        idraw?.deleteElement(elem.uuid);
      });
    }

    const editingData = idraw?.getData() as Data;
    const elementTree = getElementTree(editingData);

    sharedEvent.trigger('dispatch', {
      type: 'update',
      payload: {
        editingData,
        elementTree
      }
    });
    idraw?.trigger(eventKeys.CLEAR_SELECT);
  });

  sharedEvent.on('delete', () => {
    const idraw = sharedStore.getStatic('idraw');
    const selectedUUIDs = sharedStore.get('selectedUUIDs');
    const data = idraw?.getData();
    if (data && Array.isArray(selectedUUIDs) && selectedUUIDs.length > 0) {
      const elements = findElementsFromList(selectedUUIDs, data.elements);
      if (elements.length > 0) {
        for (let i = 0; i < elements.length; i++) {
          idraw?.deleteElement(elements[i].uuid);
        }
        const editingData = idraw?.getData() as Data;
        const elementTree = getElementTree(editingData);
        sharedEvent.trigger('dispatch', {
          type: 'update',
          payload: {
            editingData,
            elementTree
          }
        });
        idraw?.trigger(eventKeys.CLEAR_SELECT);
      }
    }
  });

  sharedEvent.on('undo', () => {
    const idraw = sharedStore?.getStatic('idraw');
    const snapshotRecorder = sharedStore.getStatic('snapshotRecorder');
    const data = snapshotRecorder?.undo(idraw?.getData());
    if (data) {
      sharedEvent?.trigger('resetEditingData', {
        editingData: {
          ...idraw?.getData(),
          ...data
        }
      });
      idraw?.cancelElements();
    }
  });
  sharedEvent.on('redo', () => {
    const idraw = sharedStore?.getStatic('idraw');
    const snapshotRecorder = sharedStore.getStatic('snapshotRecorder');
    const data = snapshotRecorder?.redo(idraw?.getData());
    if (data) {
      sharedEvent?.trigger('resetEditingData', {
        editingData: {
          ...idraw?.getData(),
          ...data
        }
      });
      idraw?.cancelElements();
    }
  });

  sharedEvent.on('arrowMoveElement', ({ type }) => {
    // TODO
    const idraw = sharedStore.getStatic('idraw');
    const selectedUUIDs = sharedStore.get('selectedUUIDs');
    const data = idraw?.getData();
    console.log('xxxx ------ ');
    if (data && Array.isArray(selectedUUIDs) && selectedUUIDs.length === 1) {
      const elements = data.elements || [];
      const uuid = selectedUUIDs[0];
      const positionMap = getElementPositionMapFromList([uuid], elements);
      const position = positionMap[uuid];
      if (Array.isArray(position) && position.length > 0) {
        const groupQueue = findElementQueueFromListByPosition(position, elements) as Element<'group'>[];
        const elem = groupQueue.pop() as unknown as Element;
        const start = { x: 0, y: 0 };
        const end = { x: 0, y: 0 };

        // TODO
        if (type === 'arrow-up') {
          end.y -= 1;
        } else if (type === 'arrow-down') {
          end.y += 1;
        } else if (type === 'arrow-left') {
          end.x -= 1;
        } else if (type === 'arrow-right') {
          end.x += 1;
        }

        const { moveX, moveY } = calcPointMoveElementInGroup(start, end, groupQueue);
        // TODO
        elem.x += moveX;
        elem.y += moveY;
        idraw?.updateElement(elem);
      }
    }
  });
}

async function pasteFromClipboardReadList(items: ClipboardReadItem[], opts: { sharedEvent: SharedEvent; sharedStore: SharedStore }) {
  const { sharedEvent, sharedStore } = opts;
  const idraw = sharedStore.getStatic('idraw');
  const selectedUUIDs = sharedStore.get('selectedUUIDs');

  let elements: Element[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.type === 'text' && item.text) {
      const text = item.text;
      if (text.startsWith('[{') && text.endsWith('}]')) {
        try {
          elements = JSON.parse(text) as Element[];
        } catch (err) {
          console.warn(err);
        }
      }
    } else if (item.type === 'file' && item.file) {
      const { file } = item;
      if (file.type?.startsWith('image/')) {
        const base64 = (await parseFileToBase64(file)) as string;
        const image = await loadImage(base64);

        // TODO
        const imageElem: Element<'image'> = {
          uuid: createUUID(),
          type: 'image',
          x: 0,
          y: 0,
          w: image.width,
          h: image.height,
          detail: {
            src: base64
          }
        };
        elements.push(imageElem);
      }
    }
  }

  if (elements.length > 0 && idraw) {
    const targetElements: Element[] = [];
    for (let i = 0; i < elements.length; i++) {
      if (elements[i]) {
        const elem = elements[i];
        const target = deepCloneElement(elem as Element);
        target.name = `${target.name} copy`;
        targetElements.push(target);
      }
    }

    if (targetElements.length > 0) {
      const data = idraw?.getData() as Data;
      const position = getElementPositionFromList(selectedUUIDs[0], data?.elements || []);
      if (position.length > 0) {
        position[position.length - 1]++;
      }
      targetElements.forEach((elem) => {
        idraw.addElement(elem, { position });
      });
      const editingData = idraw?.getData() as Data;
      const elementTree = getElementTree(editingData);

      sharedEvent.trigger('dispatch', {
        type: 'update',
        payload: {
          editingData,
          elementTree
        }
      });
      idraw.selectElement(targetElements[0].uuid);
      setTimeout(() => {
        sharedEvent.trigger('scrollToLayer', {
          uuid: targetElements[0].uuid
        });
      }, 100);
    }
  }
}

export function generatePasteEventCallback(opts: { sharedStore: SharedStore; sharedEvent: SharedEvent }) {
  const callback = async (e: ClipboardEvent) => {
    const items = await parseClipboardReadList(e);
    await pasteFromClipboardReadList(items, opts);
  };

  return callback;
}

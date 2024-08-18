import isHotkey from 'is-hotkey';
import type { SharedEvent, SharedStore, SharedEventMap } from '../types';

export const handleKeyboard = (
  e: KeyboardEvent,
  opts: {
    sharedEvent: SharedEvent;
    sharedStore: SharedStore;
  }
) => {
  const { sharedEvent } = opts;
  // if (isHotkey('mod+v', e)) {
  //   sharedEvent.trigger('paste');
  // } else
  if (isHotkey('mod+c', e)) {
    sharedEvent.trigger('copy');
  } else if (isHotkey('mod+x', e)) {
    sharedEvent.trigger('cut');
  } else if (isHotkey('del', e)) {
    sharedEvent.trigger('delete');
  } else if (isHotkey('backspace', e)) {
    sharedEvent.trigger('delete');
  } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
    const map: Record<string, SharedEventMap['arrowMoveElement']['type']> = {
      ArrowUp: 'arrow-up',
      ArrowDown: 'arrow-down',
      ArrowLeft: 'arrow-left',
      ArrowRight: 'arrow-right'
    };
    sharedEvent.trigger('arrowMoveElement', {
      type: map[e.code]
    });
  } else if (isHotkey('mod+s', e)) {
    console.log('Save ... '); //  TODO
  }
};

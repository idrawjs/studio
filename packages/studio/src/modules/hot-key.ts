import isHotkey from 'is-hotkey';
import type { SharedEvent, SharedStore } from '../types';

export const handleKeyboard = (
  e: KeyboardEvent,
  opts: {
    sharedEvent: SharedEvent;
    sharedStore: SharedStore;
  }
) => {
  const { sharedEvent } = opts;
  if (isHotkey('mod+c', e)) {
    sharedEvent.trigger('copy', undefined);
  } else if (isHotkey('mod+v', e)) {
    sharedEvent.trigger('paste', undefined);
  } else if (isHotkey('mod+x', e)) {
    sharedEvent.trigger('cut', undefined);
  } else if (isHotkey('del', e)) {
    sharedEvent.trigger('delete', undefined);
  } else if (isHotkey('backspace', e)) {
    sharedEvent.trigger('delete', undefined);
  } else if (isHotkey('mod+s', e)) {
    console.log('Save ... '); //  TODO
  }
};

import isHotkey from 'is-hotkey';

export const handleHotKey = (e: KeyboardEvent) => {
  if (isHotkey('mod+c', e)) {
    console.log('Copy ... '); // TODO
  } else if (isHotkey('mod+v', e)) {
    console.log('Paste ... '); //  TODO
  } else if (isHotkey('mod+x', e)) {
    console.log('Cut ... '); //  TODO
  } else if (isHotkey('mod+s', e)) {
    console.log('Save ... '); //  TODO
  }
};

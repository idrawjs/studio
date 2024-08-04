import type { SharedStorage } from '../types';

export function createSharedDefaultStorage(): SharedStorage {
  return {
    clipboard: {
      type: 'default',
      data: null
    },
    selectedUUIDs: []
  };
}

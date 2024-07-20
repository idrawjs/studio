import type { SharedStorage } from '../types';

export function createSharedDefaultStorage(): SharedStorage {
  return {
    idraw: null,
    clipboard: {
      type: 'default',
      data: null
    },
    selectedUUIDs: [],
    snapshotRecorder: null
  };
}

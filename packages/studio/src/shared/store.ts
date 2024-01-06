import type { SharedStorage } from '../types';

export function createSharedDefaultStorage(): SharedStorage {
  return {
    idraw: null,
    clipboard: null,
    selectedUUIDs: []
  };
}

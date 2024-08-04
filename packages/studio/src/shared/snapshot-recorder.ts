import type { Data } from 'idraw';
import { deepClone } from 'idraw';

import type { UtilEventEmitter } from 'idraw';

export class EventEmitter<T extends Record<string, any>> implements UtilEventEmitter<T> {
  #listeners: Map<keyof T, ((e: any) => void)[]>;

  constructor() {
    this.#listeners = new Map<keyof T, ((e: any) => void)[]>();
  }

  on<K extends keyof T>(eventKey: K, callback: (e: T[K]) => void) {
    if (this.#listeners.has(eventKey)) {
      const callbacks: Array<(e: T[K]) => void> = this.#listeners.get(eventKey) || [];
      callbacks?.push(callback);
      this.#listeners.set(eventKey, callbacks);
    } else {
      this.#listeners.set(eventKey, [callback]);
    }
  }

  off<K extends keyof T>(eventKey: K, callback: (e: T[K]) => void) {
    if (this.#listeners.has(eventKey)) {
      const callbacks = this.#listeners.get(eventKey);
      if (Array.isArray(callbacks)) {
        for (let i = 0; i < callbacks?.length; i++) {
          if (callbacks[i] === callback) {
            callbacks.splice(i, 1);
            break;
          }
        }
      }
      this.#listeners.set(eventKey, callbacks || []);
    }
  }

  trigger<K extends keyof T>(eventKey: K, e?: T[K]) {
    const callbacks = this.#listeners.get(eventKey);
    if (Array.isArray(callbacks)) {
      callbacks.forEach((cb) => {
        cb(e);
      });
      return true;
    } else {
      return false;
    }
  }

  has<K extends keyof T>(name: K | string): boolean {
    if (this.#listeners.has(name)) {
      const list: ((p: T[K]) => void)[] | undefined = this.#listeners.get(name);
      if (Array.isArray(list) && list.length > 0) {
        return true;
      }
    }
    return false;
  }

  destroy() {
    this.clear();
  }

  clear() {
    this.#listeners.clear();
  }
}

interface SnapshotRecord {
  data: Data;
  time: number;
}

interface SnapshotRecorderEventMap {
  do: { canUndo: boolean; canRedo: boolean };
  undo: { canUndo: boolean; canRedo: boolean };
  redo: { canUndo: boolean; canRedo: boolean };
  clear: void;
}

export class SnapshotRecorder {
  #doStack: SnapshotRecord[] = [];
  #undoStack: SnapshotRecord[] = [];
  #beforeSnapshot: SnapshotRecord | null = null;
  #event: EventEmitter<SnapshotRecorderEventMap>;

  constructor() {
    this.#event = new EventEmitter<SnapshotRecorderEventMap>();
  }

  on<T extends keyof SnapshotRecorderEventMap>(key: T, callback: (e: SnapshotRecorderEventMap[T]) => void) {
    this.#event.on(key, callback);
  }

  off<T extends keyof SnapshotRecorderEventMap>(key: T, callback: (e: SnapshotRecorderEventMap[T]) => void) {
    this.#event.off(key, callback);
  }

  hasBeforeSnapshot() {
    return !!this.#beforeSnapshot;
  }

  setBeforeData(data: Data) {
    if (data) {
      const record: SnapshotRecord = {
        data: deepClone(data),
        time: Date.now()
      };
      this.#beforeSnapshot = record;
    }
  }

  canUndo() {
    return this.#doStack.length > 0;
  }

  canRedo() {
    return this.#undoStack.length > 0;
  }

  clear() {
    this.#doStack = [];
    this.#undoStack = [];
    this.#beforeSnapshot = null;
    this.#event.trigger('clear');
  }

  destroy() {
    this.clear();
    this.#doStack = null as any;
    this.#undoStack = null as any;
    this.#beforeSnapshot = null;
    this.#event.clear();
    this.#event.destroy();
    this.#event = null as any;
  }

  do(data: Data) {
    if (this.#beforeSnapshot) {
      const record = this.#beforeSnapshot;
      this.#doStack.push(record);
      this.setBeforeData(data);
    }
    this.#event.trigger('do', {
      canRedo: this.canRedo(),
      canUndo: this.canUndo()
    });
  }

  undo(data?: Data | null): Data | null {
    if (this.#doStack.length === 0) {
      return null;
    }
    const record = this.#doStack.pop();
    if (!record) {
      return null;
    }
    if (data) {
      this.#undoStack.push({
        data: deepClone(data),
        time: Date.now()
      });
    }
    this.#event.trigger('undo', {
      canRedo: this.canRedo(),
      canUndo: this.canUndo()
    });
    return record.data;
  }

  redo(data?: Data | null): Data | null {
    if (this.#undoStack.length === 0) {
      return null;
    }
    const record = this.#undoStack.pop();
    if (!record) {
      return null;
    }
    if (data) {
      this.#doStack.push({
        data: deepClone(data),
        time: Date.now()
      });
    }
    this.#event.trigger('redo', {
      canRedo: this.canRedo(),
      canUndo: this.canUndo()
    });
    return record.data;
  }
}

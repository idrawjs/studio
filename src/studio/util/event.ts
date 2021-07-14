import { TypeData, TypeElemDesc, TypeElement } from "@idraw/types";

export type TypeIDrawEventArgMap  = {
  'studioScaleScreen': number;
  'studioSelectElement': { uuid: string, useMode?: boolean };
  'studioChangeData': TypeData;
  'studioUpdateElement': TypeElement<keyof TypeElemDesc>;
  'studioCloseLeftSider': boolean;
  'studioCloseRightSider': boolean;
  'studioIDrawResetWidth': number;
  'studioDragNewElement': {
    clientX: number,
    clientY: number,
    element: TypeElement<keyof TypeElemDesc>
  },
}
  
export interface TypeIDrawEvent {
  on<T extends keyof TypeIDrawEventArgMap >(key: T, callback: (p: TypeIDrawEventArgMap[T]) => void): void
  off<T extends keyof TypeIDrawEventArgMap >(key: T, callback: (p: TypeIDrawEventArgMap[T]) => void): void
  trigger<T extends keyof TypeIDrawEventArgMap >(key: T, p: TypeIDrawEventArgMap[T]): void
}


export class IDrawEvent implements TypeIDrawEvent {

  private _listeners: Map<string, ((p: any) => void)[]>;

  constructor() {
    this._listeners = new Map();
  }

  on<T extends keyof TypeIDrawEventArgMap >(eventKey: T, callback: (p: TypeIDrawEventArgMap[T]) => void) {
    if (this._listeners.has(eventKey)) {
      const callbacks = this._listeners.get(eventKey);
      callbacks?.push(callback);
      this._listeners.set(eventKey, callbacks || []);
    } else {
      this._listeners.set(eventKey, [callback]);
    }
  }
  
  off<T extends keyof TypeIDrawEventArgMap >(eventKey: T, callback: (p: TypeIDrawEventArgMap[T]) => void) {
    if (this._listeners.has(eventKey)) {
      const callbacks = this._listeners.get(eventKey);
      if (Array.isArray(callbacks)) {
        for (let i = 0; i < callbacks?.length; i++) {
          if (callbacks[i] === callback) {
            callbacks.splice(i, 1);
            break;
          }
        }
      }
      this._listeners.set(eventKey, callbacks || []);
    }
  }

  trigger<T extends keyof TypeIDrawEventArgMap >(eventKey: T, arg: TypeIDrawEventArgMap[T]) {
    const callbacks = this._listeners.get(eventKey);
    if (Array.isArray(callbacks)) {
      callbacks.forEach((cb) => {
        cb(arg);
      });
      return true;
    } else {
      return false;
    }
  }

  has<T extends keyof TypeIDrawEventArgMap> (name: string) {
    if (this._listeners.has(name)) {
      const list: ((p: TypeIDrawEventArgMap[T]) => void)[] | undefined = this._listeners.get(name);
      if (Array.isArray(list) && list.length > 0) {
        return true;
      }
    }
    return false;
  }

}
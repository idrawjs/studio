import { createContext } from 'react';
import { TypeData } from '@idraw/types';

export type TypeContextData = {
  data: TypeData,
  selectedElementUUID: string | null,
  contextSize: {
    width: number,
    height: number,
  },
  // getSelectedElement: (uuid: string, data: TypeData) => TypeElement<keyof TypeElemDesc>|null
};

export const StudioContext = createContext<TypeContextData>({
  data: { elements: [] },
  selectedElementUUID: null,
  contextSize: {
    width: 0,
    height: 0,
  },
});
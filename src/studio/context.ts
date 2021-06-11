import { createContext } from 'react';
import { TypeData } from '@idraw/types';

type TypeContext = {
  data: TypeData,
  selectedElementUUID: string | null,
};

export const StudioContext = createContext<TypeContext>({
  data: { elements: [] },
  selectedElementUUID: null,
});
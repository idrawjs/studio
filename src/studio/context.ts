import { createContext } from 'react';
import { TypeData, TypeDataBase } from '@idraw/types';

type TypeContext = {
  data: TypeData|TypeDataBase,
  selectedElementUUID: string | null,
};

export const StudioContext = createContext<TypeContext>({
  data: { elements: [] },
  selectedElementUUID: null,
});
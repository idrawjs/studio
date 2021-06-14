import { createContext } from 'react';
import { TypeData, TypeElemDesc, TypeElement } from '@idraw/types';

type TypeContext = {
  data: TypeData,
  selectedElement: TypeElement<keyof TypeElemDesc> | null,
};

export const StudioContext = createContext<TypeContext>({
  data: { elements: [] },
  selectedElement: null,
});
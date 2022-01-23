import * as React from 'react';
import { TypeElement, TypeElemDesc, TypeDataBase } from '@idraw/types';

export type TypeMaterial = {
  name: string,
  icon: React.ReactElement,
  element: TypeElement<keyof TypeElemDesc>
}

export type TypeTemplate = {
  name: string,
  data: TypeDataBase,
  width: number,
  height: number,
}
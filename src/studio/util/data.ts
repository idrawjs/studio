import {
  TypeData,
  TypeElement,
  TypeElemDesc
} from '@idraw/types';


export function getElement(
  data: TypeData, uuid: string
): TypeElement<keyof TypeElemDesc> | null {
  if (data && data.elements && data.elements.length > 0) {
    for (let i = 0; i < data.elements.length; i++) {
      if (data.elements[i].uuid === uuid && data.elements[i].uuid && uuid) {
        return data.elements[i];
      }
    }
  }
  return null;
}
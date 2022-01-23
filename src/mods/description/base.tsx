

export interface FieldData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

export interface DescFormProps {
  onChange: (fields: FieldData[]) => void;
  fields: FieldData[];
}


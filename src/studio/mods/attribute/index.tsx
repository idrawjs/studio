import * as React from 'react';
import { StudioContext } from './../../context';
import { Form, Input } from 'antd';
import { getElement } from './../../util/data'

const { useContext, useState } = React;

interface FieldData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

interface AttrFormProps {
  onChange: (fields: FieldData[]) => void;
  fields: FieldData[];
}

const AttrForm: React.FC<AttrFormProps> = ({ onChange, fields }) => (
  <Form
    name="element-attrs"
    layout="inline"
    fields={fields}
    onFieldsChange={(_, allFields) => {
      onChange(allFields);
    }}
  >
    <Form.Item
      name="x"
      label="X"
      rules={[{ required: true, message: 'X is required!' }]}
    >
      <Input type="number" size="small" />
    </Form.Item>
    <Form.Item
      name="y"
      label="Y"
      rules={[{ required: true, message: 'Y is required!' }]}
    >
      <Input type="number" size="small" />
    </Form.Item>
  </Form>
);

export const Attribute = () => {
  const context = useContext(StudioContext);
  const { data, selectedElementUUID } = context;
  const elem = getElement(data, selectedElementUUID);

  const fields = [
    { name: ['x'], value: elem?.x || 0 },
    { name: ['y'], value: elem?.y || 0 },
  ]


  return (
    <div className="idraw-studio-mod-attribute">
      {selectedElementUUID ? (
        <div>
          <AttrForm
            fields={fields}
            onChange={newFields => {
              console.log('newFields ===', newFields);
              // setFields(newFields);
            }}
          />
        </div>
      ) : (
        <div className="no-select-data">No Data</div>
      )}
    </div>
  )
}


import * as React from 'react';
import { Form, Input, Col, Row, } from 'antd';
import { TypeElement } from '@idraw/types';

interface FieldData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

interface DescFormProps {
  elem: TypeElement<'rect'>
  onChange?: (fields: FieldData[]) => void;
}

export const RectDescForm: React.FC<DescFormProps> = ({ onChange, elem }) => {

  console.log('elem ===', elem)

  const fields = [
    { name: ['borderWidth'], value: elem.desc.borderWidth || 0 },
    { name: ['borderRadius'], value: elem.desc.borderRadius || 0 },
    { name: ['borderColor'], value: elem.desc.borderColor || '' },
    { name: ['color'], value: elem.desc.borderColor || '' },
  ];

  return (<Form
      name="rect-desc"
      layout="inline"
      fields={fields}
      onFieldsChange={(_, allFields) => {
        if (typeof onChange === 'function') {
          onChange(allFields);
        }
      }}
    >
      <Row>
        <Col span="24">
          <Form.Item
            name="color"
            label="Color" >
            <Input type="number" size="small" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <Form.Item
            name="borderWidth"
            label="Border Width" >
            <Input type="number" size="small" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <Form.Item
            name="borderRadius"
            label="Border Radius" >
            <Input type="number" size="small" />
          </Form.Item>
        </Col>
      </Row>
  
      <Row>
        <Col span="24">
          <Form.Item
            name="borderColor"
            label="Border Color">
            <Input type="number" size="small" />
          </Form.Item>
        </Col>
      </Row>
      
    </Form>
  )
};
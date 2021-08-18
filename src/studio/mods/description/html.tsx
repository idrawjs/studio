import * as React from 'react';
import { Form, Input, Col, Row, } from 'antd';
import { TypeElement, TypeElemDesc } from '@idraw/types';
import idraw from 'idraw';
import { FieldData } from './base';
import { FieldText } from './field-text';

interface DescFormProps {
  elem: TypeElement<'html'>
  onChange?: (desc: TypeElemDesc['html']) => void;
}

export const HTMLDescForm: React.FC<DescFormProps> = ({ onChange, elem }) => {

  const fields = [
    { name: ['html'], value: elem.desc.html || '' },
    { name: ['width'], value: elem.desc.width || 0 },
    { name: ['height'], value: elem.desc.height || 0 },
  ];

  return (<Form
      name="rect-desc"
      layout="inline"
      fields={fields}
      onFieldsChange={(_, allFields: FieldData[]) => {
        if (typeof onChange === 'function') {
          const newDesc = parseFiledsData(allFields);
          if (idraw.check.textDesc(newDesc)) {
            const desc = {...elem.desc, ...newDesc};
            onChange(desc);
          }
        }
      }}
    >
      <Row>
        <Col span="24">
          <Form.Item
            name="html"
            label="HTML" >
            <FieldText />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span="24">
          <Form.Item
            name="height"
            label="Height" >
            <Input type="number" size="small" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <Form.Item
            name="width"
            label="Width" >
            <Input type="number" size="small" />
          </Form.Item>
        </Col>
      </Row>
      
      
    </Form>
  )
};

function parseFiledsData(fields: FieldData[]) {
  const desc = {};
  const attrKeys = [
    'html', 'width', 'height', 
  ];
  fields.forEach((item: FieldData) => {
    if (attrKeys.includes(item.name[0])) {
      switch (item.name[0]) {
        case 'html': {
          if (idraw.is.html(item.value)) {
            desc[item.name[0]] = item.value; 
          }
          break;
        }
        case 'width': {
          if (idraw.is.w(parseInt(item.value))) {
            desc[item.name[0]] = parseInt(item.value); 
          }
          break;
        }
        case 'height': {
          if (idraw.is.h(parseInt(item.value))) {
            desc[item.name[0]] = parseInt(item.value); 
          }
          break;
        }
        default: {
          break;
        }
      }
    }
  });
  return desc;
}
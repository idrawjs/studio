import * as React from 'react';
import { Form, Col, Row, } from 'antd';
import { TypeElement, TypeElemDesc } from '@idraw/types';
import idraw from 'idraw';
import { FieldData } from './base';
import { SVGPicker } from './field-svg-picker';

interface DescFormProps {
  elem: TypeElement<'svg'>
  onChange?: (desc: TypeElemDesc['svg']) => void;
}

export const SVGDescForm: React.FC<DescFormProps> = ({ onChange, elem }) => {

  const fields = [
    { name: ['svg'], value: elem.desc.svg || '' },
  ];

  return (<Form
      name="svg-desc"
      layout="inline"
      fields={fields}
      onFieldsChange={(_, allFields: FieldData[]) => {
        if (typeof onChange === 'function') {
          const newDesc = parseFiledsData(allFields);
          if (idraw.check.svgDesc(newDesc)) {
            const desc = {...elem.desc, ...newDesc};
            onChange(desc);
          }
        }
      }}
    >
      <Row>
        <Col span="24">
          <Form.Item
            name="svg"
            label="SVG" >
            <SVGPicker />
          </Form.Item>
        </Col>
      </Row>
       
    </Form>
  )
};

function parseFiledsData(fields: FieldData[]) {
  const desc = { };
  const attrKeys = [ 'svg'];
  fields.forEach((item: FieldData) => {
    if (attrKeys.includes(item.name[0])) {
      switch (item.name[0]) {
        case 'svg': {
          if (idraw.is.svg(item.value)) {
            desc[item.name[0]] = item.value; 
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
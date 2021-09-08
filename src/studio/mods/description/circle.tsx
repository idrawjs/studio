import * as React from 'react';
import { Form, Input, Col, Row, } from 'antd';
import { TypeElement, TypeElemDesc } from '@idraw/types';
import idraw from 'idraw';
import { FieldData } from './base';
import { ColorPicker } from './field-color-picker';
import { limitNum } from '../../util/value';

interface DescFormProps {
  elem: TypeElement<'circle'>
  onChange?: (desc: TypeElemDesc['circle']) => void;
}

export const CircleDescForm: React.FC<DescFormProps> = ({ onChange, elem }) => {

  const fields = [
    { name: ['borderWidth'], value: elem.desc.borderWidth || 0 },
    { name: ['borderColor'], value: elem.desc.borderColor || '' },
    { name: ['bgColor'], value: elem.desc.bgColor || '' },
  ];

  return (<Form
      name="circle-desc"
      layout="inline"
      fields={fields}
      onFieldsChange={(_, allFields: FieldData[]) => {
        if (typeof onChange === 'function') {
          const newDesc = parseFiledsData(allFields);
          if (idraw.check.circleDesc(newDesc)) {
            const desc = {...elem.desc, ...newDesc};
            // console.log('desc =====', desc);
            onChange(desc);
          }
        }
      }}
    >
      <Row>
        <Col span="24">
          <Form.Item
            name="bgColor"
            label="Background" >
            <ColorPicker />
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
            name="borderColor"
            label="Border Color">
            <ColorPicker />
          </Form.Item>
        </Col>
      </Row>
      
    </Form>
  )
};

function parseFiledsData(fields: FieldData[]) {
  const desc = {
    // bgColor: '#ffffff',
    // borderColor: '',
    // borderWidth: 0,
  };
  // TODO
  const attrKeys = [ 'bgColor', 'borderColor', 'borderWidth'];
  fields.forEach((item: FieldData) => {
    if (attrKeys.includes(item.name[0])) {
      switch (item.name[0]) {
        case 'bgColor': {
          if (idraw.is.color(item.value)) {
            desc[item.name[0]] = item.value; 
          }
          break;
        }
        case 'borderColor': {
          if (idraw.is.color(item.value)) {
            desc[item.name[0]] = item.value; 
          }
          break;
        }
        case 'borderWidth': {
          if (idraw.is.borderWidth(parseFloat(item.value))) {
            desc[item.name[0]] = limitNum(parseFloat(item.value)); 
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
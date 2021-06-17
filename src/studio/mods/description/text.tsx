import * as React from 'react';
import { Form, Input, Col, Row, } from 'antd';
import { TypeElement, TypeElemDesc } from '@idraw/types';
import util from '@idraw/util';
import { FieldData } from './base';
import { checkRectDesc } from '../../util/data';
import { ColorPicker } from './color';
import { limitNum } from '../../util/value';

const { isColorStr } = util.color;

interface DescFormProps {
  elem: TypeElement<'text'>
  onChange?: (desc: TypeElemDesc['text']) => void;
}

export const TextDescForm: React.FC<DescFormProps> = ({ onChange, elem }) => {

  const fields = [
    { name: ['borderWidth'], value: elem.desc.borderWidth || 0 },
    { name: ['borderRadius'], value: elem.desc.borderRadius || 0 },
    { name: ['borderColor'], value: elem.desc.borderColor || '' },
    { name: ['color'], value: elem.desc.color || '' },
  ];

  return (<Form
      name="rect-desc"
      layout="inline"
      fields={fields}
      onFieldsChange={(_, allFields: FieldData[]) => {
        if (typeof onChange === 'function') {
          const newDesc = parseFiledsData(allFields);
          if (checkRectDesc(newDesc)) {
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
            name="color"
            label="Color" >
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
            <ColorPicker />
          </Form.Item>
        </Col>
      </Row>
      
    </Form>
  )
};

function parseFiledsData(fields: FieldData[]) {
  const desc = {
    // color: '#ffffff',
    // borderColor: '',
    // borderRadius: 0,
    // borderWidth: 0,
  };
  // TODO
  const attrKeys = ['color', 'borderColor', 'borderRadius', 'borderWidth'];
  fields.forEach((item: FieldData) => {
    if (attrKeys.includes(item.name[0])) {
      switch (item.name[0]) {
        case 'color': {
          if (isColorStr(item.value)) {
            desc[item.name[0]] = item.value; 
          }
          break;
        }
        case 'borderColor': {
          if (isColorStr(item.value)) {
            desc[item.name[0]] = item.value; 
          }
          break;
        }
        case 'borderRadius': {
          if (parseFloat(item.value) >= 0) {
            desc[item.name[0]] = limitNum(parseFloat(item.value)); 
          }
          break;
        }
        case 'borderWidth': {
          if (parseFloat(item.value) >= 0) {
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
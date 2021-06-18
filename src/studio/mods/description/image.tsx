import * as React from 'react';
import { Form, Input, Col, Row, } from 'antd';
import { TypeElement, TypeElemDesc } from '@idraw/types';
import idraw from 'idraw';
import { FieldData } from './base';

const { TextArea } = Input;

interface DescFormProps {
  elem: TypeElement<'image'>
  onChange?: (desc: TypeElemDesc['image']) => void;
}

export const ImageDescForm: React.FC<DescFormProps> = ({ onChange, elem }) => {

  const fields = [
    { name: ['src'], value: elem.desc.src || '' },
  ];

  return (<Form
      name="image-desc"
      layout="inline"
      fields={fields}
      onFieldsChange={(_, allFields: FieldData[]) => {
        if (typeof onChange === 'function') {
          const newDesc = parseFiledsData(allFields);
          if (idraw.check.imageDesc(newDesc)) {
            const desc = {...elem.desc, ...newDesc};
            onChange(desc);
          }
        }
      }}
    >
      <Row>
        <Col span="24">
          <Form.Item
            name="src"
            label="Src" >
            <TextArea rows={10}/>
          </Form.Item>
        </Col>
      </Row>
       
    </Form>
  )
};

function parseFiledsData(fields: FieldData[]) {
  const desc = { };
  const attrKeys = [ 'src'];
  fields.forEach((item: FieldData) => {
    if (attrKeys.includes(item.name[0])) {
      switch (item.name[0]) {
        case 'src': {
          if (idraw.is.imageSrc(item.value)) {
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
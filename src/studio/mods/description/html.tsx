import React, { useCallback } from 'react';
import { Form, Input, Col, Row, } from 'antd';
import { CodeSandboxOutlined } from '@ant-design/icons';
import { TypeElement, TypeElemDesc } from '@idraw/types';
import idraw from 'idraw';
import { FieldData } from './base';
import { FieldText } from './field-text';
import { showCodeEditor } from './../dialog';
import beautifyHTML from 'js-beautify/js/lib/beautify-html';

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


  const onClickEditCode = useCallback(() => {
    showCodeEditor({
      value: beautifyHTML.html_beautify(elem.desc.html || '', {
        'indent_size': 2,
      }),
      mode: 'htmlmixed',
      onConfirm: (value: string) => {
        const desc = {...elem.desc, ...{ html: value }};
        onChange(desc);
      },
      onCancel: () => {}
    })
  }, [elem]);

  return (<Form
      name="rect-desc"
      layout="inline"
      fields={fields}
      onFieldsChange={(_, allFields: FieldData[]) => {
        if (typeof onChange === 'function') {
          const newDesc = parseFiledsData(allFields);
          if (idraw.check.htmlDesc(newDesc)) {
            const desc = {...elem.desc, ...newDesc};
            onChange(desc);
          }
        }
      }}
    >
      <Row>
        <Col span="9">
          <div style={{lineHeight: '32px', marginRight: 10}}>HTML: </div>
        </Col>
        <Col span="6">
          <Form.Item
            name="html" >
            <FieldText />
          </Form.Item>
        </Col>
        <Col span="6">
          <Form.Item
            name="html">
            <CodeSandboxOutlined className="idraw-studio-mod-desc-field-icon"
              onClick={onClickEditCode}
            />
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
            desc[item.name[0]] = parseInt(item.value) || 0; 
          }
          break;
        }
        case 'height': {
          if (idraw.is.h(parseInt(item.value))) {
            desc[item.name[0]] = parseInt(item.value) || 0; 
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
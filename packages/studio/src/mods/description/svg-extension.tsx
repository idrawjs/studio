import * as React from 'react';
import { Form, Col, Row, } from 'antd';
import { TypeElement } from '@idraw/types';
import idraw from 'idraw';
import { FieldData } from './base';
import { ColorPicker } from './field-color-picker';

interface ExtensionFormProps {
  elem: TypeElement<'svg'>
  onChange?: (ext: {[key: string]: any}) => void;
}

function checkSVGExtension(
  ext: any
): boolean {
  const { currentColor } = ext || {};
  if (ext.hasOwnProperty('currentColor') && !idraw.is.color(currentColor)) {
    return false;
  }
  return true;
}

export const SVGExtensionForm: React.FC<ExtensionFormProps> = ({ onChange, elem }) => {

  const fields = [
    { name: ['currentColor'], value: elem?.extension?.currentColor || '' },
  ];

  return (
    <>
      {elem?.extension?.subType === 'svg-custom-color' && (
          <Form
          name="svg-extension"
          layout="inline"
          fields={fields}
          onFieldsChange={(_, allFields: FieldData[]) => {
            if (typeof onChange === 'function') {
              const newExt = parseFiledsData(allFields);
              if (checkSVGExtension(newExt)) {
                const ext = {...(elem.extension || {}), ...newExt};
                // console.log('desc =====', desc);
                onChange(ext);
              }
            }
          }}
        >
          <Row>
            <Col span="24">
              <Form.Item
                name="currentColor"
                label="CurrentColor" >
                <ColorPicker />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </>
  )
};

function parseFiledsData(fields: FieldData[]) {
  const extension = {
    // color: '#ffffff',
  };
  // TODO
  const attrKeys = [ 'currentColor' ];
  fields.forEach((item: FieldData) => {
    if (attrKeys.includes(item.name[0])) {
      switch (item.name[0]) {
        case 'currentColor': {
          if (idraw.is.color(item.value)) {
            extension[item.name[0]] = item.value; 
          }
          break;
        }
        default: {
          break;
        }
      }
    }
  });
  return extension;
}
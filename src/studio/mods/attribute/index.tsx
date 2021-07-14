import * as React from 'react';
import { StudioContext } from './../../context';
import { Form, Input, Col, Row, } from 'antd';
import { getElement, checkElementAttrs } from './../../util/data';
import eventHub from './../../util/event-hub';
import { limitNum } from './../../util/value';

const { useContext, useCallback} = React;

type TypeProps = {
  maxHeight?: number
}

export const Attribute = (props: TypeProps) => {
  const context = useContext(StudioContext);
  const { data, selectedElementUUID } = context;
  const elem = getElement(data, selectedElementUUID);
  const style: React.HTMLAttributes<HTMLDivElement>['style'] = {};
  if (props.maxHeight > 0) {
    style.maxHeight = props.maxHeight;
    style.height = props.maxHeight;
  }

  const fields = [
    { name: ['x'], value: elem?.x || 0 },
    { name: ['y'], value: elem?.y || 0 },
    { name: ['w'], value: elem?.w || 0 },
    { name: ['h'], value: elem?.h || 0 },
    { name: ['angle'], value: elem?.angle || 0 },
  ]

  const onChange = useCallback(newFields => {
    const attrs = parseFiledsData(newFields);
    if (checkElementAttrs(attrs)) {
      eventHub.trigger('studioUpdateElement', {...elem, ...attrs});
    }
  }, [data, selectedElementUUID, elem])

  return (
    <div className="idraw-studio-mod-attribute" style={style}>
      {selectedElementUUID ? (
        <div>
          <AttrForm
            fields={fields}
            onChange={onChange}
          />
        </div>
      ) : (
        <>
          {/* <div className="no-select-data">No Attribute</div> */}
        </>
      )}
    </div>
  )
}


function parseFiledsData(fields: FieldData[]): {
  x: number, y: number, w: number, h: number, angle: number
} {
  const attrs = { x: 0, y: 0, w: 0, h: 0, angle: 0 };
  const attrKeys = Object.keys(attrs);
  fields.forEach((item: FieldData) => {
    if (attrKeys.includes(item.name[0])) {
      attrs[item.name[0]] = limitNum(parseFloat(item.value));
    }
  });
  return attrs;
}


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
    <Row>
      <Col span="12">
        <Form.Item
          name="x"
          label="X"
        >
          <Input type="number" size="small" />
        </Form.Item>
      </Col>
      <Col span="12">
        <Form.Item
          name="y"
          label="Y"
        >
          <Input type="number" size="small" />
        </Form.Item>
      </Col>
    </Row>

    <Row>
      <Col span="12">
        <Form.Item
          name="w"
          label="W"
        >
          <Input type="number" size="small" />
        </Form.Item>
      </Col>
      <Col span="12">
        <Form.Item
          name="h"
          label="H"
        >
          <Input type="number" size="small" />
        </Form.Item>
      </Col>
    </Row>
    

    <Row>
      <Col span="24">
        <Form.Item
          name="angle"
          label="Angle"
        >
          <Input type="number" size="small" />
        </Form.Item>
      </Col>
    </Row>
  </Form>
);
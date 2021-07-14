import * as React from 'react';
import { Input } from 'antd';
import { TypeElement, TypeElemDesc } from '@idraw/types';
import { EditOutlined, LockOutlined, CheckCircleOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import eventHub from '../../util/event-hub';
import { StudioContext } from './../../context';

const { useContext, useState, useCallback } = React;

type TypeProps = {
  maxHeight?: number,
  element: TypeElement<keyof TypeElemDesc>
}

export const Item = (props: TypeProps) => {
  const { element } = props;
  const context = useContext(StudioContext);
  const { selectedElementUUID } = context;
  const style: React.HTMLAttributes<HTMLDivElement>['style'] = {};
  if (props.maxHeight > 0) {
    style.maxHeight = props.maxHeight;
    style.height = props.maxHeight;
  }

  const [isEdit, setIsEdit] = useState(false);
  const [elemName, setElemName] = useState(element.name);

  const onClickEdit = useCallback(() => {
    setIsEdit(true)
  }, []);

  const onChangeInput = useCallback((e) => {
    setElemName(e.target.value || '');
  }, []);

  const onConfirmElemName = useCallback(() => {
    element.name = elemName;
    eventHub.trigger('studioUpdateElement', element);
    setIsEdit(false);
  }, [elemName, element]);

  return (
    <div
      className={classnames({
        'idraw-studio-element-item': true,
        'element-item-active': (element.uuid && selectedElementUUID && element.uuid === selectedElementUUID)
      })}
      onClick={() => {
        eventHub.trigger('studioSelectElement', { uuid: element.uuid });
      }}
    >
      {isEdit === true ? (
        <Input 
          size="small" value={elemName} style={{width: 150}}
          onChange={onChangeInput}
        />
      ) : (
        <span className="studio-element-item-name">
          {element.name || 'Unnamed'}
        </span>
      )}

      <span className="studio-element-item-action">
      {isEdit === true ? (
        <CheckCircleOutlined
          className="idraw-studio-element-icon"
          onClick={onConfirmElemName}
        />
      ) : (
        <EditOutlined
          className="idraw-studio-element-icon"
          onClick={onClickEdit}
        />
      )}
        <LockOutlined className="idraw-studio-element-icon" />
      </span>
      
    </div>
  )
}
 
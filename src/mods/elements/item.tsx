import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Input } from 'antd';
import { TypeElement, TypeElemDesc } from '@idraw/types';
import {
  EditOutlined, LockOutlined, LockFilled, CheckCircleOutlined,
  DeleteOutlined, ArrowDownOutlined, ArrowUpOutlined,
} from '@ant-design/icons';
import { Visible, InVisible } from './../icon/svg/visible';
import classnames from 'classnames';
import eventHub from '../../util/event-hub';
import { StudioContext } from './../../context';
 

type TypeProps = {
  maxHeight?: number,
  element: TypeElement<keyof TypeElemDesc>
  index: number;
  total: number;
}

export const Item = (props: TypeProps) => {
  const { element, index, total } = props;
  const context = useContext(StudioContext);
  const { selectedElementUUID } = context;
  const style: React.HTMLAttributes<HTMLDivElement>['style'] = {};
  if (props.maxHeight > 0) {
    style.maxHeight = props.maxHeight;
    style.height = props.maxHeight;
  }

  const [isEdit, setIsEdit] = useState(false);
  const [elemName, setElemName] = useState(element.name);

  useEffect(() => {
    setElemName(element.name);
    setIsEdit(false);
  }, [element])


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

  const onClickSwitchLock = useCallback(() => {
    if (!element.operation) {
      element.operation = {};
    }
    element.operation.lock = !element?.operation?.lock;
    eventHub.trigger('studioUpdateElement', element);
    setIsEdit(false);
  }, [element]);

  const onClickSwitchVisible = useCallback(() => {
    if (!element.operation) {
      element.operation = {};
    }
    element.operation.invisible = !element?.operation?.invisible;
    eventHub.trigger('studioUpdateElement', element);
    setIsEdit(false);
  }, [element]);

  const onClickDelete = useCallback(() => {
    eventHub.trigger('studioDeleteElement', element.uuid);
  }, [element]);

  const onClickMoveUp = useCallback(() => {
    eventHub.trigger('studioMoveUpElement', element.uuid);
  }, [element]);

  const onClickMoveDown = useCallback(() => {
    eventHub.trigger('studioMoveDownElement', element.uuid);
  }, [element])

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
      <span className="studio-element-item-action">
        {(index === 0) ? (
          <ArrowUpOutlined className="idraw-studio-element-icon no-margin icon-disable" ></ArrowUpOutlined>
        ) : (
          <ArrowUpOutlined className="idraw-studio-element-icon no-margin"
            onClick={onClickMoveUp}
          ></ArrowUpOutlined>
        )}

        {(index === total - 1) ? (
          <ArrowDownOutlined className="idraw-studio-element-icon no-margin icon-disable" ></ArrowDownOutlined>
        ) : (
          <ArrowDownOutlined className="idraw-studio-element-icon no-margin"
            onClick={onClickMoveDown}
          ></ArrowDownOutlined>
        )}
        
      </span>
      {isEdit === true ? (
        <Input 
          className="studio-element-item-name"
          size="small" value={elemName}
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
        {element?.operation?.invisible === true ? (
          <span onClick={onClickSwitchVisible} className="idraw-studio-element-icon ">
            <InVisible color={'#888888'}></InVisible>
          </span>
        ) : (
          <span onClick={onClickSwitchVisible} className="idraw-studio-element-icon icon-active">
            <Visible color={'#888888'}></Visible>
          </span>
        )}
        
        {element?.operation?.lock === true ? (
          <LockFilled
            className="idraw-studio-element-icon icon-active"
            onClick={onClickSwitchLock} />
        ) : (
          <LockOutlined
            className="idraw-studio-element-icon"
            onClick={onClickSwitchLock} />
        )}
        <DeleteOutlined
          className="idraw-studio-element-icon"
          onClick={onClickDelete}
        />         
      </span>
      
    </div>
  )
}
 
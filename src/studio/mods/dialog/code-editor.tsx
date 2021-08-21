import React from 'react';
import { Modal } from 'antd';
import { CodeEditor } from './../codemirror';

export const showCodeEditor = (params: {
  value: string,
  mode: 'htmlmixed'
  onConfirm: (code: string) => void,
  onCancel: () => void,
}) => {

  let tempValue = params.value

  Modal.confirm({
    // title: 'Confirm',
    icon: null,
    width: 640,
    className: 'idraw-studio-dialog-code-editor',
    content: <CodeEditor
      mode={params.mode}
      value={params.value}
      onChange={(value: string) => {
        tempValue = value;
      }}
    />,
    okText: 'OK',
    cancelText: 'Cancel',
    onCancel: () => {
      params.onCancel();
    },
    onOk: () => {
      params.onConfirm(tempValue);
    }
  });
}

import React from 'react';
import { Modal } from 'antd';
import iDraw from 'idraw';

export const showExportImage = (params: {
  idraw: iDraw,
}) => {

  console.log(params);

  // let tempValue = params.value

  Modal.confirm({
    // title: 'Confirm',
    icon: null,
    width: 640,
    className: 'idraw-studio-dialog-export-image',
    content: (<div>
      Export Image
    </div>),
    okText: 'OK',
    cancelText: 'Cancel',
    // onCancel: () => {
    //   params.onCancel();
    // },
    // onOk: () => {
    //   params.onConfirm(tempValue);
    // }
  });
}

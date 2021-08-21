import React, { useState, useEffect } from 'react';
import { Modal, Select } from 'antd';
import iDraw from 'idraw';

const { Option } = Select;

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
    content: (<ExportImage idraw={params.idraw} />),
    okText: 'Download',
    cancelText: 'Cancel',
    // onCancel: () => {
    //   params.onCancel();
    // },
    // onOk: () => {
    //   params.onConfirm(tempValue);
    // }
  });
}


function ExportImage (props: { idraw: iDraw }) {
  const { idraw } = props;
  const [imageType, setImageType] = useState<'image/png' | 'image/jpeg'>('image/png');
  const [imageQuality,] = useState<number>(1);
  const [dataURL, setDataURL] = useState(idraw.exportDataURL(imageType, imageQuality));
  
  return (
    <div className="idraw-studio-export-image-container">
      <div className="export-image-preview">
        <img src={dataURL} className="export-image-content" />
      </div>
      <div className="export-image-setting">
        <div className="export-setting-field">
          <div className="export-setting-field-title">

          </div>
          <div className="export-setting-field-title">
            
          </div>
        </div>
      </div>
    </div>
  )
}
import React, { useState, useCallback } from 'react';
import { Modal, Select, Row, Col } from 'antd';
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

const imageTypeOptions = [
  {
    label: 'image/png',
    value: 'image/png',
  },
  {
    label: 'image/jpeg',
    value: 'image/jpeg',
  }
]

const imageQualityOptions = [
  {
    label: 'High quality',
    value: 1,
  },
  {
    label: 'Medium quality',
    value: 0.92,
  },
  {
    label: 'Low quality',
    value: 0.5,
  },
]


function ExportImage (props: { idraw: iDraw }) {
  const { idraw } = props;
  const [imageType, setImageType] = useState<'image/png' | 'image/jpeg'>('image/png');
  const [imageQuality, setImageQuality] = useState<number>(1);
  const [dataURL, setDataURL] = useState(idraw.exportDataURL(imageType, imageQuality));

  const handleImageType = useCallback((value) => {
    setImageType(value);
    if (value !== imageType) {
      const newDataURL = idraw.exportDataURL(value, imageQuality);
      setDataURL(newDataURL);
    }
  }, [imageType, imageQuality])

  const handleImageQuality = useCallback((value) => {
    setImageQuality(value);
    if (value !== imageQuality) {
      const newDataURL = idraw.exportDataURL(imageType, value);
      setDataURL(newDataURL);
    }
  }, [imageType, imageQuality])
  
  return (
    <div className="idraw-studio-export-image-container">
      <div className="export-image-preview">
        <img src={dataURL} className="export-image-content" />
      </div>
      <div className="export-image-setting">
        <Row className="export-setting-field">
          <Col span={7} className="setting-field-text">Type: </Col>
          <Col span={17} className="setting-field-content">
            <Select style={{ width: '100%' }} 
              options={imageTypeOptions}
              value={imageType}
              onChange={handleImageType}></Select>
          </Col>
        </Row>
        <Row className="export-setting-field">
          <Col span={7} className="setting-field-text">Quality: </Col>
          <Col span={17} className="setting-field-content">
            <Select  style={{ width: '100%' }} 
              options={imageQualityOptions}
              value={imageQuality}
              onChange={handleImageQuality}></Select>
          </Col>
        </Row>

        {/* <div className="export-setting-field">
          <div className="export-setting-field-title"></div>
          <div className="export-setting-field-title"></div>
        </div> */}
      </div>
    </div>
  )
}
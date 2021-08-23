import React, { useState, useCallback } from 'react';
import { Modal, Select, Row, Col, Button, Input, message } from 'antd';
import iDraw from 'idraw';
import { downloadFile } from './../../util/file';

let tempDialog: any = null;

export const showExportImage = (params: {
  idraw: iDraw,
}) => {

  tempDialog = Modal.confirm({
    icon: null,
    width: 640,
    className: 'idraw-studio-dialog-export-image',
    content: (<ExportImage idraw={params.idraw} />),
  });
}

const imageTypeOptions = [
  {
    label: 'PNG',
    value: 'image/png',
  },
  {
    label: 'JPEG',
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
  const [imageName, setImageName] = useState<string>('idraw-image');

  const imageExtMap = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
  }

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

  const onClickDownload = useCallback(() => {
    const name = `${imageName || 'idraw-image'}.${imageExtMap[imageType]}`
    downloadFile({dataURL, name})
  }, [imageType, imageQuality, dataURL, imageName]);

  const onChangeName = useCallback((e) => {
    setImageName(e.target.value || '');
  }, [])
  
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

        <Row className="export-setting-field">
          <Col span={7} className="setting-field-text">Name: </Col>
          <Col span={17} className="setting-field-content">
            <Input value={imageName} onChange={onChangeName} style={{ width: '100%' }} />
          </Col>
        </Row>

        <Row className="export-setting-field">
          <Col span={12}>
            <Button onClick={() => {
              tempDialog.destroy();
            }}>Cancel</Button>
          </Col>
          <Col span={12}>
            <Button type="primary" onClick={onClickDownload}>Download</Button>
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
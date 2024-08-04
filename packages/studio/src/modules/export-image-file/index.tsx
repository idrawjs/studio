import React, { useMemo, useEffect, useState, useCallback } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { generateClassName } from '@idraw/studio-base';
import { Button, Spin, Form, Input, Select, Divider } from 'antd';
import type { SharedEvent, SharedStore } from '../../types';

const modName = 'mod-export-image-file';

export const exportFileBoxWidth = 700;

export const exportFileDialogWidth = exportFileBoxWidth + 48;

const previewSize = 500;

const optionsWidth = exportFileBoxWidth - previewSize;

export interface ExportFileProps {
  className?: string;
  style?: CSSProperties;
  sharedStore: SharedStore;
  sharedEvent: SharedEvent;
}

interface FileInfo {
  width: number;
  height: number;
  devicePixelRatio: number;
}

const defaultFileOptions = {
  devicePixelRatio: 1,
  fileName: 'download.png'
};

export const ExportFile = (props: ExportFileProps) => {
  const { className, style, sharedStore } = props;
  const rootClassName = generateClassName(modName);
  const previewClassName = generateClassName(modName, 'preview');
  const optionsClassName = generateClassName(modName, 'options');
  const canvasClassName = generateClassName(modName, 'canvas');
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [form] = Form.useForm();

  const resetImage = useCallback((pixelRatio: number) => {
    const idraw = sharedStore.getStatic('idraw');
    if (!idraw) {
      return;
    }
    setIsLoading(true);
    idraw
      .getImageBlobURL({
        devicePixelRatio: pixelRatio
      })
      .then(({ blobURL, width, height, devicePixelRatio }) => {
        if (blobURL) {
          setImageSrc(blobURL);
          setFileInfo({
            width,
            height,
            devicePixelRatio
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      devicePixelRatio: defaultFileOptions.devicePixelRatio,
      fileName: defaultFileOptions.fileName
    });

    setTimeout(() => {
      resetImage(defaultFileOptions.devicePixelRatio);
    }, 10);
  }, []);

  const onClickDownload = () => {
    if (!imageSrc) {
      return;
    }
    const formValues = form.getFieldsValue();
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = formValues.fileName || defaultFileOptions.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return useMemo(() => {
    return (
      <div style={{ ...style, ...{ width: exportFileBoxWidth } }} className={classnames(rootClassName, className)}>
        <Spin tip="Loading..." spinning={isLoading}>
          <div className={previewClassName} style={{ width: previewSize, height: (previewSize * 3) / 4 }}>
            {imageSrc && (
              <img
                className={canvasClassName}
                style={{
                  maxWidth: previewSize,
                  maxHeight: (previewSize * 3) / 4
                }}
                src={imageSrc}
              />
            )}
          </div>
        </Spin>
        <div className={optionsClassName} style={{ width: optionsWidth }}>
          <div style={{ marginBottom: 6 }}>Width: {fileInfo?.width}</div>
          <div>Height: {fileInfo?.height}</div>
          <Divider />
          <div>
            <Form
              form={form}
              layout="vertical"
              onValuesChange={(value) => {
                if (value.devicePixelRatio > 0) {
                  setTimeout(() => {
                    resetImage(value.devicePixelRatio);
                  }, 10);
                }
              }}
              disabled={isLoading}
            >
              <Form.Item label="Device pixel ratio" name="devicePixelRatio">
                <Select size="small" options={[1, 2, 3, 4].map((i) => ({ label: `x${i}`, value: i }))} />
              </Form.Item>
              <Form.Item label="File name" name="fileName">
                <Input size="small" placeholder="File name" />
              </Form.Item>
              <Button type="primary" onClick={onClickDownload} disabled={isLoading || !imageSrc} loading={isLoading}>
                Download
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }, [fileInfo, isLoading, imageSrc, resetImage]);
};

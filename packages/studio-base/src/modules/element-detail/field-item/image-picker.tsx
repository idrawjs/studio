import React, { useState, useContext, useMemo } from 'react';
import { Input, Popover, message } from 'antd';
import { is, pickFile, parseFileToBase64 } from 'idraw';
import { ConfigContext } from '../../config-provider';

const { TextArea } = Input;
const modName = 'base-element-field-image-picker';
interface ImagePickerProps {
  value?: string;
  onChange?: (color: string) => void;
}

const { useCallback } = React;
const supportTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/png'];

export const ImagePicker: React.FC<ImagePickerProps> = ({ value = '', onChange }) => {
  const [imageSrc, setImageSrc] = useState<string>(value);
  const [actionStatus, setActionStatus] = useState<'free' | 'picking'>('free');
  const { createPrefixName } = useContext(ConfigContext);
  const generateClassName = createPrefixName(modName);
  const rootClassName = generateClassName();
  const boxClassName = generateClassName('box');
  const entityClassName = generateClassName('entity');
  const actionClassName = generateClassName('action');
  const actionTextClassName = generateClassName('action-text');
  const actionUploadClassName = generateClassName('action-upload');

  const calcTextAreaSize = useCallback(
    (str: string) => {
      const _str = str || '';
      let rows = 3;
      let width = 300;
      if (_str.length > 128) {
        rows = 10;
      }
      return { rows, width };
    },
    [imageSrc]
  );

  const triggerChange = (val: string) => {
    onChange?.(val || value);
  };

  const onImageSrcChange = (src: string) => {
    setImageSrc(src);
    if (is.imageSrc(src)) {
      triggerChange(src);
    }
  };

  const onPickImage = useCallback(() => {
    if (actionStatus === 'picking') {
      return;
    }

    pickFile({
      success: async (data) => {
        if (supportTypes.includes(data.file.type) !== true) {
          message.error(`File's type "${data.file.type}" is not supported!`);
          return;
        }
        try {
          const base64 = await parseFileToBase64(data.file);
          onImageSrcChange(base64.toString());
        } catch (err) {
          message.error(`Failed to parse file ${data.file.name}`);
        }
        setActionStatus('free');
      },
      error: (err) => {
        console.log(err);
        setActionStatus('free');
      }
    });
    setActionStatus('picking');
    setTimeout(() => {
      setActionStatus('free');
    }, 500);
  }, [actionStatus]);

  return useMemo(() => {
    return (
      <div className={rootClassName}>
        <div className={boxClassName}>
          <img className={entityClassName} src={value || imageSrc} />
          <div className={actionClassName}>
            <div className={actionTextClassName}>
              <Popover
                content={() => (
                  <div>
                    <TextArea
                      value={value || imageSrc}
                      style={{ width: calcTextAreaSize(value || imageSrc).width }}
                      rows={calcTextAreaSize(value || imageSrc).rows}
                      onChange={(e) => {
                        onImageSrcChange(e.target.value || '');
                      }}
                    />
                  </div>
                )}
                trigger="click"
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '100%',
                    height: '100%',
                    lineHeight: '50px'
                  }}
                >
                  URL
                </span>
              </Popover>
            </div>
            <div onClick={onPickImage} className={actionUploadClassName}>
              <span>Upload</span>
            </div>
          </div>
        </div>
      </div>
    );
  }, [value, imageSrc]);
};

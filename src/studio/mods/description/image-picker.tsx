import React, { useState } from 'react';
import { Input, Popover, } from 'antd';
import IDraw from 'idraw';

const is = IDraw.is;
const { TextArea } = Input;

interface ImagePickerProps {
  value?: string;
  onChange?: (color: string) => void;
}

const { useCallback } = React;

 
export const ImagePicker: React.FC<ImagePickerProps> = ({ value = '', onChange }) => {
  const [imageSrc, setImageSrc] = useState<string>(value);

  const calcTextAreaSize = useCallback((str) => {
    const _str = str || '';
    let rows = 3;
    let width = 300;
    if (_str.length > 128) {
      rows = 10;
    }
    return { rows, width };
  }, [imageSrc]);


  const triggerChange = (val) => {
    onChange?.(val || value);
  };

  const onImageSrcChange = (src: string) => {
    setImageSrc(src);

    if (is.imageSrc(src)) {
      triggerChange(src);
    }
  };


  return (
      <div className="idraw-studio-mod-desc-imagepicker">
        
          <div className="desc-imagepicker-box">
            <img className="desc-imagepicker-entity" src={imageSrc || value} />
            <div className="desc-imagepicker-action">
              <div className="imagepicker-action imagepicker-action-text" >
                <Popover
                  content={() => (
                  <div>
                    <TextArea
                      value={imageSrc || value}
                      style={{width: calcTextAreaSize(imageSrc || value).width}}
                      rows={calcTextAreaSize(imageSrc || value).rows}
                      onChange={(e) => {
                        onImageSrcChange(e.target.value || '')
                      }}
                    />
                  </div>)}
                  trigger="click"
                > 
                  <span style={{
                    display: 'inline-block',
                    width: '100%',
                    height: '100%',
                    lineHeight: '50px'
                  }}>URL</span>
                </Popover>
              </div>
              <div className="imagepicker-action imagepicker-action-upload">Upload</div>
            </div>
          </div>
        
      </div>
  );
};
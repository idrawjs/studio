import React, { useState } from 'react';
import { Input, Popover, message, } from 'antd';
import IDraw from 'idraw';
import { pickFile, parseFileToText } from '../../util/file';

const is = IDraw.is;
const { TextArea } = Input;

interface SVGPickerProps {
  value?: string;
  onChange?: (color: string) => void;
}

const { useCallback } = React;
const supportTypes = ['image/svg+xml'];
 
export const SVGPicker: React.FC<SVGPickerProps> = ({ value = '', onChange }) => {
  const [svgText, setSvgText] = useState<string>(value);
  const [actionStatus, setActionStatus] = useState<'free'|'picking'>('free')

  const calcTextAreaSize = useCallback((str) => {
    // const _str = str || '';
    let rows = 3;
    let width = 300;
    // if (_str.length > 128) {
    //   rows = 10;
    // }
    return { rows, width };
  }, [svgText]);


  const triggerChange = (val) => {
    onChange?.(val || value);
  };

  const onSVGSrcChange = (svg: string) => {
    setSvgText(svg);
    if (is.svg(svg)) {
      triggerChange(svg);
    }
  };

  const onPickSVG = useCallback(() => {
    if (actionStatus === 'picking') {
      return;
    }
    
    pickFile({
      success: async (data) => {
        console.log('data ===', data);
        if (supportTypes.includes(data.file.type) !== true) {
          message.error(`File's type "${data.file.type}" is not supported!`);
          return;
        }
        try {
          let newSVGText: string = (await parseFileToText(data.file)).toString();
          newSVGText = newSVGText.substring(newSVGText.indexOf('<svg'));
          onSVGSrcChange(newSVGText);
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
    }, 500)
  }, [actionStatus]);


  return (
      <div className="idraw-studio-mod-desc-svgpicker">
        
          <div className="desc-svgpicker-box">
            <div className="desc-svgpicker-entity" dangerouslySetInnerHTML = {{ __html: svgText || value}} />
            <div className="desc-svgpicker-action">
              <div className="svgpicker-action svgpicker-action-text" >
                <Popover
                  content={() => (
                  <div>
                    <TextArea
                      value={svgText || value}
                      style={{width: calcTextAreaSize(svgText || value).width}}
                      rows={calcTextAreaSize(svgText || value).rows}
                      onChange={(e) => {
                        onSVGSrcChange(e.target.value || '')
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
              <div
                onClick={onPickSVG}
                className="svgpicker-action svgpicker-action-upload">
                  <span>Upload</span>
              </div>
            </div>
          </div>
        
      </div>
  );
};
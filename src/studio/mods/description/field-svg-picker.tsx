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

function createMarkup(svg) {
  const div = document.createElement('div');
  div.innerHTML = svg;
  const svgDOM = document.querySelector('svg');
  svgDOM.setAttribute('_t', Date.now() + '');
  return {__html: div.innerHTML};
}


// function loadSVGBase64(svg: string): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const _svg = svg;
//     const blob = new Blob([_svg], { type: 'image/svg+xml;charset=utf-8'});
//     const reader = new FileReader();
//     reader.readAsDataURL(blob);
//     reader.onload = function (event: ProgressEvent<FileReader>) {
//       const base64: string = event?.target?.result as string;
//       resolve(base64)
//     };
//     reader.onerror = function(err) {
//       reject(err);
//     };
//   });
// }
 
export const SVGPicker: React.FC<SVGPickerProps> = ({ value = '', onChange }) => {
  const [svgText, setSvgText] = useState<string>(value);
  const [actionStatus, setActionStatus] = useState<'free'|'picking'>('free');

  const triggerChange = (val) => {
    onChange?.(val || value);
  };

  const onSVGChange = (svg: string) => {
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
        if (supportTypes.includes(data.file.type) !== true) {
          message.error(`File's type "${data.file.type}" is not supported!`);
          return;
        }
        try {
          let newSVGText: string = (await parseFileToText(data.file)).toString();
          newSVGText = newSVGText.substring(newSVGText.indexOf('<svg'));
          onSVGChange(newSVGText);
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
          {/* <div className="desc-svgpicker-entity">
            <img src={svgBase64} />
          </div> */}
          <div className="desc-svgpicker-entity" dangerouslySetInnerHTML={createMarkup(value || svgText)} />
          <div className="desc-svgpicker-action">
            <div className="svgpicker-action svgpicker-action-text" >
              <Popover
                content={() => (
                <div>
                  <TextArea
                    value={value || svgText}
                    style={{width: 300}}
                    rows={10}
                    onChange={(e) => {
                      onSVGChange(e.target.value || '')
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
                }}>Code</span>
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
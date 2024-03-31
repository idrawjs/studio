import React, { useState, useMemo, useCallback } from 'react';
import { message } from 'antd';
import { is, pickFile, parseFileToText } from 'idraw';
import { generateClassName } from '../../../css';

const modName = 'base-element-field-svg-picker';
interface SVGPickerProps {
  value?: string;
  onChange?: (svg: string) => void;
}

const supportTypes = ['image/svg+xml'];

function createMarkup(svg: string) {
  const div = document.createElement('div');
  div.innerHTML = svg;
  const svgDOM = document.querySelector('svg') as SVGSVGElement;
  svgDOM.setAttribute('_t', Date.now() + '');
  return { __html: div.innerHTML };
}

export const SVGPicker: React.FC<SVGPickerProps> = ({ value = '', onChange }) => {
  const [svgText, setSvgText] = useState<string>(value);
  const [actionStatus, setActionStatus] = useState<'free' | 'picking'>('free');

  const rootClassName = generateClassName(modName);
  const boxClassName = generateClassName(modName, 'box');
  const entityClassName = generateClassName(modName, 'entity');
  const actionClassName = generateClassName(modName, 'action');
  const actionUploadClassName = generateClassName(modName, 'action-upload');

  const triggerChange = (val: string) => {
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
    }, 500);
  }, [actionStatus]);

  return useMemo(() => {
    return (
      <div className={rootClassName}>
        <div className={boxClassName}>
          {/* <div className={entityClassName}>
            <img src={svgBase64} />
          </div> */}
          <div className={entityClassName} dangerouslySetInnerHTML={createMarkup(value || svgText)} />
          <div className={actionClassName}>
            {/* <div className={actionTextClassName} >
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
            </div> */}
            <div onClick={onPickSVG} className={actionUploadClassName}>
              <span>Upload</span>
            </div>
          </div>
        </div>
      </div>
    );
  }, [value, svgText]);
};

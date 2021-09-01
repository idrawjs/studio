import React, { useRef, useEffect, useState, useCallback } from 'react';
import classnames from 'classnames';
import iDraw from 'idraw';
import { Tooltip } from 'antd';
// import { TypeDataBase } from '@idraw/types';
import { TypeTemplate } from './../../types';
import eventHub from './../../util/event-hub';


type TypeProps = {
  width: number,
  customTemplates?: TypeTemplate[],
  customTemplatesPagination?: {
    current: number,
    pageSize: number,
    total: number,
    onChange: (page: number) => void;
  }
}

export function Templates(props: TypeProps) {
  const {
    customTemplates = [],
    customTemplatesPagination = {
      current: 1,
      pageSize: 10,
      total: customTemplates.length, // TODO
      onChange: () => {}, // TODO
    }
  } = props;

  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const ref7 = useRef(null);
  const ref8 = useRef(null);
  const ref9 = useRef(null);

  const [refList, setRefList] = useState<React.MutableRefObject<any>[]>([]);
  const [idrawList, setIDrawList] = useState<iDraw[]>([]);
  useEffect(() => {
    const initRefList = [
      ref0, ref1, ref2, ref3, ref4,
      ref5, ref6, ref7, ref8, ref9,
    ];
    const initIDrawList: iDraw[] = [];
    setRefList(initRefList)
    initRefList.forEach((ref) => {
      const idraw: iDraw = new iDraw(ref.current, {
        width: 1,
        height: 1,
        contextHeight: 1,
        contextWidth: 1,
        devicePixelRatio: 1,
        onlyRender: true,
      })
      initIDrawList.push(idraw)
    });
    setIDrawList(initIDrawList);
  }, []);
  
  useEffect(() => {
    if (idrawList.length === 0) {
      return;
    }
    const pageSize = Math.min(refList.length, customTemplatesPagination.pageSize);
    for (let i = 0; i < customTemplates.length; i++) {
      if (i > pageSize) {
        break;
      }
      try {
        const tpl = customTemplates[i];
        const idraw = idrawList[i];
        idraw.resetSize({
          width: tpl.width,
          height: tpl.height,
          contextWidth: tpl.width,
          contextHeight: tpl.height,
        });
        idraw.setData(tpl.data);
      } catch (err) {
        console.log(err);
      }
    }
    
  }, [customTemplates, customTemplatesPagination]);

  const onClickTemplate = useCallback((index: number) => {
    const tpl = customTemplates[index];
    if (tpl) {
      eventHub.trigger('studioUpdateData', tpl.data);
      eventHub.trigger('studioIDrawResetContextSize', {
        width: tpl.width,
        height: tpl.height
      })
    }
  }, [customTemplates]);


  return (
    <div style={{width: props.width}} className="idraw-studio-siderleft-templates">
      <div className="studio-templates-list">
        <div className={classnames({
          'studio-template-item': true,
          'template-show': customTemplates.length >= 1
        })}>
          <Tooltip title={customTemplates[0]?.name || ''} placement="right">
            <div className="template-idraw" ref={ref0} onClick={() => {onClickTemplate(0)}}></div>
          </Tooltip>
        </div>
        <div className={classnames({
          'studio-template-item': true,
          'template-show': customTemplates.length >= 2
        })}>
          <Tooltip title={customTemplates[1]?.name || ''} placement="right">
            <div className="template-idraw" ref={ref1} onClick={() => {onClickTemplate(1)}}></div>
          </Tooltip>
        </div>
        <div className={classnames({
          'studio-template-item': true,
          'template-show': customTemplates.length >= 3
        })}>
          <Tooltip title={customTemplates[2]?.name || ''} placement="right">
            <div className="template-idraw" ref={ref2} onClick={() => {onClickTemplate(2)}}></div>
          </Tooltip>
        </div>
        <div className={classnames({
          'studio-template-item': true,
          'template-show': customTemplates.length >= 4
        })}>
          <Tooltip title={customTemplates[3]?.name || ''} placement="right">
            <div className="template-idraw" ref={ref3} onClick={() => {onClickTemplate(3)}}></div>
          </Tooltip>
        </div>
        <div className={classnames({
          'studio-template-item': true,
          'template-show': customTemplates.length >= 5
        })}>
          <Tooltip title={customTemplates[4]?.name || ''} placement="right">
            <div className="template-idraw" ref={ref4} onClick={() => {onClickTemplate(4)}}></div>
          </Tooltip>
        </div>
        <div className={classnames({
          'studio-template-item': true,
          'template-show': customTemplates.length >= 6
        })}>
          <Tooltip title={customTemplates[5]?.name || ''} placement="right">
            <div className="template-idraw" ref={ref5} onClick={() => {onClickTemplate(5)}}></div>
          </Tooltip>
        </div>
        <div className={classnames({
          'studio-template-item': true,
          'template-show': customTemplates.length >= 7
        })}>
          <Tooltip title={customTemplates[6]?.name || ''} placement="right">
            <div className="template-idraw" ref={ref6} onClick={() => {onClickTemplate(6)}}></div>
          </Tooltip>
        </div>
        <div className={classnames({
          'studio-template-item': true,
          'template-show': customTemplates.length >= 8
        })}>
          <Tooltip title={customTemplates[7]?.name || ''} placement="right">
            <div className="template-idraw" ref={ref7} onClick={() => {onClickTemplate(7)}}></div>
          </Tooltip>
        </div>
        <div className={classnames({
          'studio-template-item': true,
          'template-show': customTemplates.length >= 9
        })}>
          <Tooltip title={customTemplates[8]?.name || ''} placement="right">
            <div className="template-idraw" ref={ref8} onClick={() => {onClickTemplate(8)}}></div>
          </Tooltip>
        </div>
        <div className={classnames({
          'studio-template-item': true,
          'template-show': customTemplates.length >= 10
        })}>
          <Tooltip title={customTemplates[9]?.name || ''} placement="right">
            <div className="template-idraw" ref={ref9} onClick={() => {onClickTemplate(9)}}></div>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

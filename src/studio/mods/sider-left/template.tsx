import React, { useRef, useEffect, useState } from 'react';
import classnames from 'classnames';
import iDraw from 'idraw';
// import { TypeDataBase } from '@idraw/types';
import { TypeTemplate } from './../../types';


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
    
  }, [customTemplates, customTemplatesPagination])


  return (
    <div style={{width: props.width}} className="idraw-studio-siderleft-templates">
      <div className="studio-templates-list">
        <div className={classnames({
          'studio-template-item': true,
          'template-show': customTemplates.length >= 1
        })}>
          <div className="template-idraw" ref={ref0}></div>
        </div>
        <div className={classnames({
          'studio-template-item': true,
          'template-show': customTemplates.length >= 2
        })}>
          <div className="template-idraw" ref={ref1}></div>
        </div>
        <div className={classnames({
          'studio-template-item': true,
          'template-show': customTemplates.length >= 3
        })}>
          <div className="template-idraw" ref={ref2}></div>
        </div>
        <div className={classnames({
          'studio-template-item': true,
          'template-show': customTemplates.length >= 4
        })}>
          <div className="template-idraw" ref={ref3}></div>
        </div>
        <div className={classnames({
          'studio-template-item': true,
          'template-show': customTemplates.length >= 5
        })}>
          <div className="template-idraw" ref={ref4}></div>
        </div>
        <div className={classnames({
          'studio-template-item': true,
          'template-show': customTemplates.length >= 6
        })}>
          <div className="template-idraw" ref={ref5}></div>
        </div>
        <div className={classnames({
          'studio-template-item': true,
          'template-show': customTemplates.length >= 7
        })}>
          <div className="template-idraw" ref={ref6}></div>
        </div>
        <div className={classnames({
          'studio-template-item': true,
          'template-show': customTemplates.length >= 8
        })}>
          <div className="template-idraw" ref={ref7}></div>
        </div>
        <div className={classnames({
          'studio-template-item': true,
          'template-show': customTemplates.length >= 9
        })}>
          <div className="template-idraw" ref={ref8}></div>
        </div>
        <div className={classnames({
          'studio-template-item': true,
          'template-show': customTemplates.length >= 10
        })}>
          <div className="template-idraw" ref={ref9}></div>
        </div>
      </div>
    </div>
  )
}

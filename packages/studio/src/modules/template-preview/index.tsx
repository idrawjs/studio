import React, { useMemo, useEffect, useState, useRef } from 'react';
import type { CSSProperties } from 'react';
import type { Element, Data } from 'idraw';
import classnames from 'classnames';
import { Pagination, Modal } from 'antd';
import { generateClassName } from '@idraw/studio-base';
import type { GetTemplates, TemplateItem } from '../../types';
import { PreviewItem, type PreviewItemProps } from './preview-item';
import { PreviewDetail, type PreviewDetailHandler } from './preview-detail';
import { useLocale } from '../../locale';

const modName = 'mod-template-preview';

export const templatePreivewDrawerStyles = {
  content: {
    width: 490
  },
  header: {
    padding: '10px 20px'
  },
  body: {
    padding: '0'
  }
};

export interface TemplatePreviewProps {
  className?: string;
  style?: CSSProperties;
  getTemplates?: GetTemplates;
  onSelect: PreviewItemProps['onSelect'];
  afterChangePagination?: () => void;
}

export const TemplatePreview = (props: TemplatePreviewProps) => {
  const { className, style, getTemplates, onSelect, afterChangePagination } = props;
  const rootClassName = generateClassName(modName);
  const listClassName = generateClassName(modName, 'list');
  const footerClassName = generateClassName(modName, 'footer');
  const [list, setList] = useState<TemplateItem[]>([]);
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);
  const [total, setTotal] = useState<number>(0);
  const [modal, contextHolder] = Modal.useModal();
  const ref = useRef<HTMLDivElement | null>(null);
  const refDetailHandler = useRef<PreviewDetailHandler | null>(null);

  const [moduleLocale] = useLocale('TemplatePreview');

  const resetList = async (opts: { pageSize: number; current: number }) => {
    ref.current?.scrollTo(0, 0);
    const result = await getTemplates?.(opts);
    if (Array.isArray(result?.list)) {
      setList([...result.list]);
      setCurrent(result.current);
      setPageSize(result.pageSize);
      setTotal(result.total);
    }
  };

  const onPreview = (e: { element: Element | null; locale: typeof moduleLocale }) => {
    const { element } = e;
    const detailData: Data = { elements: [] };
    if (element) {
      detailData.elements.push(element);
    }

    const padding = 24;
    const titleHeight = 24 + 12;
    const footerHeight = 32 + 12;
    const canvasWidth = Math.min(720, window.innerWidth - padding * 2);
    const canvasHeight = Math.min(540, window.innerHeight - padding * 10 - titleHeight - footerHeight);

    const width = canvasWidth + padding * 2;
    const height = canvasHeight + padding * 2 + titleHeight + footerHeight;

    const dialog = modal.confirm({
      icon: null,
      width,
      styles: {
        content: {
          width,
          minHeight: height,
          padding
        }
      },
      closable: true,
      title: element?.name || 'Unamed',
      content: <PreviewDetail data={detailData} parentModName={modName} handler={refDetailHandler} canvasWidth={canvasWidth} canvasHeight={canvasHeight} />,
      okText: moduleLocale.add,
      onOk: () => {
        onSelect({ element });
      },
      cancelText: moduleLocale.cancel,
      onCancel: () => {
        dialog.destroy();
      }
    });
  };

  useEffect(() => {
    resetList({ pageSize, current })
      .then(() => {
        // TODO
      })
      .catch(() => {
        // TODO
      });
  }, []);

  return useMemo(() => {
    return (
      <div ref={ref} style={style} className={classnames(rootClassName, className)}>
        <div className={listClassName}>
          {list.map((item, i) => {
            return (
              <PreviewItem
                key={i}
                width={200}
                height={150}
                parentModName={modName}
                item={item}
                onSelect={onSelect}
                onPreview={(e) => {
                  onPreview({ ...e, ...{ locale: moduleLocale } });
                }}
              />
            );
          })}
        </div>
        <div className={footerClassName}>
          <Pagination
            size="small"
            pageSize={pageSize}
            current={current}
            total={total}
            onChange={(page: number) => {
              resetList({
                current: page,
                pageSize
              });
              afterChangePagination?.();
            }}
          />
        </div>
        {contextHolder}
      </div>
    );
  }, [moduleLocale, list, pageSize, current, total, modal, contextHolder, onPreview]);
};

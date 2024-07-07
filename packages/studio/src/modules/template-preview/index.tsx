import React, { useMemo, useEffect, useState, useRef } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { Pagination } from 'antd';
import { generateClassName } from '@idraw/studio-base';
import type { GetTemplates, TemplateItem } from '../../types';
import { PreviewItem, type PreviewItemProps } from './preview';

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
  const ref = useRef<HTMLDivElement | null>(null);

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
            return <PreviewItem width={200} height={150} parentModName={modName} key={i} item={item} onSelect={onSelect} />;
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
      </div>
    );
  }, [list, pageSize, current, total]);
};

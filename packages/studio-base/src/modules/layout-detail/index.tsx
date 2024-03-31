import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import type { DataLayout, RecursivePartial } from 'idraw';
import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';
import { BasicAttribute } from './basic-attribute';
import { ContentAttribute } from './content-attribute';
// import { BorderAttribute } from './border-attribute';
import { useModuleLocale } from './hooks';
import { generateClassName } from '../../css';

const modName = 'base-layout-detail';

export interface LayoutDetailProps {
  className?: string;
  style?: CSSProperties;
  layout?: DataLayout | null;
  isGroupLayout?: boolean;
  onChange?: (e: RecursivePartial<DataLayout>) => void;
}

export const LayoutDetail = (props: LayoutDetailProps) => {
  const { className, style, layout, onChange, isGroupLayout } = props;

  const moduleLocale = useModuleLocale();
  const rootClassName = generateClassName(modName);

  const items: CollapseProps['items'] = [
    {
      key: 'layout-attribute',
      label: moduleLocale.layout,
      children: (
        <>
          <BasicAttribute
            isGroupLayout={isGroupLayout}
            layout={layout}
            onChange={(e) => {
              onChange?.(e);
            }}
          />
          <ContentAttribute
            layout={layout}
            onChange={(e) => {
              onChange?.(e);
            }}
          />
          {/* <Divider style={{ margin: '10px 0' }} /> */}
          {/* <BorderAttribute
            element={null} // TODO
            onChange={(e) => {
              onChange?.(e);
            }}
          /> */}
        </>
      )
    }
  ];

  return useMemo(() => {
    return (
      <div style={style} className={classnames(rootClassName, className)}>
        <Collapse ghost items={items} size="small" defaultActiveKey={items.map((i) => i.key) as string[]} />
      </div>
    );
  }, [layout, moduleLocale]);
};

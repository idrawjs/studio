import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import type { Element, ElementType, RecursivePartial, DataLayout } from 'idraw';
import { ElementDetail, ElementDetailProps } from '../element-detail';
import { LayoutDetail } from '../layout-detail';
import { useLocale } from '../../locale';
import { generateClassName } from '../../css';

const moduleName = 'ElementDesign';
const modName = 'base-element-design';

export interface ElementDesignProps {
  className?: string;
  style?: CSSProperties;
  element?: Element<ElementType> | null;
  onElementChange?: (e: RecursivePartial<Element>) => void;
  getElementAsset: ElementDetailProps['getElementAsset'];
  createElementAsset: ElementDetailProps['createElementAsset'];

  layout?: DataLayout | null;
  // isGroupLayout?: boolean;
  onLayoutChange?: (e: RecursivePartial<DataLayout>) => void;
}

export const ElementDesign = (props: ElementDesignProps) => {
  const { className, style, element, onElementChange, getElementAsset, createElementAsset, layout, onLayoutChange } = props;
  const [moduleLocale] = useLocale(moduleName);

  const items: TabsProps['items'] = [
    {
      key: 'element-detail',
      label: moduleLocale.element,
      children: <ElementDetail element={element} onChange={onElementChange} getElementAsset={getElementAsset} createElementAsset={createElementAsset} />
    },
    {
      key: 'layout-detail',
      label: moduleLocale.layout,
      children: <LayoutDetail isGroupLayout={layout?.operations?.position === 'relative'} layout={layout} onChange={onLayoutChange} />
    },
    {
      key: 'global',
      label: moduleLocale.global,
      children: <div style={{ padding: 20, textAlign: 'center' }}>TODO</div>
    }
  ];

  return useMemo(() => {
    return (
      <div style={style} className={classnames(generateClassName(modName), className)}>
        <Tabs size="small" defaultActiveKey={items[0].key} items={items} />
      </div>
    );
  }, [element, onElementChange, getElementAsset, createElementAsset, layout, onLayoutChange, moduleLocale]);
};

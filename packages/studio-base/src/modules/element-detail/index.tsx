import React, { useContext, useMemo } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import type { Element, ElementType, RecursivePartial } from 'idraw';
import { getDefaultElementDetailConfig } from 'idraw';
import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';
import { ConfigContext } from '../config-provider';
import { BasicAttribute } from './basic-attribute';
import { BorderAttribute } from './border-attribute';
import { ContentAttribute, ContentAttributeProps } from './content-attribute';
import { ShadowAttribute } from './shadow-attribute';
import { useModuleLocale } from './hooks';

const modName = 'base-element-detail';
const defaultDetail = getDefaultElementDetailConfig();

export interface ElementDetailProps {
  className?: string;
  style?: CSSProperties;
  element?: Element<ElementType> | null;
  onChange?: (e: RecursivePartial<Element>) => void;
  getElementAsset: ContentAttributeProps['getElementAsset'];
  createElementAsset: ContentAttributeProps['createElementAsset'];
}

export const ElementDetail = (props: ElementDetailProps) => {
  const { className, style, element: elem, onChange, getElementAsset, createElementAsset } = props;
  const { createPrefixName } = useContext(ConfigContext);
  const generateClassName = createPrefixName(modName);
  const moduleLocale = useModuleLocale();
  let element: Element | null | undefined = elem;
  if (elem) {
    element = {
      ...(elem || {}),
      ...{
        detail: {
          ...defaultDetail,
          ...elem?.detail
        }
      }
    };
  }

  const items: CollapseProps['items'] = [
    {
      key: 'basic-attribute',
      label: moduleLocale.basicAttributes,
      children: (
        <BasicAttribute
          element={element}
          disabled={!element}
          onChange={(e) => {
            onChange?.(e);
          }}
        />
      )
    },
    {
      key: 'border-attribute',
      label: moduleLocale.borderAttribute,
      children: (
        <BorderAttribute
          element={element}
          disabled={!element}
          onChange={(e) => {
            onChange?.(e);
          }}
        />
      )
    },
    {
      key: 'content-attribute',
      label: moduleLocale.contentAttribute,
      children: (
        <ContentAttribute
          element={element}
          disabled={!element}
          onChange={(e) => {
            onChange?.(e);
          }}
          getElementAsset={getElementAsset}
          createElementAsset={createElementAsset}
        />
      )
    },
    {
      key: 'shadow-attribute',
      label: moduleLocale.shadowAttribute,
      children: (
        <ShadowAttribute
          element={element}
          disabled={!element}
          onChange={(e) => {
            onChange?.(e);
          }}
        />
      )
    }
  ];

  return useMemo(() => {
    return (
      <div style={style} className={classnames(generateClassName(), className)}>
        <Collapse ghost items={items} size="small" defaultActiveKey={items.map((i) => i.key) as string[]} />
      </div>
    );
  }, [element, moduleLocale]);
};

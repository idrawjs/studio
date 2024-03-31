import React, { useMemo, useState, useRef, useEffect } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import type { ElementType, ElementOperations, ElementPosition } from 'idraw';
import { Input } from 'antd';
import type { InputRef } from 'antd';
import IconVisible from '../../icons/visible';
import IconInvisible from '../../icons/invisible';
import IconRect from '../../icons/rect';
import IconCircle from '../../icons/circle';
import IconText from '../../icons/text';
import IconGroup from '../../icons/group';
import IconStar from '../../icons/star';
import IconImage from '../../icons/image';
import IconPath from '../../icons/path';
import IconHTML from '../../icons/html';
import IconArrowRight from '../../icons/arrow-right';

import IconCloseCircle from '../../icons/close-circle';

const modName = 'node';

export interface TreeNodeProps {
  uuid: string;
  nodeKey: string;
  title: string;
  operations: ElementOperations;
  position: ElementPosition;
  className?: string;
  type?: ElementType;
  style?: CSSProperties;
  parentModName: string;
  generateClassName: (...args: string[]) => string;
  onTitleChange?: (e: { uuid: string; value: string }) => void;
  onOperationToggle?: (e: { uuid: string; operations: ElementOperations }) => void;
  onDelete?: (e: { uuid: string }) => void;
  onSelect?: (e: { uuids: string[]; positions: ElementPosition[] }) => void;
  onGoToGroup?: (e: { uuid: string; position: ElementPosition }) => void;
  isSelected: boolean;
}

export const TreeNode = (props: TreeNodeProps) => {
  const {
    className,
    style,
    type,
    uuid,
    nodeKey,
    title,
    position,
    parentModName,
    generateClassName,
    onTitleChange,
    onOperationToggle,
    onDelete,
    onSelect,
    onGoToGroup,
    operations,
    isSelected
  } = props;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [showAction, setShowAction] = useState<boolean>(false);
  const refTitle = useRef<string>(title);

  const rootClassName = generateClassName(parentModName, modName);
  const iconClassName = generateClassName(parentModName, modName, 'icon');
  const titleClassName = generateClassName(parentModName, modName, 'title');
  const titleInputClassName = generateClassName(parentModName, modName, 'title', 'input');
  const titleIconClassName = generateClassName(parentModName, modName, 'title', 'icon');
  const actionClassName = generateClassName(parentModName, modName, 'action');
  const selectedClassName = generateClassName(parentModName, modName, 'selected');
  const clickTime = useRef<number>(0);
  const refInput = useRef<InputRef | null>(null);

  // useEffect(() => {
  //   refTitle.current = title;
  // }, [title]);

  // const refClickTitleTime = useRef<number>(0);

  // const onTitleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
  //   // e.stopPropagation();
  //   // e.preventDefault();
  //   const nowTime = Date.now();
  //   const timeDiff = nowTime - refClickTitleTime.current;
  //   refClickTitleTime.current = nowTime;
  //   if (!(timeDiff >= 0 && timeDiff <= 500)) {
  //     return;
  //   }
  //   e.stopPropagation();
  //   if (isEdit === true) {
  //     return;
  //   }
  //   setIsEdit(true);
  // };

  useEffect(() => {
    if (isEdit === true) {
      refInput.current?.focus();
    }
  }, [isEdit]);

  const onTitleInputBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setIsEdit(false);
    onTitleChange?.({ uuid: nodeKey, value: e.target.value || '' });
  };
  // const onTitleInputOk = (e: any) => {
  //   e.stopPropagation();
  //   setIsEdit(false);
  //   onTitleChange?.({ uuid: nodeKey, value: refTitle.current || '' });
  // };
  const onTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    refTitle.current = e.target.value || '';
  };

  const onTitleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      setIsEdit(false);
      onTitleChange?.({ uuid: nodeKey, value: (e?.target as any)?.value || '' });
    }
  };

  const onTitleInputClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const onNodeMouseOver = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    setShowAction(true);
  };
  const onNodeMouseLeave = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    setShowAction(false);
  };

  // const onClickToEdit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   setIsEdit(true);
  // };

  const onClickTitle = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const nowTime = Date.now();
    const countTime = nowTime - clickTime.current;
    clickTime.current = nowTime;

    onSelect?.({
      uuids: [uuid],
      positions: [position]
    });
    if (countTime <= 300 && countTime > 0) {
      e.stopPropagation();
      e.preventDefault();
      setIsEdit(true);
    }
  };

  const onClickToDelete = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    onDelete?.({
      uuid: nodeKey
    });
  };

  const onClickToggleVisible = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    onOperationToggle?.({
      uuid: nodeKey,
      operations: {
        invisible: !operations.invisible
      }
    });
  };

  const onClickGoToGroup = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    onGoToGroup?.({ uuid, position });
  };

  // const onClickToggleLock = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   onOperationToggle?.({
  //     uuid: nodeKey,
  //     operations: {
  //       lock: !operations.lock
  //     }
  //   });
  // };

  return useMemo(() => {
    refTitle.current = title;
    function getIcon(type?: ElementType) {
      if (type === 'rect') {
        return <IconRect className={titleIconClassName} />;
      } else if (type === 'circle') {
        return <IconCircle className={titleIconClassName} />;
      } else if (type === 'text') {
        return <IconText className={titleIconClassName} />;
      } else if (type === 'path') {
        return <IconPath className={titleIconClassName} />;
      } else if (type === 'image') {
        return <IconImage className={titleIconClassName} />;
      } else if (type === 'svg') {
        return <IconStar className={titleIconClassName} />;
      } else if (type === 'group') {
        return <IconGroup className={titleIconClassName} />;
      } else if (type === 'html') {
        return <IconHTML className={titleIconClassName} />;
      }
      return <span className={titleIconClassName} />;
    }

    return (
      <span
        key={nodeKey}
        style={style}
        className={classnames(rootClassName, className, isSelected ? selectedClassName : null)}
        onClick={onClickTitle}
        onMouseOver={onNodeMouseOver}
        onMouseLeave={onNodeMouseLeave}
      >
        <span className={titleClassName}>
          {getIcon(type)}
          <span>{title}</span>
        </span>
        {showAction && (
          <span className={actionClassName}>
            {type === 'group' && <IconArrowRight className={iconClassName} onClick={onClickGoToGroup} />}
            {operations.invisible ? (
              <IconInvisible className={iconClassName} onClick={onClickToggleVisible} />
            ) : (
              <IconVisible className={iconClassName} onClick={onClickToggleVisible} />
            )}

            {/* {operations.lock ? (
            <IconLock className={iconClassName} onClick={onClickToggleLock} />
          ) : (
            <IconUnlock className={iconClassName} onClick={onClickToggleLock} />
          )} */}
            {/* <IconEdit className={iconClassName} onClick={onClickToEdit} /> */}
            <IconCloseCircle className={iconClassName} onClick={onClickToDelete} />
          </span>
        )}

        {isEdit && (
          <span className={titleInputClassName}>
            <Input
              ref={refInput}
              size="small"
              defaultValue={title}
              onBlur={onTitleInputBlur}
              onClick={onTitleInputClick}
              onKeyDown={onTitleInputKeyDown}
              onChange={onTitleInputChange}
              // addonAfter={<IconCheck onClick={onTitleInputOk} />}
            />
          </span>
        )}
      </span>
    );
  }, [nodeKey, title, isEdit, type, showAction, operations, isSelected]);
};

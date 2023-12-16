import React, { useMemo, useState, useRef } from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import type { ElementType, ElementOperations } from 'idraw';
import { Input } from 'antd';
import IconVisible from '../../icons/visible';
import IconInvisible from '../../icons/invisible';
// import IconUnlock from '../../icons/unlock';
// import IconLock from '../../icons/lock';
import IconCheck from '../../icons/check';
import IconRect from '../../icons/rect';
import IconCircle from '../../icons/circle';
import IconText from '../../icons/text';
import IconGroup from '../../icons/group';
import IconStar from '../../icons/star';
import IconImage from '../../icons/image';
import IconPath from '../../icons/path';
import IconHTML from '../../icons/html';
import IconEdit from '../../icons/edit';
// import IconDelete from '../../icons/delete';

import IconCloseCircle from '../../icons/close-circle';

const modName = 'node';

export interface TreeNodeProps {
  nodeKey: string;
  title: string;
  operatinos: ElementOperations;
  className?: string;
  type?: ElementType;
  style?: CSSProperties;
  getPrefixName: (...args: string[]) => string;
  onTitleChange?: (e: { uuid: string; value: string }) => void;
  onOperationToggle?: (e: { uuid: string; operations: ElementOperations }) => void;
  onDelete?: (e: { uuid: string }) => void;
}

export const TreeNode = (props: TreeNodeProps) => {
  const { className, style, type, nodeKey, title, getPrefixName, onTitleChange, onOperationToggle, onDelete, operatinos } = props;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [showAction, setShowAction] = useState<boolean>(false);
  const refTitle = useRef<string>(title);

  const rootClassName = getPrefixName(modName);
  const iconClassName = getPrefixName(modName, 'icon');
  const titleClassName = getPrefixName(modName, 'title');
  const titleInputClassName = getPrefixName(modName, 'title', 'input');
  const titleIconClassName = getPrefixName(modName, 'title', 'icon');
  const actionClassName = getPrefixName(modName, 'action');

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

  const onTitleInputBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setIsEdit(false);
    onTitleChange?.({ uuid: nodeKey, value: e.target.value || '' });
  };
  const onTitleInputOk = (e: any) => {
    e.stopPropagation();
    setIsEdit(false);
    onTitleChange?.({ uuid: nodeKey, value: refTitle.current || '' });
  };
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

  const onClickToEdit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsEdit(true);
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
        invisible: !operatinos.invisible
      }
    });
  };

  // const onClickToggleLock = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   onOperationToggle?.({
  //     uuid: nodeKey,
  //     operations: {
  //       lock: !operatinos.lock
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
      <span key={nodeKey} style={style} className={classnames(rootClassName, className)} onMouseOver={onNodeMouseOver} onMouseLeave={onNodeMouseLeave}>
        <span className={titleClassName}>
          {getIcon(type)}
          <span>{title}</span>
        </span>
        {showAction && (
          <span className={actionClassName}>
            {operatinos.invisible ? (
              <IconInvisible className={iconClassName} onClick={onClickToggleVisible} />
            ) : (
              <IconVisible className={iconClassName} onClick={onClickToggleVisible} />
            )}
            {/* {operatinos.lock ? (
            <IconLock className={iconClassName} onClick={onClickToggleLock} />
          ) : (
            <IconUnlock className={iconClassName} onClick={onClickToggleLock} />
          )} */}
            <IconEdit className={iconClassName} onClick={onClickToEdit} />
            <IconCloseCircle className={iconClassName} onClick={onClickToDelete} />
          </span>
        )}

        {isEdit && (
          <span className={titleInputClassName}>
            <Input
              size="small"
              defaultValue={title}
              onBlur={onTitleInputBlur}
              onClick={onTitleInputClick}
              onKeyDown={onTitleInputKeyDown}
              onChange={onTitleInputChange}
              addonAfter={<IconCheck onClick={onTitleInputOk} />}
            />
          </span>
        )}
      </span>
    );
  }, [nodeKey, title, isEdit, type, showAction, operatinos]);
};

import React from 'react';
import classnames from 'classnames';

export const Box: React.FC<{
  noBoarder?: boolean,
  style?: React.HTMLAttributes<HTMLDivElement>['style'],
  children?: React.ReactNode
}> = (props) => {
  return (
    <div
      className={classnames({
        'idraw-studio-header-box': true,
        'no-border': props.noBoarder === true,
      })}
      style={props.style || {}}
    >
      {props.children}
    </div>
  )
}
 

export const BoxText: React.FC<{
  text: string,
  style?: React.HTMLAttributes<HTMLDivElement>['style'],
}> = (props) => {
  return (
    <span
      className="idraw-studio-header-box-text"
      style={props.style || {}}
    >
      {props.text}
    </span>
  )
}
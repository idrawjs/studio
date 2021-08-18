import classnames from 'classnames';

export const Box: React.FC<{
  noBoarder?: boolean,
  style?: React.HTMLAttributes<HTMLDivElement>['style'],
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
 
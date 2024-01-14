// Thanks to: https://github.com/tomkp/react-split-pane/blob/master/src/Resizer.js
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useContext, useMemo } from 'react';
import { ConfigContext } from '../config-provider';
import { createPrefixName } from '../../css';

const modName = 'base-split-pane';

const prefixName = createPrefixName(modName);

const useModuleClassName = () => {
  const { generateClassName } = useContext(ConfigContext);
  const modClassName = generateClassName(modName);
  return { modClassName };
};

// TODO
function Resizer(props: any) {
  const { modClassName } = useModuleClassName();
  const { className, onClick, onDoubleClick, onMouseDown, onTouchEnd, onTouchStart, resizerClassName = modClassName, split, style } = props;
  const classes = [resizerClassName, split, className];
  return useMemo(() => {
    return (
      <span
        role="presentation"
        className={classes.join(' ')}
        style={style}
        onMouseDown={(event) => onMouseDown(event)}
        onTouchStart={(event) => {
          event.preventDefault();
          onTouchStart(event);
        }}
        onTouchEnd={(event) => {
          event.preventDefault();
          onTouchEnd(event);
        }}
        onClick={(event) => {
          if (onClick) {
            event.preventDefault();
            onClick(event);
          }
        }}
        onDoubleClick={(event) => {
          if (onDoubleClick) {
            event.preventDefault();
            onDoubleClick(event);
          }
        }}
      />
    );
  }, []);
}

// Resizer.propTypes = {
//   className: PropTypes.string.isRequired,
//   onClick: PropTypes.func,
//   onDoubleClick: PropTypes.func,
//   onMouseDown: PropTypes.func.isRequired,
//   onTouchStart: PropTypes.func.isRequired,
//   onTouchEnd: PropTypes.func.isRequired,
//   split: PropTypes.oneOf(['vertical', 'horizontal']),
//   style: stylePropType,
//   resizerClassName: PropTypes.string.isRequired,
// };

export default Resizer;

import React from 'react';
import classnames from 'classnames';
import { useIconClassName } from './util';
import type { IconProps } from './util';

const Mouse = (props: IconProps) => {
  const { className, style } = props;
  const { iconClassName } = useIconClassName();

  return (
    <span className={classnames([iconClassName, className])} style={style}>
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
        <path d="M192 96l17.248-26.976A32 32 0 0 0 160 97.44L192 96z m34.912 771.36l-31.968 1.472a32 32 0 0 0 53.12 22.592l-21.12-24.064z m194.496-170.88l27.712-16a32 32 0 0 0-48.832-8.064l21.12 24.032z m139.648 241.824l-27.712 16a32 32 0 0 0 43.712 11.712l-16-27.712z m175.872-101.536l16 27.712a32 32 0 0 0 11.712-43.712l-27.712 16z m-139.616-241.856l-10.24-30.336a32 32 0 0 0-17.472 46.336l27.712-16z m245.248-82.976l10.24 30.304a32 32 0 0 0 7.008-57.28l-17.248 26.976zM160.032 97.44l34.912 771.392 63.936-2.88L224 94.528l-63.936 2.88z m88 793.984l194.496-170.944-42.24-48.064-194.496 170.912 42.24 48.096z m145.664-178.976l139.648 241.856 55.424-32-139.648-241.856-55.424 32z m183.36 253.568l175.872-101.536-32-55.424-175.872 101.536 32 55.424z m187.584-145.28l-139.616-241.824-55.424 32 139.616 241.856 55.424-32z m-157.088-195.52l245.28-82.976-20.512-60.608-245.28 82.944 20.512 60.64z m252.256-140.256L209.248 69.024 174.72 122.976l650.56 415.904 34.496-53.92z"></path>
      </svg>
    </span>
  );
};

export default Mouse;

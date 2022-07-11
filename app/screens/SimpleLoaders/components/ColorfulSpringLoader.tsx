import React from 'react';

import { palette } from 'styles';

import { Props as SpringLoaderProps, SpringLoader } from './SpringLoader';

export const ColorfulSpringLoader = ({...props}: SpringLoaderProps) => {
  return (
    <SpringLoader
      {...props}
      colorSequence={[
        palette.mbankTheme.red,
        palette.mbankTheme.black,
        palette.mbankTheme.orange,
        palette.mbankTheme.scarlet,
        palette.mbankTheme.blue,
        palette.mbankTheme.green,
      ]}
    />
  )
};

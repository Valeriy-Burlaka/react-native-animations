import React from 'react';
import Svg, { Circle } from 'react-native-svg';
import { SharedValue } from 'react-native-reanimated';

interface Props {
  width: number;
  thickness: number;
  progress: SharedValue<number>;
}

export const ProgressCircle = ({ width, thickness, progress}: Props) => {
  const size = width - 32; // pad width
  const strokeWidth = thickness;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  return (
    <Svg width={size} height={size}>
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(0, 0, 0, 0.1)"
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference / 6},${circumference / 6}`}
      />
    </Svg>
  )
}
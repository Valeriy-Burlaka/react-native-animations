import React from 'react';
import Animated from 'react-native-reanimated';
import Svg, { Circle, G } from 'react-native-svg';

import { palette } from 'styles';

export function SamsungCircleLoader () {
  const size = 100;
  const thickness = 5;

  const strokeWidth = thickness;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  return (
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={palette.princessBlue}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference * 0.5} ${circumference * 0.5}`}
            strokeDashoffset={circumference * 0.25}
            strokeLinecap="round"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={palette.greenery}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference * 0.5} ${circumference * 0.5}`}
            strokeDashoffset={circumference * -0.25}
            strokeLinecap="round"
          />
        </G>
      </Svg>
  );
}

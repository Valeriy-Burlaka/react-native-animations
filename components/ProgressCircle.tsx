import React from 'react';
import Svg, { Circle, G } from 'react-native-svg';
import Animated, { SharedValue, useAnimatedProps } from 'react-native-reanimated';

import { palette } from '../styles';

interface Props {
  size: number;
  progressPercent: SharedValue<number>;
  thickness?: number;
  color?: string;
}

const Progress = Animated.createAnimatedComponent(Circle);

export const ProgressCircle = ({
  progressPercent,
  size = 140,
  thickness = 20,
  color = palette.grey50,
}: Props) => {
  const strokeWidth = thickness;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const progressCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: circumference * Math.max(0, (100 - progressPercent.value) / 100),
    };
  });

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeOpacity={0.2}
        />
        <Progress
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          animatedProps={progressCircleProps}
        />
      </G>
    </Svg>
  )
}

import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import styled from '@emotion/native';
import Svg, { Circle, G } from 'react-native-svg';
import Animated, { SharedValue, useAnimatedProps } from 'react-native-reanimated';

import { palette } from 'styles';

interface Props {
  progressPercent: SharedValue<number>;
  color?: string;
  displayProgressValue?: boolean;
  size?: number;
  thickness?: number;
}

const AnimatedProgressCircle = Animated.createAnimatedComponent(Circle);
const AnimatedProgressValue = Animated.createAnimatedComponent(styled(TextInput)<{ color: string; fontSize: number }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: 900;
  text-align: center;
`);

export const ProgressCircle = ({
  progressPercent,
  color = palette.grey50,
  size = 140,
  displayProgressValue = false,
  thickness = 20,
}: Props) => {
  const strokeWidth = thickness;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const progressCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: circumference * Math.max(0, (100 - progressPercent.value) / 100),
    };
  });

  const progressValue = useAnimatedProps(() => {
    // console.log(Math.min(100, Math.round(progressPercent.value)))
    return {
      text: `${Math.min(100, Math.round(progressPercent.value))}%`,
    };
  });

  return (
    <View>
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
          <AnimatedProgressCircle
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
      {displayProgressValue && (
        <AnimatedProgressValue
          defaultValue="0"
          editable={false}
          color={color}
          fontSize={radius / 2}
          animatedProps={progressValue}
        />
       )}
    </View>
  )
}

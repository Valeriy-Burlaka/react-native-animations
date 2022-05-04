import React from 'react';
import { View } from 'react-native';
import styled from '@emotion/native';
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';

import { palette } from '../styles';

interface Props {
  progressColor?: string;
  trackColor?: string;
  height?: number;
  progressPercent: SharedValue<number>;
}

const Track = styled(View)<{ color: string; height: number}>`
  background-color: ${({ color }) => color};
  border-radius: ${({ height }) => `${height}px`};
  height: ${({ height }) => height};
  overflow: hidden;
`;

const Progress = Animated.createAnimatedComponent(Track);

export const ProgressBar = ({
  progressColor = palette.grey50,
  trackColor = palette.grey10,
  height = 20,
  progressPercent,
}: Props) => {
  const progressStyles = useAnimatedStyle(() => {
    return {
      width: `${progressPercent.value}%`,
    }
  })

  return (
    <Track color={trackColor} height={height}>
      <Progress color={progressColor} height={height} style={progressStyles} />
    </Track>
  );
};
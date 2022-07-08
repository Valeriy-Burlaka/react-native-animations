import React, { useEffect } from 'react';
import { View } from 'react-native';
import styled from '@emotion/native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useAnimatedProps,
  useSharedValue,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';

import { palette } from 'styles';

const AnimatedCircle = Animated.createAnimatedComponent(styled.View<{ color: string; size: number }>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-color: ${({ color }) => color};
  border-radius: ${({ size }) => `${size / 2}px`};
  border-width: ${({ size }) => `${Math.round(size / 10)}px`};
  shadow-color: ${({ color }) => color};
  shadow-offset: 0px 0px;
  shadow-opacity: 1;
  shadow-radius: ${({ size }) => `${Math.round(size / 10)}px`};
`);

interface Props {
  color?: string;
  size?: number;
}

export function RippleLoader ({ color = palette.roseQuartz, size = 100 }: Props) {
  const animationProgress = useSharedValue(0);

  useEffect(() => {
    animationProgress.value = withRepeat(
      withTiming(
        1,
        {
          duration: 5000,
        },
      ),
      -1,
    );
  }, []);

  const animatedViewStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animationProgress.value,
        [0, 0.25, 0.5, 0.75, 1],
        [0, 0.5, 0.75, 1, 0],
      ),
      transform: [
        {
          scale: interpolate(animationProgress.value, [0, 1], [0.5, 1.25]),
        }
      ]
    }
  });

  return (
    <AnimatedCircle
      color={color}
      size={size}
      style={animatedViewStyles}
    />
  );
};


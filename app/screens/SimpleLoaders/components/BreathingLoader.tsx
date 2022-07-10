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
  box-sizing: content-box;
  border-color: ${({ color }) => color};
  shadow-color: ${({ color }) => color};
  shadow-offset: 0px 0px;
  shadow-radius: 10px;
`);

interface Props {
  color?: string;
  size?: number;
}

export function BreathingLoader ({ color = palette.white, size = 100 }: Props) {
  const animationProgress = useSharedValue(0);

  useEffect(() => {
    animationProgress.value = withRepeat(
      withTiming(
        1,
        {
          duration: 1500,
        },
      ),
      -1,
    );
  }, []);

  const animatedViewStyles = useAnimatedStyle(() => {
    return {
      borderRadius: interpolate(
        animationProgress.value,
        [0, 1],
        [size / 2, (size + 20) / 2],
      ),
      borderWidth: interpolate(
        animationProgress.value,
        [0, 1],
        [0, size / 10],
      ),
      shadowOpacity: interpolate(
        animationProgress.value,
        [0, 1],
        [0.5, 1],
      )
    }
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AnimatedCircle
        color={color}
        size={size}
        style={animatedViewStyles}
      />
    </View>
  );
};


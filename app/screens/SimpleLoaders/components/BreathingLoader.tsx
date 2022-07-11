import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';

import { palette } from 'styles';

interface Props {
  color?: string;
  size?: number;
}

export function BreathingLoader ({ color = palette.white, size = 100 }: Props) {
  const animationProgress = useSharedValue(0);

  const growToSize = size * 1.2;

  useEffect(() => {
    animationProgress.value = withRepeat(
      withTiming(
        1,
        {
          duration: 2000,
        },
      ),
      -1,
      true,
    );
  }, []);

  const animatedViewStyles = useAnimatedStyle(() => {
    return {
      width: interpolate(
        animationProgress.value,
        [0, 1],
        [size, growToSize],
      ),
      height: interpolate(
        animationProgress.value,
        [0, 1],
        [size, growToSize],
      ),
      borderRadius: interpolate(
        animationProgress.value,
        [0, 1],
        [size / 2, (growToSize) / 2],
      ),
      borderWidth: interpolate(
        animationProgress.value,
        [0, 1],
        [0.1, size / 10],
      ),
      shadowOpacity: interpolate(
        animationProgress.value,
        [0, 1],
        [0, 1],
      )
    }
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: growToSize,
      }}
    >
      <Animated.View
        style={[
          {
            borderColor: color,
            shadowColor: color,
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 10,
          },
          animatedViewStyles
        ]}
      />
    </View>
  );
};


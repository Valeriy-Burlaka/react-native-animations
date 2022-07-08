import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useAnimatedProps,
  useSharedValue,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

import { palette } from 'styles';

// const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {
  size?: number;
}

export function RippleLoader ({ size = 100 }: Props) {

  const thickness = Math.round(size / 10);
  const strokeWidth = thickness;
  const radius = (size - strokeWidth) / 2;
  const color = palette.roseQuartz;

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
    <Animated.View
      style={[
        {
          minHeight: size * 1.25,
          // marginTop: size * 0.25,
          alignItems: 'center',
          justifyContent: 'center',
        },
        animatedViewStyles,
      ]}
    >  
      <Svg
        width={size} height={size}
        viewBox={`0 0 ${size} ${size}`}
        >
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          />
      </Svg>
    </Animated.View>
  );
};


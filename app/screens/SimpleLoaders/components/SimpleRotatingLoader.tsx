import React from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, G } from 'react-native-svg';

import { palette } from 'styles';

interface Props {
  color?: string;
  trackColor?: string;
  size?: number;
  thickness?: number;
  speed?: 1 | 2 | 3;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function SimpleRotatingLoader ({
  color = palette.greenery,
  trackColor = palette.greenery,
  size = 120,
  thickness = 10,
  speed = 1,
}: Props) {
  const strokeWidth = thickness;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const dashOffset = useSharedValue(0);
  const baseAnimationDuration = 1200;

  React.useEffect(() => {
    dashOffset.value = withRepeat(
      withTiming(
        -circumference,
        {
          duration: baseAnimationDuration / speed,
          easing: Easing.linear,
        },
      ),
      -1,
    );
  }, []);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: dashOffset.value,
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
            stroke={trackColor}
            strokeWidth={strokeWidth}
            strokeOpacity={0.2}
          />
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference * 0.25} ${circumference * 0.75}`}
            animatedProps={animatedProps}
          />
        </G>
      </Svg>
    </View>
  );
}

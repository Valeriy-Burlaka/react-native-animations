import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';
import Svg, { Circle, G } from 'react-native-svg';

import { palette } from 'styles';

interface Props {
  color?: string;
  trackColor?: string;
  size?: number;
  thickness?: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function SpringLoader ({
  color = palette.greenery,
  trackColor = palette.greenery,
  size = 120,
  thickness = 10,
}: Props) {
  const strokeWidth = thickness;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const animationProgress = useSharedValue(0);

  const animationProgressInputRange = [
    0,
    0.1,
    0.2,
    0.3,
    0.4,
    0.5,
    0.6,
    0.7,
    0.8,
    0.9,
    1.0,
  ];

  const dashArrayStrokeOutputRange = [
    0.05,
    0.1,
    0.175,
    0.25,
    0.4,
    0.525,
    0.6,  // <-- breakpoint
    0.5,
    0.4,
    0.1,
    0.001,
  ].map(value => value * circumference);

  const dashOffsetOutputRange = [
    0,
    0.05,
    0.1,
    0.15,
    0.2,
    0.325,
    0.35,  // <--
    0.5,
    0.6,
    0.9,
    1,
  ].map(value => value * -circumference);

  const dashArrayStroke = useDerivedValue(() => {
    return interpolate(
      animationProgress.value,
      animationProgressInputRange,
      dashArrayStrokeOutputRange,
      Extrapolate.CLAMP,
    );
  });
  const dashArrayGap = useDerivedValue(() => {
    return circumference - dashArrayStroke.value;
  });
  const dashOffset = useDerivedValue(() => {
    return interpolate(
      animationProgress.value,
      animationProgressInputRange,
      dashOffsetOutputRange,
      Extrapolate.CLAMP,
    );
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDasharray: [dashArrayStroke.value, dashArrayGap.value],
      strokeDashoffset: dashOffset.value,
    };
  });

  useEffect(() => {
    animationProgress.value = withRepeat(
      withSpring(
        1,
        {
          stiffness: 25,
          damping: 100,
          mass: 1.5,
        }
      ),
      -1,
    );
  }, [animationProgress]);

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
            strokeLinecap="round"
            animatedProps={animatedProps}
          />
        </G>
      </Svg>
    </View>
  );
}

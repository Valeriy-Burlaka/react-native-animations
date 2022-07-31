import React, { useEffect } from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, G } from 'react-native-svg';

import { palette } from 'styles';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function SamsungCircleLoader () {
  const size = 100;
  const thickness = 5;

  const strokeWidth = thickness;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const animationProgress = useSharedValue(0);

  useEffect(() => {
    animationProgress.value = withRepeat(
      withTiming(3, { duration: 6000 }),
      -1,
    );
  }, []);

  const dashArrayStroke = useDerivedValue(() => {
    return interpolate(
      animationProgress.value,
      [0, 0.5, 1, 1.5, 2],
      [
        circumference * 0.5,
        circumference * 0.05,
        circumference * 0.1,
        circumference * 0.1,
        circumference * 0.5,
      ],
      Extrapolate.CLAMP,
    )
  });

  const dashArrayGap = useDerivedValue(() => {
    return circumference - dashArrayStroke.value;
  });

  const dashOffsetCompensation = useDerivedValue(() => {
    return circumference * 0.5 - dashArrayStroke.value;
  })

  const blueHalfCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: interpolate(
        animationProgress.value,
        [0, 3],
        [
          circumference * -0.5 - (dashOffsetCompensation.value),
          circumference * -3.5 - (dashOffsetCompensation.value),
        ],
      ),
      strokeDasharray: [dashArrayStroke.value, dashArrayGap.value],
    };
  });

  const greenHalfCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: interpolate(
        animationProgress.value,
        [0, 3],
        [
          -dashOffsetCompensation.value,
          -circumference * 3 - (dashOffsetCompensation.value),
        ],
      ),
      strokeDasharray: [dashArrayStroke.value, dashArrayGap.value],
    };
  });

  return (
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <G
        // rotation="-90" origin={`${size / 2}, ${size / 2}`}
        >
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={palette.princessBlue}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            animatedProps={blueHalfCircleProps}
          />
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={palette.greenery}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            animatedProps={greenHalfCircleProps}
          />
        </G>
      </Svg>
  );
}

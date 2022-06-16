import React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedProps, withRepeat, withTiming } from 'react-native-reanimated';
import Svg, { Circle, G } from 'react-native-svg';

import { palette } from 'styles';

interface Props {
  color?: string;
  size?: number;
  thickness?: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function SimpleRotation ({
  color = palette.greenery,
  size = 120,
  thickness = 10
}: Props) {
  const strokeWidth = thickness;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withRepeat(
        withTiming(-circumference / 2, {
          duration: 1000,
        }),
        -1,
      ),
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
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            // strokeDasharray={circumference * 0.1}
            strokeDasharray={`${circumference * 0.25} ${circumference * 0.75}`}
            // strokeDashoffset={circumference * 0.75}
            // strokeDashoffset={0}
            animatedProps={animatedProps}
          />
        </G>
      </Svg>
    </View>
  );
}
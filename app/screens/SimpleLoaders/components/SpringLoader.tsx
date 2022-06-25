import React, { useEffect } from 'react';
import { Button, View } from 'react-native';
import Animated, { useSharedValue, useDerivedValue, useAnimatedProps, interpolate, withTiming, withRepeat, Easing, useAnimatedStyle } from 'react-native-reanimated';
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

export function SpringLoader ({
  color = palette.greenery,
  trackColor = palette.greenery,
  size = 120,
  thickness = 10,
  speed = 1,
}: Props) {
  const strokeWidth = thickness;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const baseAnimationDuration = 2400;

  const animationProgress = useSharedValue(0);


  const dashOffsetStroke = useSharedValue(0);

  useEffect(() => {
    dashOffsetStroke.value = withRepeat(withTiming(
      circumference,
      {
        duration: baseAnimationDuration,
      },
    ), -1);
  }, [dashOffsetStroke]);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDasharray: [dashOffsetStroke.value, circumference - dashOffsetStroke.value],
    }
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
            strokeLinecap="round"
            // strokeDasharray={'30 -1'}
            // strokeDasharray={[circumference * 0.21, circumference - (circumference * 0.21)]}
            // strokeDasharray={`${circumference * 0.05} ${circumference * (1 - 0.05)}`}
            // strokeDashoffset={-circumference * 0.75}
            animatedProps={animatedProps}
          />
        </G>
      </Svg>
    </View>
  );
  // const width = useSharedValue(50);

  // const style = useAnimatedStyle(() => {
  //   return {
  //     width: withTiming(width.value, {
  //       duration: 500,
  //       easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  //     }),
  //   };
  // });

  // return (
  //   <View>
  //     <Animated.View style={[{ borderColor: palette.livingCoral, borderWidth: 3 },  style]} />
  //     <Button onPress={() => (width.value = Math.random() * 300)} title="Hey" />
  //   </View>
  // );
}

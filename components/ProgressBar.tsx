import React from 'react';
import { View } from 'react-native';
import Animated, {SharedValue, useAnimatedStyle } from 'react-native-reanimated';

interface Props {
  progress: SharedValue<number>;
  height: number;
}

export const ProgressBar = ({ height, progress }: Props) => {
  const styles = useAnimatedStyle(() => {
    return {
      width: `${progress.value}%`,
    }
  })

  return (
    <>
      {/* <Text
        style={{
          fontFamily: 'Menlo',
          fontSize: 16,
          fontWeight: '900',
          marginBottom: 4
        }}
      >
        {step}/{steps}
      </Text> */}
      <View
        style={{
          height,
          borderRadius: height,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        <Animated.View
          style={[{
            height,
            borderRadius: height,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }, styles]}
        />
      </View>
    </>
  );
};
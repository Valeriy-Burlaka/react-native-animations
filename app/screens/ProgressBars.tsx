import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSharedValue } from 'react-native-reanimated';
import type { DrawerScreenProps } from '@react-navigation/drawer';

import { palette } from 'styles';
import { DrawerStackParamList } from 'components/Navigation/types';
import { OpenDrawerButton } from 'components/Navigation/OpenDrawerButton';
import { ProgressBar } from 'components/ProgressBar';
import { ProgressCircle } from 'components/ProgressCircle';

const styles = StyleSheet.create({
  circleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  container: {
    backgroundColor: palette.white,
    flex: 1,
    justifyContent: 'space-evenly',
    // padding: 20,
  },
});

export function ProgressBarsScreen ({ navigation, route }: DrawerScreenProps<DrawerStackParamList, 'ProgressBar'>) {
  const progress = useSharedValue(0);

  useEffect(() => {
    const progressUpdateInterval = setInterval(() => {
      progress.value = (progress.value + Math.random() * 5) % 101;
    }, 300);

    return () => clearInterval(progressUpdateInterval);

  }, []);

  return (
    <View style={styles.container}>
      {/* <StatusBar hidden /> */}

      <OpenDrawerButton navigation={navigation} route={route} />

      <ProgressBar height={20} progressPercent={progress} />

      <View style={styles.circleContainer}>
        <ProgressCircle
          size={140}
          thickness={20}
          progressPercent={progress}
          color="tomato"
          displayProgressValue={true}
        />
      </View>
      <View style={styles.circleContainer}>
        <ProgressCircle
          size={100}
          thickness={15}
          progressPercent={progress}
          color="gold"
          displayProgressValue={true}
        />
        <ProgressCircle size={50} thickness={5} progressPercent={progress} color="skyblue" />
        <ProgressCircle
          size={75}
          thickness={10}
          progressPercent={progress}
          displayProgressValue={true}
        />
      </View>
    </View>
  );
}

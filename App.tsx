import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { palette } from './styles'
import { ProgressBar } from './components/ProgressBar';
import { ProgressCircle } from './components/ProgressCircle';

const styles = StyleSheet.create({
  circleContainer: {
    alignItems: 'center'
  },
  container: {
    backgroundColor: palette.white,
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 20,
  },
});

export default function App() {
  const progress = useSharedValue(0);

  useEffect(() => {
    const progressUpdateInterval = setInterval(() => {
      progress.value = (progress.value + Math.random() * 5) % 101;
    }, 300);

    return () => clearInterval(progressUpdateInterval);

  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ProgressBar height={20} progressPercent={progress} />

      <View style={styles.circleContainer}>
        <ProgressCircle width={180} thickness={20} progress={progress} />
      </View>
      
    </View>
  );
}

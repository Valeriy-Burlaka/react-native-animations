import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { ProgressBar } from './components/Progress';

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
      <ProgressBar height={20} progress={progress} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
});

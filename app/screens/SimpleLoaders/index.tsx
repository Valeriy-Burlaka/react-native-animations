import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import type { DrawerScreenProps } from '@react-navigation/drawer';

import { palette } from 'styles';
import { DrawerStackParamList } from 'components/Navigation/types';
import { OpenDrawerButton } from 'components/Navigation/OpenDrawerButton';

import { SimpleRotation } from './components/SimpleRotation';

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

export function SimpleLoadersScreen ({ navigation, route }: DrawerScreenProps<DrawerStackParamList, 'Loaders'>) {
  const progress = useSharedValue(0);

  useEffect(() => {
    const progressUpdateInterval = setInterval(() => {
      progress.value = (progress.value + Math.random() * 5) % 101;
    }, 300);

    return () => clearInterval(progressUpdateInterval);

  }, []);

  return (
    <View style={styles.container}>
      <OpenDrawerButton navigation={navigation} route={route} />

      <View style={styles.circleContainer}>
        <SimpleRotation />
      </View>
    </View>
  );
}

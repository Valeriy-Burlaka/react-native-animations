import { registerRootComponent } from 'expo';

import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { palette } from 'styles'
import { ProgressBar } from 'components/ProgressBar';
import { ProgressCircle } from 'components/ProgressCircle';

import Navigation from 'components/Navigation';

// const styles = StyleSheet.create({
//   circleContainer: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//   },
//   container: {
//     backgroundColor: palette.white,
//     flex: 1,
//     // justifyContent: 'space-evenly',
//     // padding: 20,
//   },
// });

// export default function App() {
function App() {
  const progress = useSharedValue(0);

  useEffect(() => {
    const progressUpdateInterval = setInterval(() => {
      progress.value = (progress.value + Math.random() * 5) % 101;
    }, 300);

    return () => clearInterval(progressUpdateInterval);

  }, []);

  return <Navigation />;

  // return (
  //   <View style={styles.container}>
  //     <StatusBar hidden />

  //     {/* <ProgressBar height={20} progressPercent={progress} />

  //     <View style={styles.circleContainer}>
  //       <ProgressCircle
  //         size={140}
  //         thickness={20}
  //         progressPercent={progress}
  //         color="tomato"
  //         displayProgressValue={true}
  //       />
  //     </View>
  //     <View style={styles.circleContainer}>
  //       <ProgressCircle
  //         size={100}
  //         thickness={15}
  //         progressPercent={progress}
  //         color="gold"
  //         displayProgressValue={true}
  //       />
  //       <ProgressCircle size={50} thickness={5} progressPercent={progress} color="skyblue" />
  //       <ProgressCircle
  //         size={75}
  //         thickness={10}
  //         progressPercent={progress}
  //         displayProgressValue={true}
  //       />
  //     </View> */}
  //   </View>
  // );
}

export default registerRootComponent(App);
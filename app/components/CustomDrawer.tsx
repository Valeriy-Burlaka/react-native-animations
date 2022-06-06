import React, { useEffect } from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import styled from '@emotion/native';
import { Text, TextStyle, TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import Svg, { Polygon } from 'react-native-svg';

import type { DrawerNavigationState } from '@react-navigation/native';
import { DrawerScreenProps, useDrawerStatus } from '@react-navigation/drawer';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

import { DrawerStackParamList } from 'components/Navigation/types';

import { palette } from 'styles';

const { width, height } = Dimensions.get('screen');

const colors = [
  palette['livingCoral'],
  palette['greenery'],
  palette['white'],
];

const styles = StyleSheet.create({
  button: {
    fontSize: 34,
    lineHeight: 34 * 1.5,
  },
  menu: {
    // flex: 1,
    // justifyContent: 'space-between',
  },
  menuContainer: {
    // alignItems: 'flex-start',
    backgroundColor: palette.grey80,
    flex: 1,
    paddingBottom: 30,
    paddingLeft: 30,
    paddingTop: 80,
  },
})

interface ButtonProps {
  label: string;
  onPress: () => void;
  style: TextStyle;
}

const Button = ({ onPress, label, style }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={style}>{label}</Text>
    </TouchableOpacity>
  )
};

const StyledIcon = styled(AntDesign)`
  position: absolute;
  top: 40px;
  right: 20px;
`;

// const AnimatedIcon = Animated.createAnimatedComponent(StyledIcon);
// const OpenMenuButton = ({ onPress, X }: { onPress: () => void; X: SharedValue<number> }) => {
//   const animatedStyles = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           translateX: X.value,
//         }
//       ]
//     }
//   });

//   return (
//     <AnimatedIcon
//       name="menufold"
//       size={34}
//       color="#222"
//       onPress={onPress}
//       style={animatedStyles}
//     />
//   )
// };

const CloseMenuButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <StyledIcon
      name="close"
      size={34}
      color="#fff"
      onPress={onPress}
    />
  )
};

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

interface DrawerProps {
  // navigation: DrawerScreenProps<DrawerStackParamList, keyof DrawerStackParamList>;
  navigation: DrawerNavigationHelpers;
  routes: string[];
  selectedRoute: string;
}

export default function CustomDrawer({ navigation, routes, selectedRoute }: DrawerProps) {
  const drawerStatus = useDrawerStatus();

  const transitionTime = 500;
  const onDrawerOpen = () => {
    X.value = withTiming(toCoords.x, { duration: transitionTime });
    Y.value = withTiming(toCoords.y, { duration: transitionTime });
  };
  const onDrawerClose = () => {
    X.value = withTiming(fromCoords.x, { duration: transitionTime });
    Y.value = withTiming(fromCoords.y, { duration: transitionTime });
    navigation.closeDrawer();
  };

  useEffect(() => {
    if (drawerStatus === 'open') {
      onDrawerOpen();
    } else {
      onDrawerClose();
    }
  }, [drawerStatus]);

  const fromCoords = { x: 0, y: height };
  // FIXME: this accounts for a screen width but we now display the Drawer in the "drawer width"
  const toCoords = { x: width, y: 0 };
  const X = useSharedValue(fromCoords.x);
  const Y = useSharedValue(fromCoords.y);

  const polygonProps = useAnimatedProps(() => {
    return {
      points: `0,0 ${X.value},${Y.value} ${width},${height} 0,${height}`,
    };
  });

  console.log('Selected route:', selectedRoute);

  const onPressRoute = (routeName: string) => {
    console.log(`Pressed route "${routeName}"`);
    navigation.navigate(routeName);
  };

  return (
    <>
      <MaskedView
        style={{ flex: 1 }}
        maskElement={
          <Svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            style={{ backgroundColor: 'transparent' }}
          >
            {/* The 'fill' is whatever unless it's 'transparent'. It is 'white anyway */}
            <AnimatedPolygon fill="green" animatedProps={polygonProps} />
          </Svg>
        }
      >
        <View style={styles.menuContainer}>
          <CloseMenuButton onPress={onDrawerClose} />
          <View style={styles.menu}>
            <View>
              {routes.map((route, index) => {
                return (
                  <Button
                    label={route}
                    key={route}
                    onPress={() => onPressRoute(route)}
                    style={[styles.button, { color: colors[index]}]}
                  />
                )
              })}
            </View>
          </View>
        </View>
      </MaskedView>
      {/* <OpenMenuButton onPress={onDrawerOpen} X={X} /> */}
    </>
  );
};

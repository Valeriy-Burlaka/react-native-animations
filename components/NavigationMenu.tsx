import React from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import styled from '@emotion/native';
import { Text, TextStyle, TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Animated, {
  interpolate,
  Extrapolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  SharedValue,
} from 'react-native-reanimated';
import Svg, { Polygon } from 'react-native-svg';

import { palette } from '../styles';

const { width, height } = Dimensions.get('screen');

const routes = [
  'Progress Loaders',
  'Infinite Loaders',
];

// https://www.w3schools.com/colors/colors_trends.asp
const colors = [
  '#FF6F61',  // "Living coral"
  '#88B04B',  // "Greenery"
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
    alignItems: 'flex-start',
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

const OpenMenuButton = ({ onPress, X }: { onPress: () => void; X: SharedValue<number> }) => {
  const AnimatedIcon = Animated.createAnimatedComponent(StyledIcon);

  const styles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(X.value, [0, width], [0, +width], Extrapolate.CLAMP)
        }
      ]
    };
  });

  return (
    <AnimatedIcon
      name="menufold"
      size={34}
      color="#222"
      onPress={onPress}
      style={styles}
    />
  )
};

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

const CustomDrawer = () => {
  const onPressRoute = (routeName: string) => {
    console.log(`Pressed route "${routeName}"`);
  };
  
  const fromCoords = { x: 0, y: height };
  const toCoords = { x: width, y: 0 };
  const transitionTime = 750;
  const X = useSharedValue(fromCoords.x);
  const Y = useSharedValue(fromCoords.y);

  const polygonProps = useAnimatedProps(() => {
    return {
      points: `0,0 ${X.value},${Y.value} ${width},${height} 0,${height}`,
    };
  });

  const onOpenNavMenu = () => {
    X.value = withTiming(toCoords.x, { duration: transitionTime });
    Y.value = withTiming(toCoords.y, { duration: transitionTime });
  };

  const onCloseDrawer = () => {
    X.value = withTiming(fromCoords.x, { duration: transitionTime });
    Y.value = withTiming(fromCoords.y, { duration: transitionTime });
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
            <AnimatedPolygon fill="green" animatedProps={polygonProps} />
          </Svg>
        }
      >
        <View style={styles.menuContainer}>
          <CloseMenuButton onPress={onCloseDrawer} />
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
      <OpenMenuButton onPress={onOpenNavMenu} X={X} />
    </>
  );
};

export const NavigationMenu = () => {
  return (
    <CustomDrawer />
  );
};

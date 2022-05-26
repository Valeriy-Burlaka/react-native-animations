import * as React from 'react';
import { SafeAreaView, Text } from 'react-native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';

import { DrawerStackParamList } from 'components/Navigation/types';
import { palette } from 'styles';

type ScreenProps = {
  label: string;
  backgroundColor: string;
} & Pick<DrawerScreenProps<DrawerStackParamList>, 'navigation' | 'route'>;

function Screen({ label, backgroundColor, navigation, route }: ScreenProps) {
  return (
    // not exactly "safe", -- screen element overlaps with the status bar..
    <SafeAreaView
      style={{
        backgroundColor,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <OpenDrawerButton navigation={navigation} route={route} />
      <Text style={{ fontSize: 42 }}>{label}</Text>
    </SafeAreaView>
  );
};

function OpenDrawerButton({ navigation }: DrawerScreenProps<DrawerStackParamList, keyof DrawerStackParamList>) {
  return (
    <AntDesign
      name="menufold"
      size={32}
      color="#222"
      style={{ position: 'absolute', top: 50, right: 0, paddingRight: 30 }}
      onPress={() => navigation.openDrawer()}
      hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
    />
  );
}

export function GetStartedScreen({ navigation, route }: DrawerScreenProps<DrawerStackParamList, 'GetStarted'>) {
  return (
    <Screen
      backgroundColor={palette['grey10']}
      label={'Get Started'}
      navigation={navigation}
      route={route}
    />
  );
}

export function ProgressBarScreen({ navigation, route }: DrawerScreenProps<DrawerStackParamList, 'ProgressBar'>) {
  return (
    <Screen
      backgroundColor={palette['greenery']}
      label={'Progress Bar'}
      navigation={navigation}
      route={route}
    />
  );
}

export function LoadersScreen({ navigation, route }: DrawerScreenProps<DrawerStackParamList, 'Loaders'>) {
  return (
    <Screen
      backgroundColor={palette['livingCoral']}
      label={'Loaders'}
      navigation={navigation}
      route={route}
    />
  );
}

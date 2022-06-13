import * as React from 'react';
import { SafeAreaView, Text } from 'react-native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';

import { palette } from 'styles';

import { DrawerStackParamList } from 'components/Navigation/types';
import { OpenDrawerButton } from 'components/Navigation/OpenDrawerButton';

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

export function GetStartedScreen({ navigation, route }: DrawerScreenProps<DrawerStackParamList, 'GetStarted'>) {
  return (
    <Screen
      backgroundColor={palette['livingCoral']}
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
      backgroundColor={palette['grey10']}
      label={'Loaders'}
      navigation={navigation}
      route={route}
    />
  );
}

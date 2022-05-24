import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import {
  GetStartedScreen,
  ProgressBarScreen,
  LoadersScreen,
} from './screens';

const Drawer = createDrawerNavigator();

export type DrawerStackParamList = {
  GetStarted: undefined;
  ProgressBar: undefined;
  Loaders: undefined;
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="GetStarted" screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="GetStarted" component={GetStartedScreen} />
        <Drawer.Screen name="ProgressBar" component={ProgressBarScreen} />
        <Drawer.Screen name="Loaders" component={LoadersScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
};

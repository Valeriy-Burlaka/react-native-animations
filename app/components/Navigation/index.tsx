import * as React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

import CustomerDrawer from 'components/CustomDrawer';

import {
  GetStartedScreen,
  ProgressBarScreen,
  LoadersScreen,
} from 'screens';

const { width } = Dimensions.get('screen');
const Drawer = createDrawerNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="GetStarted"
        
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: 'transparent',
            width: '100%',
          },
          drawerType: 'front',
          // overlayColor: 'transparent',
        }}
        drawerContent={(props: DrawerContentComponentProps) => {
          return (
            <CustomerDrawer
              navigation={props.navigation}
              routes={props.state.routeNames}
              selectedRoute={props.state.routeNames[props.state.index]}
            />
          );
        }}
      >
        <Drawer.Screen name="GetStarted" component={GetStartedScreen} />
        <Drawer.Screen name="ProgressBar" component={ProgressBarScreen} />
        <Drawer.Screen name="Loaders" component={LoadersScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
};

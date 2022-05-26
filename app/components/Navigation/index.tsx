import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import CustomerDrawer from 'components/CustomDrawer';

import {
  GetStartedScreen,
  ProgressBarScreen,
  LoadersScreen,
} from 'screens';

const Drawer = createDrawerNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="GetStarted"
        screenOptions={{ headerShown: false }}
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

import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

import CustomerDrawer from 'components/CustomDrawer';
import { SimpleLoadersScreen } from 'screens/SimpleLoaders';
import { ProgressBarsScreen } from 'screens/ProgressBars';

import { GetStartedScreen } from 'screens';

const Drawer = createDrawerNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Loaders"
        
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: 'transparent',
            width: '100%',
            // width: '50%',
          },
          drawerType: 'front',
          // drawerType: 'permanent',
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
        <Drawer.Screen name="ProgressBars" component={ProgressBarsScreen} />
        <Drawer.Screen name="Loaders" component={SimpleLoadersScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
};

import * as React from 'react';
import { AntDesign } from '@expo/vector-icons';
import type { DrawerScreenProps } from '@react-navigation/drawer';

import { DrawerStackParamList } from './types';

export function OpenDrawerButton({ navigation }: DrawerScreenProps<DrawerStackParamList, keyof DrawerStackParamList>) {
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

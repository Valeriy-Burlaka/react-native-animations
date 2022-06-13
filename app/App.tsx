import { registerRootComponent } from 'expo';

import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import Navigation from 'components/Navigation';

function App() {
  return <Navigation />;
}

export default registerRootComponent(App);

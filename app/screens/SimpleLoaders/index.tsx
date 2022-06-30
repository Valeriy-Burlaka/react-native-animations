import React, { useEffect } from 'react';
import styled from '@emotion/native';
import { useSharedValue } from 'react-native-reanimated';
import type { DrawerScreenProps } from '@react-navigation/drawer';

import { palette } from 'styles';
import { DrawerStackParamList } from 'components/Navigation/types';
import { OpenDrawerButton } from 'components/Navigation/OpenDrawerButton';

import { SimpleRotatingLoader } from './components/SimpleRotatingLoader';
import { SpringLoader, MBankLoader } from './components/SpringLoader';

const Container = styled.View`
  background-color: ${palette.white};
  flex: 1;
  justify-content: space-evenly;
`;

const VerticalBox = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
`

export function SimpleLoadersScreen ({ navigation, route }: DrawerScreenProps<DrawerStackParamList, 'Loaders'>) {
  const progress = useSharedValue(0);

  useEffect(() => {
    const progressUpdateInterval = setInterval(() => {
      progress.value = (progress.value + Math.random() * 5) % 101;
    }, 300);

    return () => clearInterval(progressUpdateInterval);

  }, []);

  return (
    <Container>
      <OpenDrawerButton navigation={navigation} route={route} />

      <VerticalBox>
        <SimpleRotatingLoader />

        <SimpleRotatingLoader
          color={palette.ultraViolet}
          trackColor={palette.grey50}
          size={80}
          thickness={8}
          speed={2}
        />

        <SimpleRotatingLoader
          color={palette.livingCoral}
          trackColor={palette.livingCoral}
          size={40}
          thickness={4}
          speed={3}
        />
      </VerticalBox>

      <VerticalBox>
        <SpringLoader />

        <SpringLoader
          size={100}
          thickness={8}
          colorSequence={[
            palette.livingCoral,
            palette.ultraViolet,
            palette.greenery
          ]}
        />

        <MBankLoader
          size={80}
          thickness={6}
        />
      </VerticalBox>

    </Container>
  );
}

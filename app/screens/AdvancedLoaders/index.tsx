import React, { useState } from 'react';
import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import styled from '@emotion/native';
import Animated, { FadeIn } from 'react-native-reanimated';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';

import { palette } from 'styles';
import { DrawerStackParamList } from 'components/Navigation/types';
import { OpenDrawerButton } from 'components/Navigation/OpenDrawerButton';

import { SamsungCircleLoader } from './components/SamsungCircleLoader';

const { height: screenHeight } = Dimensions.get('window');

const CardContainer = styled.TouchableOpacity`
  flex-grow: 1;
`;

const Card = styled.View<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

const CardText = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 38px;
  font-weight: 900;
  text-transform: uppercase;
`;

const VerticalBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 20px;
  width: 80%;
`;

const CARD_PROPERTIES: Array<{
  bg: string;
  bgImmutable?: boolean;
  color: string;
  category: string;
  demoComponent: () => React.ReactNode;
}> = [
  {
    bg: palette.limpetShell,
    color: '#3F5B98',
    category: 'Samsung',
    demoComponent: () => {
      return (
        <VerticalBox>
          <SamsungCircleLoader />
        </VerticalBox>
      );
    },
  },
  {
    bg: '#086E4B',
    color: '#FCBE4A',
    category: 'LuxMed',
    demoComponent: () => {
      return (
        <VerticalBox />
      );
    },
  },
  {
    bg: '#FECBCA',
    color: '#FD5963',
    category: 'Amplitude',
    demoComponent: () => {
      return (
        <VerticalBox>
        </VerticalBox>
      );
    },
  },
  {
    bg: '#193B8C',
    bgImmutable: true,
    color: palette.roseQuartz,
    category: 'Membrane',
    demoComponent: () => {
      return (
        <VerticalBox />
      );
    },
  },
  {
    bg: palette.inkwell,
    bgImmutable: true,
    color: '#F5F5EB',
    category: 'MBank',
    demoComponent: () => {
      return (
        <VerticalBox />
      );
    },
  },
];

function TopHalfScreenBackground ({ backgroundColor }: { backgroundColor: string }) {
  return (
    <View
      style={[
        StyleSheet.absoluteFillObject,
        {
          bottom: screenHeight * 0.6,
          backgroundColor,
        }
      ]}
    />
  );
}

export function AdvancedLoadersScreen ({ navigation, route }: DrawerScreenProps<DrawerStackParamList, 'Loaders'>) {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const isFirstCardSelected = selectedCardIndex === 0;

  const activeDemoBackgroundColor = palette.white;

  return (
    <SafeAreaView
      edges={['top']}
      style={{
        flex: 1,
      }}
    >
      {/* Should be the same as the background of the first Card. */}
      <TopHalfScreenBackground
        backgroundColor={isFirstCardSelected ? activeDemoBackgroundColor : CARD_PROPERTIES[0].bg}
      />
        {/*
          StatusBar `backgroundColor` property is Android-only.
          See https://reactnative.dev/docs/statusbar.html#backgroundcolor-android
        */}
        <StatusBar backgroundColor={palette.limpetShell} barStyle="dark-content" />

        {CARD_PROPERTIES.map(({ bg, bgImmutable, color, category, demoComponent }, index) => {
          return (
            <CardContainer
              activeOpacity={0.9}
              key={category}
              onPress={() => {
                setSelectedCardIndex(index === selectedCardIndex ? null : index);
              }}
            >
              <Card backgroundColor={index === selectedCardIndex && !bgImmutable ? activeDemoBackgroundColor : bg}>
                <CardText color={color}>{category}</CardText>
                {index === selectedCardIndex && (
                  <Animated.View entering={FadeIn.delay(100).springify()}>
                    {demoComponent()}
                  </Animated.View>
                )}
              </Card>
            </CardContainer>
          );
        })}

      <OpenDrawerButton navigation={navigation} route={route} />
    </SafeAreaView>
  );
}

import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import styled from '@emotion/native';
import Animated, { FadeIn } from 'react-native-reanimated';
import type { DrawerScreenProps } from '@react-navigation/drawer';

import { palette } from 'styles';
import { DrawerStackParamList } from 'components/Navigation/types';
import { OpenDrawerButton } from 'components/Navigation/OpenDrawerButton';

import { SimpleRotatingLoader } from './components/SimpleRotatingLoader';
import { SpringLoader, MBankLoader } from './components/SpringLoader';
import { RippleLoader } from './components/RippleLoader';
import { BreathingLoader } from './components/BreathingLoader';

const Container = styled.View`
  flex: 1;
`;

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
    bg: '#A8DDE9',
    color: '#3F5B98',
    category: 'Simple Rotation',
    demoComponent: () => {
      return (
        <VerticalBox>
          <SimpleRotatingLoader
            size={80}
            thickness={8}
          />

          <SimpleRotatingLoader
            color={palette.ultraViolet}
            trackColor={palette.grey50}
            size={60}
            thickness={6}
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
      );
    },
  },
  {
    bg: '#086E4B',
    color: '#FCBE4A',
    category: 'Spring Rotation',
    demoComponent: () => {
      return (
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
        </VerticalBox>
      );
    },
  },
  {
    bg: '#FECBCA',
    color: '#FD5963',
    category: 'Colorful Spring',
    demoComponent: () => {
      return (
        <VerticalBox>
          <MBankLoader
            size={80}
            thickness={6}
          />
        </VerticalBox>
      );
    },
  },
  {
    bg: '#193B8C',
    bgImmutable: true,
    color: palette.roseQuartz,
    category: 'Ripple',
    demoComponent: () => {
      return (
        <VerticalBox>
          <RippleLoader color={palette.roseQuartz} />
          <BreathingLoader />
        </VerticalBox>
      );
    },
  },
  {
    bg: '#FDBD50',
    color: '#F5F5EB',
    category: '? Samsung ?',
    demoComponent: () => <></>,
  },
]

export function SimpleLoadersScreen ({ navigation, route }: DrawerScreenProps<DrawerStackParamList, 'Loaders'>) {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

  console.log('Selected index:', selectedCardIndex);



  return (
    <Container>
      <StatusBar hidden />

      {CARD_PROPERTIES.map(({ bg, bgImmutable, color, category, demoComponent }, index) => {
        return (
          <CardContainer
            activeOpacity={0.8}
            key={category}
            onPress={() => {
              setSelectedCardIndex(index === selectedCardIndex ? null : index);
            }}
          >
            <Card backgroundColor={index === selectedCardIndex && !bgImmutable ? palette.white : bg}>
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
    </Container>
  );
}

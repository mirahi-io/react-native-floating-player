import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {HomeScreen} from './screens/HomeScreen';
import {PlayerModal} from './screens/PlayerModal';
import React from 'react';
import {Track} from 'react-native-track-player';
import {CustomBottomTabBar} from './components/CustomBottomTabBar';

export enum Routes {
  ROOT = 'root',
  PLAYER = 'player',
  HOME = 'home',
}

export type RootStackParamList = {
  [Routes.ROOT]: undefined;
  [Routes.PLAYER]: {index: number; position?: number; queue: Track[]};
  [Routes.HOME]: undefined;
};

export type RootStackScreenProps<T extends Routes> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

const RootStack = createNativeStackNavigator<RootStackParamList>();
const TabStack = createBottomTabNavigator<RootStackParamList>();

const TabNavigator = () => {
  return (
    <TabStack.Navigator tabBar={CustomBottomTabBar}>
      <TabStack.Screen
        component={HomeScreen}
        name={Routes.HOME}
        options={{
          headerTitle: 'Home',
          title: 'Home',
        }}
      />
    </TabStack.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={Routes.ROOT}
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name={Routes.PLAYER}
        component={PlayerModal}
        options={{presentation: 'modal'}}
      />
    </RootStack.Navigator>
  );
};

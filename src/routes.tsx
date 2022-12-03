import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {HomeScreen} from './screens/HomeScreen';
import {PlayerModal} from './screens/PlayerModal';
import {CustomBottomTabBar} from './components/CustomBottomTabBar';
import React from 'react';
import {LibraryScreen} from './screens/LibraryScreen';
import {Track} from 'react-native-track-player';

export enum Routes {
  ROOT = 'root',
  PLAYER = 'player',
  HOME = 'home',
  LIBRARY = 'library',
}

export type RootStackParamList = {
  [Routes.ROOT]: undefined;
  [Routes.PLAYER]: {index: number; position?: number; queue: Track[]};
  [Routes.HOME]: undefined;
  [Routes.LIBRARY]: undefined;
};

export type RootStackScreenProps<T extends Routes> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

const RootStack = createNativeStackNavigator<RootStackParamList>();
const TabStack = createBottomTabNavigator<RootStackParamList>();

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

export const TabNavigator = () => {
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
      <TabStack.Screen
        component={LibraryScreen}
        name={Routes.LIBRARY}
        options={{
          headerTitle: 'Library',
          title: 'Library',
        }}
      />
    </TabStack.Navigator>
  );
};

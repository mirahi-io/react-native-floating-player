import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from './src/routes';
import {useInitPlayer} from './src/player.utils';

const App = () => {
  useInitPlayer();

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;

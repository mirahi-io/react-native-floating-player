import React, {FC} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {RootStackScreenProps, Routes} from '../routes';

export const HomeScreen: FC<RootStackScreenProps<Routes.HOME>> = ({
  navigation: {navigate},
}) => {
  const openPlayer = () => navigate(Routes.PLAYER, {index: 0});

  return (
    <View style={styles.centered_horizontal}>
      <Button title="Open player" onPress={openPlayer} />
    </View>
  );
};

const styles = StyleSheet.create({
  centered_horizontal: {
    flex: 1,
    justifyContent: 'center',
  },
});

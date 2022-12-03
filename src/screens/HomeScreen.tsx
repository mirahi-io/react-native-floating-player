import React, {FC} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {RootStackScreenProps, Routes} from '../routes';
import {songs} from '../songs';

export const HomeScreen: FC<RootStackScreenProps<Routes.HOME>> = ({
  navigation: {navigate},
}) => {
  const openPlayer = () => navigate(Routes.PLAYER, {index: 0, queue: songs});

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

import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RootStackParamList, Routes} from '../routes';
import {songs} from '../songs';
import {useProgress} from 'react-native-track-player';
import {usePlayerControls} from '../player.utils';

export const FloatingPlayer = () => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const {currentTrackIndex, currentTrack} = usePlayerControls();
  const {position} = useProgress();

  if (!currentTrack) {
    return null;
  }

  const {artist, title} = currentTrack;

  const playerPressHandler = () =>
    navigate(Routes.PLAYER, {
      index:
        currentTrackIndex && currentTrackIndex >= 0 ? currentTrackIndex : 0,
      position: position,
      queue: songs,
    });

  return (
    <Pressable onPress={playerPressHandler}>
      <View style={styles.row}>
        <Text>{artist}</Text>
        <Text>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {display: 'flex', flexDirection: 'row'},
});

import React, {FC, useEffect} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {Controls} from '../components/Controls';
import {usePlayerControls} from '../player.utils';
import TrackPlayer from 'react-native-track-player';
import {RootStackScreenProps, Routes} from '../routes';
import {songs} from '../songs';

export const PlayerModal: FC<RootStackScreenProps<Routes.PLAYER>> = ({
  route: {
    params: {position = 0, index},
  },
}) => {
  const {controls, currentTrack} = usePlayerControls();

  useEffect(() => {
    const handleQueue = async () => {
      await TrackPlayer.add(songs);
      if (index >= 0) {
        await TrackPlayer.skip(index);
      }
      if (position && position > 0) {
        await TrackPlayer.seekTo(position);
      }
    };

    handleQueue();
  }, [index, position]);

  if (!currentTrack) {
    return <ActivityIndicator style={styles.centered_horizontal} />;
  }

  return (
    <View style={styles.centered_horizontal}>
      <Text>
        {currentTrack.title} - {currentTrack.artist}
      </Text>
      {currentTrack.artwork && typeof currentTrack.artwork === 'string' && (
        <Image
          resizeMode="cover"
          style={styles.image_dimensions}
          source={{uri: currentTrack.artwork}}
        />
      )}
      <Controls {...controls} />
    </View>
  );
};

const styles = StyleSheet.create({
  centered_horizontal: {
    flex: 1,
    justifyContent: 'center',
  },
  image_dimensions: {
    width: 400,
    height: 500,
  },
});

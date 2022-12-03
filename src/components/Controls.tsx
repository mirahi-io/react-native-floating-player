import {Button, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {ControlsCapability} from '../player.utils';
import Slider from '@react-native-community/slider';

export type ControlsProps = {
  position: number;
  isPlaying: boolean;
  duration: number;
  capabilities: Record<
    ControlsCapability,
    {
      disabled: boolean;
      onPress: () => void;
    }
  >;
};

export const Controls: FC<ControlsProps> = ({
  capabilities,
  duration,
  position,
  isPlaying,
}) => {
  return (
    <View>
      <Slider maximumValue={duration} minimumValue={0} value={position} />
      <View style={styles.row_spaced_evenly}>
        <Button
          disabled={capabilities[ControlsCapability.SKIP_TO_PREVIOUS].disabled}
          title="prev"
          onPress={capabilities[ControlsCapability.SKIP_TO_PREVIOUS].onPress}
        />
        <Button
          disabled={capabilities[ControlsCapability.PLAY_PAUSE].disabled}
          title={isPlaying ? 'play' : 'pause'}
          onPress={capabilities[ControlsCapability.PLAY_PAUSE].onPress}
        />
        <Button
          disabled={capabilities[ControlsCapability.SKIP_TO_NEXT].disabled}
          title="next"
          onPress={capabilities[ControlsCapability.SKIP_TO_NEXT].onPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row_spaced_evenly: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
});

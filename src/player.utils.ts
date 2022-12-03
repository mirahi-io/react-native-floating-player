import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import TrackPlayer, {
  Event,
  State,
  Track,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {ControlsProps} from './components/Controls';

export enum ControlsCapability {
  PLAY_PAUSE = 'play-pause',
  SKIP_TO_NEXT = 'skip-to-next',
  SKIP_TO_PREVIOUS = 'skip-to-previous',
}

export const useInitPlayer = () => {
  useEffect(() => {
    TrackPlayer.setupPlayer();

    return () => {
      TrackPlayer.reset();
    };
  }, []);
};

export type UsePlayerControlsResponse = {
  queue: Track[];
  setQueue: Dispatch<SetStateAction<Track[]>>;
  currentTrack?: Track;
  currentTrackIndex?: number;
  setCurrentTrack: Dispatch<SetStateAction<Track | undefined>>;
  controlsProps: ControlsProps;
};

export const usePlayerControls = (): UsePlayerControlsResponse => {
  const [playerState, setPlayerState] = useState<State>();
  const [currentTrack, setCurrentTrack] = useState<Track>();
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>();
  const [queue, setQueue] = useState<Track[]>([]);

  useTrackPlayerEvents(
    [
      Event.PlaybackTrackChanged,
      Event.RemotePlay,
      Event.RemotePause,
      Event.PlaybackState,
    ],
    async event => {
      if (
        event.type === Event.PlaybackTrackChanged &&
        event.nextTrack != null
      ) {
        const track = await TrackPlayer.getTrack(event.nextTrack);

        if (track) {
          if (track.url !== currentTrack?.url) {
            setCurrentTrack(track);
          }
          if (currentTrackIndex !== event.nextTrack) {
            setCurrentTrackIndex(event.nextTrack);
          }
        }
      }
      if (event.type === Event.PlaybackState) {
        setPlayerState(event.state);
      }
    },
  );

  const {position, duration} = useProgress();

  const skipToNextTrack = () => TrackPlayer.skipToNext();
  const skipToPreviousTrack = () => TrackPlayer.skipToPrevious();
  const startTrack = async () => {
    const state = await TrackPlayer.getState();
    if (state !== State.Playing) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  };

  return {
    controlsProps: {
      capabilities: {
        [ControlsCapability.PLAY_PAUSE]: {
          disabled: !currentTrack,
          onPress: startTrack,
        },
        [ControlsCapability.SKIP_TO_NEXT]: {
          disabled: !currentTrack,
          onPress: skipToNextTrack,
        },
        [ControlsCapability.SKIP_TO_PREVIOUS]: {
          disabled: !currentTrack,
          onPress: skipToPreviousTrack,
        },
      },
      duration: duration || 25,
      isPlaying:
        playerState !== State.Playing && playerState !== State.Buffering,
      position,
    },
    currentTrack,
    currentTrackIndex,
    queue,
    setCurrentTrack,
    setQueue,
  };
};

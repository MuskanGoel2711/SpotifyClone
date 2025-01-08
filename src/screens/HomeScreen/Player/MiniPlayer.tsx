import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrackPlayer, { State, Event } from 'react-native-track-player';

type MiniPlayerProps = {
  navigation?: any;
};

type Track = {
  id?: string;
  title?: string;
  image?: string;
};

const MiniPlayer: React.FC<MiniPlayerProps> = ({ navigation }) => {
  const [track, setTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const fetchPlayerState = async () => {
    const trackId = await TrackPlayer.getCurrentTrack();
    if (trackId) {
      const trackDetails = await TrackPlayer.getTrack(trackId);
      if (trackDetails) {
        setTrack(trackDetails);
      } else {
        setTrack(null);
      }
    }

    const state = await TrackPlayer.getState();
    setIsPlaying(state === State.Playing);
  };

  useEffect(() => {
    fetchPlayerState();

    const trackChangeListener = TrackPlayer.addEventListener(
      Event.PlaybackTrackChanged,
      fetchPlayerState
    );

    const playbackStateListener = TrackPlayer.addEventListener(
      Event.PlaybackState,
      async () => {
        const state = await TrackPlayer.getState();
        setIsPlaying(state === State.Playing);
      }
    );

    return () => {
      trackChangeListener.remove();
      playbackStateListener.remove();
    };
  }, []);

  const togglePlayback = async () => {
    const playerState = await TrackPlayer.getState();

    if (playerState === State.Playing) {
      await TrackPlayer.pause();
    } else if (playerState === State.Paused) {
      await TrackPlayer.play();
    }
  };

  if (!track) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[styles.container, { opacity: isPlaying ? 1 : 0.7 }]}
      onPress={() => navigation?.navigate('Player', { trackId: track.id })}
    >
      <Image source={{ uri: track.image }} style={styles.artwork} />
      <Text style={styles.title}>{track.title}</Text>
      <TouchableOpacity onPress={togglePlayback}>
        <Ionicons name={isPlaying ? 'pause' : 'play'} size={30} color="#FFD369" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MiniPlayer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#555',
  },
  artwork: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  title: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
});


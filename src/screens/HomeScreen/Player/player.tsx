import React, { useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, Animated, Dimensions, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import { images } from '../../../assets/index';
import TrackPlayer, { Event, Capability, RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents } from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './style';

const { width } = Dimensions.get('window');

interface Song {
  id: string;
  url?: string;
  title: string;
  artist: string;
  image: string;
}

interface PlayerProps {
  route: any;
  navigation: any;
}

const Player: React.FC<PlayerProps> = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { song, data, index } = route.params || {};
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(index || 0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'track' | 'repeat'>('off');
  const [trackArtist, setTrackArtist] = useState<string | undefined>();
  const [trackImage, setTrackImage] = useState<string | undefined>();
  const [trackTitle, setTrackTitle] = useState<string | undefined>();
  const [favorites, setFavorites] = useState<{ [key: string]: any }>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const flatListRef = useRef<FlatList>(null);
  const playbackState = usePlaybackState();
  const { position, duration } = useProgress();

  useEffect(() => {
    setupPlayer();
    scrollX.addListener(({ value }) => {
      const index = Math.round(value / width);
      skipTo(index);
      setCurrentSongIndex(index);
    });
    return () => {
      scrollX.removeAllListeners();
      TrackPlayer.reset();
    };
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      const storedFavorites = await loadFavorites();
      setFavorites(storedFavorites);
    };
    fetchFavorites();
  }, []);

  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add([...data]);
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
    });
    await TrackPlayer.skip(currentSongIndex);
  };

  const togglePlayback = async () => {
    const currentTrack = await TrackPlayer.getState();
    if (currentTrack !== null) {
      if (currentTrack === State.Playing) {
        await TrackPlayer.pause();
      } else if (currentTrack === State.Paused || currentTrack === State.Ready) {
        await TrackPlayer.play();
      }
    }
  };

  const repeatIcon = (): string => {
    if (repeatMode === 'off') return 'repeat-off';
    if (repeatMode === 'track') return 'repeat-once';
    return 'repeat';
  };

  const changeRepeatMode = () => {
    if (repeatMode === 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeatMode('track');
    } else if (repeatMode === 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setRepeatMode('repeat');
    } else {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      setRepeatMode('off');
    }
  };

  const skipTo = async (trackId: number) => {
    await TrackPlayer.skip(trackId);
  };

  useTrackPlayerEvents([Event.PlaybackState, Event.PlaybackTrackChanged], async (event) => {
    if (event.type === Event.PlaybackState) {
      const currentState = event.state;
      setIsPlaying(currentState === State.Playing);
    }
    if (event.type === Event.PlaybackTrackChanged) {
      if (event.nextTrack !== null) {
        const track = await TrackPlayer.getTrack(event.nextTrack);
        if (track) {
          const { title, image, artist } = track;
          setTrackArtist(artist);
          setTrackImage(image);
          setTrackTitle(title);
        }

      }
    }
  });
  // , index === currentSongIndex && styles.activeSong
  const renderSongs = ({ item, index }: { item: Song; index: number }) => {
    return (
      <Animated.View style={[styles.imageContainer]}>
        <View style={styles.imageWrapper}>
          <Image
            source={trackImage ? { uri: trackImage } : require('../../../assets/images/thriller.png')}
            style={styles.image}
            resizeMode="stretch"
            onError={(e) => console.error('Image Load Error:', e.nativeEvent.error)}
          />
        </View>
        <View>
          <Text style={styles.title}>{trackTitle}</Text>
          <Text style={styles.artistName}>{trackArtist}</Text>
        </View>
      </Animated.View>
    );
  };

  const goToNextSong = async () => {
    flatListRef.current?.scrollToOffset({
      offset: (currentSongIndex + 1) * width,
    });
  };

  const goToPreviousSong = async () => {
    flatListRef.current?.scrollToOffset({
      offset: (currentSongIndex - 1) * width,
    });
  };

  const getItemLayout = (data: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  });

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      return storedFavorites ? JSON.parse(storedFavorites) : {};
    } catch (error) {
      console.error('Error loading favorites:', error);
      return {};
    }
  };

  const saveFavorites = async (favorites: { [key: string]: Song }) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const toggleFavorite = (song: Song) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = { ...prevFavorites };
      if (updatedFavorites[song.id]) {
        delete updatedFavorites[song.id];
        setModalMessage('Removed from Favorites');
      } else {
        updatedFavorites[song.id] = song;
        setModalMessage('Added to Favorites');
      }
      saveFavorites(updatedFavorites);
      setShowModal(true);
      return updatedFavorites;
    });
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={images.left} style={styles.left} />
      </TouchableOpacity>
      <View style={styles.mainContainer}>
        <Animated.FlatList
          ref={flatListRef}
          data={[...data]}
          renderItem={renderSongs}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          horizontal
          pagingEnabled
          initialScrollIndex={currentSongIndex}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x: scrollX },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          getItemLayout={getItemLayout}
        />
        <View>
          <Slider
            style={styles.progressContainer}
            value={position}
            minimumValue={0}
            maximumValue={duration}
            thumbTintColor="#FFD369"
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#FFF"
            onSlidingComplete={async (value) => {
              await TrackPlayer.seekTo(value);
            }}
          />
        </View>

        <View style={styles.progressLabelContainer}>
          <Text style={styles.progressLabelText}>
            {new Date(position * 1000).toISOString().substr(14, 5)}
          </Text>
          <Text style={styles.progressLabelText}>
            {new Date((duration - position) * 1000).toISOString().substr(14, 5)}
          </Text>
        </View>
        <View style={styles.musicControls}>
          <TouchableOpacity onPress={goToPreviousSong}>
            <Ionicons name="play-skip-back-outline" size={35} color="#FFD369" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={togglePlayback}>
            <Ionicons
              name={isPlaying ? 'pause-circle-outline' : 'play-circle-outline'}
              size={60}
              color="#FFD369"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToNextSong}>
            <Ionicons name="play-skip-forward-outline" size={35} color="#FFD369" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomView}>
        <View style={styles.bottomIconsView}>
          <TouchableOpacity onPress={() =>
            toggleFavorite({
              id: data[currentSongIndex]?.id,
              title: trackTitle || '',
              artist: trackArtist || '',
              image: trackImage || '',
            })
          }>
            <Ionicons
              name={favorites[data[currentSongIndex]?.id] ? 'heart-outline' : 'heart-dislike-outline'}
              size={30}
              color={favorites[data[currentSongIndex]?.id] ? '#FFD369' : 'white'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={changeRepeatMode}>
            <MaterialCommunityIcons
              name={`${repeatIcon()}`}
              size={30}
              color={repeatMode !== 'off' ? '#FFD369' : 'white'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }}>
            <Ionicons name="share-outline" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }}>
            <Ionicons name="ellipsis-horizontal-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text style={styles.modalButton}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Player;
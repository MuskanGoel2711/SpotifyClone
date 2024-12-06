import React, { useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { vw, vh } from '../../utils/Dimensions';
import Slider from '@react-native-community/slider';
import songs from '../../assets/data';
import TrackPlayer, { Event, Capability, RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents, Track } from 'react-native-track-player';
import styles from './style';

const { width, height } = Dimensions.get('window');

interface Song {
  id: string;
  title: string;
  artist: string;
  image: any;
}

const MusicPlayer: React.FC = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const flatListRef = useRef<FlatList>(null);
    const playbackState = usePlaybackState();
    const { position, duration } = useProgress();
    const [repeatMode, setRepeatMode] = useState<'off' | 'track' | 'repeat'>('off');
    const [trackArtist, setTrackArtist] = useState<string | undefined>();
    const [trackImage, setTrackImage] = useState<any>();
    const [trackTitle, setTrackTitle] = useState<string | undefined>();

    const repeatIcon = (): string => {
        if(repeatMode === 'off') return 'repeat-off';
        if(repeatMode === 'track') return 'repeat-once';
        return 'repeat';
    };

    const changeRepeatMode = () => {
        if(repeatMode === 'off') {
            TrackPlayer.setRepeatMode(RepeatMode.Track);
            setRepeatMode('track');
        }
        if(repeatMode === 'track') {
            TrackPlayer.setRepeatMode(RepeatMode.Queue);
            setRepeatMode('repeat');
        }
        if(repeatMode === 'repeat') {
            TrackPlayer.setRepeatMode(RepeatMode.Off);
            setRepeatMode('off');
        }
    };

    const skipTo = async (trackId: number) => {
        await TrackPlayer.skip(trackId);
    };

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

    const setupPlayer = async () => {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.add(songs);
        await TrackPlayer.updateOptions({
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.Stop,
            ],
        });
    };

    const togglePlayback = async () => {
        const currentTrackState = await TrackPlayer.getState();
        if (currentTrackState === State.Playing) {
            await TrackPlayer.pause();
        } else if (currentTrackState === State.Paused || currentTrackState === State.Ready) {
            await TrackPlayer.play();
        }
    };

    useTrackPlayerEvents([Event.PlaybackState, Event.PlaybackTrackChanged], async (event) => {
        if (event.type === Event.PlaybackState) {
            setIsPlaying(event.state === State.Playing);
        }
        if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
            const track = await TrackPlayer.getTrack(event.nextTrack);
            const { title, image, artist } = track as Track;
            setTrackArtist(artist);
            setTrackImage(image);
            setTrackTitle(title);
        }
    });

    const renderSongs = ({ item }: { item: Song }) => {
        return (
            <Animated.View style={styles.imageContainer}>
                <View style={styles.imageWrapper}>
                    <Image source={trackImage} style={styles.image} />
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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainContainer}>
                <Animated.FlatList
                    ref={flatListRef}
                    data={songs}
                    renderItem={renderSongs}
                    keyExtractor={(item) => item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true }
                    )}
                />
                <View>
                    <Slider
                        style={styles.progressContainer}
                        value={position}
                        minimumValue={0}
                        maximumValue={duration}
                        thumbTintColor='#FFD369'
                        minimumTrackTintColor='#FFD369'
                        maximumTrackTintColor='#FFF'
                        onSlidingComplete={async (value) => {
                            await TrackPlayer.seekTo(value);
                        }}
                    />
                </View>
                <View style={styles.progressLabelContainer}>
                    <Text style={styles.progressLabelText}>{new Date(position * 1000).toISOString().substr(14, 5)}</Text>
                    <Text style={styles.progressLabelText}>{new Date((duration - position) * 1000).toISOString().substr(14, 5)}</Text>
                </View>
                <View style={styles.musicControls}>
                    <TouchableOpacity onPress={goToPreviousSong}>
                        <Ionicons name="play-skip-back-outline" size={35} color="#FFD369" style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={togglePlayback}>
                        <Ionicons
                            name={isPlaying ? "pause-circle-outline" : "play-circle-outline"}
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
                    <TouchableOpacity onPress={() => { }}>
                        <Ionicons name="heart-outline" size={30} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={changeRepeatMode}>
                        <MaterialCommunityIcons name={repeatIcon()} size={30} color={repeatMode !== 'off' ? "#FFD369" : "white"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }}>
                        <Ionicons name="share-outline" size={30} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }}>
                        <Ionicons name="ellipsis-horizontal-outline" size={30} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default MusicPlayer;

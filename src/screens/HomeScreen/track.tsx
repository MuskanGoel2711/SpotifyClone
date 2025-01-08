import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { vw, vh } from '../../utils/Dimensions';
import { images } from '../../assets/index';
import CustomImage from '../../components/CustomImage/customImage';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  image: string;
}

interface TrackScreenProps {
  route: any;
  navigation: any;
}

const Track: React.FC<TrackScreenProps> = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { artistName } = route.params;
  const [tracks, setTracks] = useState<Track[]>([]);
  const [originalTracks, setOriginalTracks] = useState<Track[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const shuffleArray = (array: Track[]) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const fetchData = () => {
    fetch(Platform.OS === 'android' ? 'http://10.0.2.2:3000/mockapi' : 'http://localhost:3000/mockapi')
      .then((response) => response.json())
      .then((response) => {
        const artistAlbums = response?.data?.albums?.filter((album: { artist: string }) => album.artist === artistName);
        const artistTracks = artistAlbums?.flatMap((album: { tracks: Track[] }) => album.tracks) || [];
        setTracks(artistTracks);
        setOriginalTracks(artistTracks);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  const handleShuffle = () => {
    const shuffledTracks = shuffleArray([...originalTracks]);
    setTracks(shuffledTracks);
  };

  const renderTracks = ({ item }: { item: Track }) => (
    <View style={styles.renderTrack}>
      <CustomImage onPress={() => navigation.navigate('Player', { song: item, data: tracks, index: tracks.findIndex((track) => track.id === item.id), })} source={{ uri: item.image }} style={styles.trackImage}/>
      <View>
        <Text style={styles.trackTitle}>{item.title}</Text>
        <Text style={styles.trackArtist}>{item.artist}</Text>
        <View style={styles.timerContainer}>
          <Image source={images.timer} style={styles.timerImage} />
          <Text style={styles.trackDuration}>{item.duration}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.leftContainer}>
          <Image source={images.left} style={styles.left} />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Tracks by {artistName}</Text>
        <TouchableOpacity onPress={handleShuffle} style={styles.leftContainer}>
          <Image source={images.shuffle} style={styles.left} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={tracks}
        renderItem={renderTracks}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Track;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
    marginRight: 60
  },
  leftContainer: {},
  left: {
    width: vw(30),
    height: vh(30),
    tintColor: 'white',
  },
  sectionTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    width: '100%',
  },
  renderTrack: {
    flexDirection: 'row',
    margin: 12,
  },
  trackImage: {
    width: vw(100),
    height: vh(100),
    borderRadius: 8,
    marginBottom: 5,
  },
  trackTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 12,
    color: 'white',
  },
  trackArtist: {
    fontSize: 14,
    fontWeight: 200,
    marginLeft: 12,
    marginTop: 12,
    color: 'gray',
  },
  trackDuration: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 12,
    color: 'white',
  },
  timerContainer: {
    flexDirection: 'row',
    marginLeft: 12,
    marginTop: 12,
  },
  timerImage: {
    width: vw(20),
    height: vh(20),
    tintColor: 'white',
  },
});

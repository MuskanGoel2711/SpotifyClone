import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { vw, vh } from '../../utils/Dimensions';
import { images } from '../../assets/index';

interface Album {
  id: number;
  title: string;
  artist: string;
  coverImage: string;
}

interface AlbumScreenProps {
  route: any;
  navigation: any;
}

const Album: React.FC<AlbumScreenProps> = ({ route, navigation }) => {
  const { artistName } = route.params;
  const insets = useSafeAreaInsets();
  const [albums, setAlbums] = useState<Album[]>([]);

  const fetchData = () => {
    fetch(Platform.OS === 'android' ? 'http://10.0.2.2:3000/mockapi' : 'http://localhost:3000/mockapi')
      .then((response) => response.json())
      .then((response) => {
        const allAlbums = response?.data?.albums || [];
        const filteredAlbums = allAlbums.filter((album: Album) => album.artist === artistName);
        setAlbums(filteredAlbums);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderAlbum = ({ item }: { item: Album }) => (
    <View style={styles.albumContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('track', { artistName: item.artist })}>
        <Image source={{ uri: item.coverImage }} style={styles.albumImage} resizeMode="stretch" />
      </TouchableOpacity>
      <Text style={styles.albumTitle}>{item.title}</Text>
      <Text style={styles.albumArtist}>{item.artist}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.left} style={styles.left} />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Albums by {artistName}</Text>
      </View>
      <FlatList
        data={albums}
        renderItem={renderAlbum}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

export default Album;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
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
  flatListContainer: {
    paddingHorizontal: 10,
  },
  albumContainer: {
    marginRight: 15,
    alignItems: 'center',
    width: vw(120),
  },
  albumImage: {
    width: vw(100),
    height: vh(100),
    borderRadius: 8,
    marginBottom: 5,
    backgroundColor: 'red',
  },
  albumTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  albumArtist: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
});

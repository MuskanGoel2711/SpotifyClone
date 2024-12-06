import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { vh, vw } from '../../utils/Dimensions';
import string from '../../utils/enum';

interface Artist {
  id: number;
  name: string;
  genres: string[];
  coverImage: string;
}

interface Album {
  id: number;
  title: string;
  artist: string;
  coverImage: string;
}

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [albums, setAlbums] = useState<any[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const insets = useSafeAreaInsets();

  const fetchData = () => {
    fetch(Platform.OS === 'android' ? 'http://10.0.2.2:3000/mockapi' : 'http://localhost:3000/mockapi')
      .then((response) => response.json())
      .then((response) => {
        setAlbums(response?.data?.albums || []);
        setArtists(response?.data?.artists || []);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderArtist = ({ item }: { item: Artist }) => (
    <View style={styles.artistContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('album', { artistName: item.name })}>
        <Image source={{ uri: item.coverImage }} style={styles.artistImage} resizeMode="stretch" />
      </TouchableOpacity>
      <Text style={styles.artistName}>{item.name}</Text>
      <Text style={styles.artistGenres}>{item.genres.join(', ')}</Text>
    </View>
  );

  const renderAlbum = ({ item }: { item: Album }) => (
    <View style={styles.albumContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('track', { artistName: item.artist })}>
        <Image source={{ uri: item.coverImage }} style={styles.albumImage} resizeMode="stretch" />
      </TouchableOpacity>
      <Text style={styles.albumTitle}>{item.title}</Text>
      <Text style={styles.albumArtist}>{item.artist}</Text>
    </View>
  );

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const handleAllButtonPress = () => {
    setIsAllSelected(!isAllSelected);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={openDrawer} style={styles.textContainer}>
          <Text style={styles.text}>M</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[
            styles.textContainer1,
            { backgroundColor: isAllSelected ? '#269134' : '#1b4721' },
          ]}
          onPress={handleAllButtonPress} >
          <Text style={styles.text}>All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>{string.artistHeader}</Text>
        <FlatList
          data={artists}
          renderItem={renderArtist}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
        />
        <Text style={styles.sectionTitle1}>Popular Artists</Text>
        <FlatList
          data={artists}
          renderItem={renderArtist}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
        />
        <Text style={styles.sectionTitle1}>Popular Albums</Text>
        <FlatList
        data={albums}
        renderItem={renderAlbum}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />
      </ScrollView>

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  headerContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    backgroundColor: '#eb6b34',
    borderRadius: 100,
    padding: 10,
    marginLeft: 12,
  },
  textContainer1: {
    backgroundColor: '#269134',
    borderRadius: 50,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginLeft: 12,
  },
  text: {
    color: 'black',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    // marginBottom: 20,
    marginLeft: 10,
    color: 'white',
  },
  sectionTitle1: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 35,
    // marginBottom: 20,
    marginLeft: 10,
    color: 'white',
  },
  flatListContainer: {
    marginLeft: 12,
    marginRight: 12,
    marginTop: 12,
    marginBottom: 9
  },
  artistImage: {
    width: vw(120),
    height: vh(120),
    borderRadius: 8,
    marginBottom: 10,
  },
  artistContainer: {
    marginRight: 15,
    width: vw(120),
    alignItems: 'center',
  },
  artistName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  artistGenres: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
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

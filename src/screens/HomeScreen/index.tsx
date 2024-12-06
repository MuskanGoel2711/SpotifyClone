import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { vh, vw } from '../../utils/Dimensions';
import string from '../../utils/enum';
import styles from './style';
import CustomButton from '../../components/CustomButton/customButton';

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
        <CustomButton
          title='M'
          onPress={openDrawer}
          style={styles.textContainer}
          textStyle={styles.text}
        />
        <CustomButton
          title="All"
          style={[
            styles.textContainer1,
            { backgroundColor: isAllSelected ? '#269134' : '#1b4721' },
          ]}
          onPress={handleAllButtonPress}
          textStyle={styles.text}
        />
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
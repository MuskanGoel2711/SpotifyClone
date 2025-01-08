import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { vh, vw } from '../../utils/Dimensions';
import string from '../../utils/enum';
import styles from './style';
import CustomButton from '../../components/CustomButton/customButton';
import CustomImage from '../../components/CustomImage/customImage';

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
      <CustomImage onPress={() => navigation.navigate('album', { artistName: item.name })} source={{ uri: item.coverImage }} />
      <Text style={styles.artistName}>{item.name}</Text>
      <Text style={styles.artistGenres}>{item.genres.join(', ')}</Text>
    </View>
  );

  const renderAlbum = ({ item }: { item: Album }) => (
    <View style={styles.albumContainer}>
      <CustomImage onPress={() => navigation.navigate('track', { artistName: item.artist })} source={{ uri: item.coverImage }} />
      <Text style={styles.albumTitle}>{item.title}</Text>
      <Text style={styles.albumArtist}>{item.artist}</Text>
    </View>
  );
  const renderAlbumCircle = ({ item }: { item: Album }) => (
    <View style={styles.albumContainer}>
      <CustomImage onPress={() => navigation.navigate('track', { artistName: item.artist })} source={{ uri: item.coverImage }} style={{borderRadius: 100}}/>
      <Text style={styles.albumTitle}>{item.title}</Text>
      <Text style={styles.albumArtist}>{item.artist}</Text>
    </View>
  );

  const renderAlbumDifferently = ({ item }: { item: Album }) => (
    <TouchableOpacity onPress={() => navigation.navigate('track', { artistName: item.artist })}>
      <View style={styles.albumContainerFirst}>

        <Image source={{ uri: item.coverImage }} style={styles.albumImageFirst} resizeMode='stretch' />

        <View>
          <Text style={styles.albumTitle}>{item.title}</Text>
          <Text style={[styles.albumArtist, { color: 'white' }]}>{item.artist}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderAlbumToday = ({ item }: { item: Album }) => (
    <View style={styles.albumContainer1}>
      <CustomImage onPress={() => navigation.navigate('track', { artistName: item.artist })} source={{ uri: item.coverImage }} style={styles.recommendedToday} />
      <Text style={styles.albumTitle}>{item.title}</Text>
      <Text style={styles.albumArtist}>{item.artist}</Text>
    </View>
  );

  const renderAlbumVertically = ({ item }: { item: Album }) => (
    <View style={styles.albumContainer2}>
      <TouchableOpacity onPress={() => navigation.navigate('track', { artistName: item.artist })}>
        <Image source={{ uri: item.coverImage }} style={styles.albumImage} resizeMode='stretch' />
      </TouchableOpacity>
      <View style={styles.textContainer2}>
        <Text style={[styles.albumTitle, { fontSize: 18, color: 'black' }]}>{item.title}</Text>
        <Text style={styles.albumArtist}>{item.artist}</Text>
      </View>
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
        <FlatList
          data={albums}
          renderItem={renderAlbumDifferently}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
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
        <Text style={styles.sectionTitle1}>Charts</Text>
        <FlatList
          data={albums}
          renderItem={renderAlbumCircle}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
        />
        <Text style={styles.sectionTitle1}>Recommended for Today</Text>
        <FlatList
          data={albums}
          renderItem={renderAlbumToday}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
        />
        <Text style={styles.sectionTitle1}>Trending Albums for You</Text>
        <FlatList
          data={albums}
          renderItem={renderAlbumVertically}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
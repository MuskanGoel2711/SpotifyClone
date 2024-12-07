import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { images } from '../../assets/index';
import { vw, vh } from '../../utils/Dimensions';
import { RootState } from '../../redux/store';
import string from '../../utils/enum';

interface Song {
    id: string;
    title: string;
    artist: string;
    image: string;
}

interface HomeScreenProps {
    navigation: any;
}
const Create: React.FC<HomeScreenProps> = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [favoriteSongs, setFavoriteSongs] = useState<Song[]>([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadFavoriteSongs);
        return unsubscribe;
    }, [navigation]);

    const renderFavorite = ({ item }: { item: Song }) => (
        <View style={styles.favoriteContainer}>
            <Image source={{ uri: item.image }} style={styles.favoriteImage} resizeMode='stretch' />
            <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.artist}>{item.artist}</Text>
            </View>
        </View>
    );

    const loadFavoriteSongs = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            console.log('Stored favorites:', storedFavorites);
            const favoritesObject = storedFavorites ? JSON.parse(storedFavorites) : {};
            const favoritesArray: Song[] = Object.values(favoritesObject);
            console.log('Parsed favoriteSongsList as array:', favoritesArray);
    
            setFavoriteSongs(favoritesArray);
        } catch (error) {
            console.error('Error loading favorite songs:', error);
        }
    };

    const openDrawer = () => {
        navigation.openDrawer('Drawer')
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={openDrawer} style={styles.textContainer}>
                    <Text style={styles.text}>M</Text>
                </TouchableOpacity>
                <Text style={styles.textLib}>{string.libraryText}</Text>
                <TouchableOpacity>
                    <Image source={images.add} style={styles.image} />
                </TouchableOpacity>
            </View>
            <Text style={styles.header}>Favorite Songs</Text>
            <FlatList
                data={favoriteSongs}
                renderItem={renderFavorite}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                ListEmptyComponent={<Text style={styles.emptyText}>No favorite songs yet!</Text>}
            />
        </View>
    );
};

export default Create;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textLib: {
        color: 'white',
        fontSize: 23,
        paddingRight: 130,
        fontWeight: 'bold',
    },
    image: {
        width: vw(28),
        height: vh(28),
        tintColor: 'white',
    },
    textContainer: {
        backgroundColor: '#eb6b34',
        borderRadius: 100,
        padding: 10,
        marginLeft: 12,
    },
    text: {
        color: 'black',
    },
    favoriteContainer: {
        flexDirection: 'row',
        padding: 16,
        // backgroundColor: '#333',
        borderRadius: 8,
        marginBottom: 12,
    },
    favoriteImage: {
        width: vw(50),
        height: vh(50),
        borderRadius: 8,
        marginRight: 15,
    },
    title: {
        fontSize: 18,
        color: 'white',
    },
    artist: {
        paddingTop: 5,
        fontSize: 14,
        color: '#aaa',
    },
    emptyText: {
        color: '#aaa',
        textAlign: 'center',
        marginTop: 16,
    },
});

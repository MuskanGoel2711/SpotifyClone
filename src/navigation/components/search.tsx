import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { vh, vw } from '../../utils/Dimensions';
import { images } from '../../assets/index';
import CustomInput from '../../components/CustomInput/input';
import string from '../../utils/enum';

interface Artist {
    id: number;
    name: string;
    coverImage: string;
    genres: string[];
}

interface HomeScreenProps {
    navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [filteredArtists, setFilteredArtists] = useState<Artist[]>([]);
    const [artist, setArtist] = useState<string>('');
    const [artists, setArtists] = useState<Artist[]>([]);
    const insets = useSafeAreaInsets();

    const fetchData = () => {
        fetch('http://localhost:3000/mockapi')
            .then((response) => response.json())
            .then((response) => {
                setFilteredArtists(response?.data?.artists || []);
                setArtists(response?.data?.artists || []);
            })
            .catch((error) => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (text: string) => {
        setArtist(text);
        if (text) {
            const filtered = artists.filter((item) =>
                item.name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredArtists(filtered);
        } else {
            setFilteredArtists(artists);
        }
    };

    const renderArtist = ({ item }: { item: Artist }) => (
        <View style={styles.artistContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('album', { artistName: item.name })}>
                <Image source={{ uri: item.coverImage }} style={styles.artistImage} resizeMode="stretch" />
            </TouchableOpacity>
            <Text style={styles.artistName}>{item.name}</Text>
            <Text style={styles.artistGenres}>{item.genres.join(', ')}</Text>
        </View>
    );

    const openDrawer = () => {
        navigation.openDrawer('Drawer');
    };

    const handleFocusSearch = () => {
        navigation.navigate('SearchHome');
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={openDrawer} style={styles.textContainer}>
                    <Text style={styles.text}>M</Text>
                </TouchableOpacity>
                <Text style={styles.searchText}>{string.searchHeader}</Text>
            </View>
            <View>
                <Image source={images.search} style={styles.imageInput} resizeMode='contain' />
                <CustomInput
                    placeholder={string.searchText}
                    value={artist}
                    onChangeText={handleSearch}
                    onFocus={handleFocusSearch}
                    style={styles.input}
                    placeholderTextColor="black"
                />
            </View>
            <Text style={styles.sectionTitle}>{string.artistHeader}</Text>
            <FlatList
                data={filteredArtists}
                renderItem={renderArtist}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer}
                ListEmptyComponent={() => <Text style={styles.emptyText}>Empty List</Text>}
            />
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
        paddingBottom: 12,
        paddingHorizontal: 12,
    },
    searchText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        paddingLeft: 15,
    },
    textContainer: {
        backgroundColor: '#eb6b34',
        borderRadius: 100,
        padding: 10,
    },
    text: {
        color: 'black',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        marginLeft: 10,
        color: 'white',
    },
    imageInput: {
        width: vw(22),
        height: vh(22),
        position: 'absolute',
        zIndex: 1,
        top: 23,
        left: 12,
    },
    input: {
        height: vh(50),
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        marginBottom: 10,
        backgroundColor: 'white',
        marginTop: 10,
        color: 'black',
        position: 'relative',
        paddingLeft: 40,
    },
    flatListContainer: {
        paddingTop: 15,
    },
    artistImage: {
        width: vw(120),
        height: vh(120),
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: 'red',
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
    emptyText: {
        color: 'white',
        justifyContent: 'center',
        padding: 12,
        fontSize: 20,
    },
});

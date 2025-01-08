import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, TextInput, ScrollView, Dimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { vh, vw } from '../../utils/Dimensions';
import { images } from '../../assets/index';
import CustomInput from '../../components/CustomInput/input';
import string from '../../utils/enum';

const renderData = [
    { id: 1, name: '2024 in Music', backgroundColor: 'green' },
    { id: 2, name: '2024 in Podcasts', backgroundColor: 'pink' },
    { id: 3, name: 'Made For You', backgroundColor: 'blue' },
    { id: 4, name: 'New Releases',backgroundColor: 'green' },
    { id: 5, name: 'Hindi',backgroundColor: 'pink' },
    { id: 6, name: 'Punjabi',backgroundColor: 'blue' },
    { id: 7, name: 'Tamil',backgroundColor: 'orange' },
    { id: 8, name: 'Telugu',backgroundColor: 'gray' },
    { id: 9, name: 'Podcasts Charts', backgroundColor: 'purple' },
    { id: 10, name: 'Video Podcasts', backgroundColor: 'orange' },
    { id: 11, name: 'Punk', backgroundColor: 'blue' },
    { id: 12, name: 'Blues', backgroundColor: 'pink' }
]

const data2 = [
    { id: 1, name: 'Music', backgroundColor: 'pink' },
    { id: 2, name: 'Podcasts', backgroundColor: 'green' },
    { id: 3, name: 'Live Events',backgroundColor: 'purple' },
    { id: 4, name: 'Home of I-Pop',backgroundColor: 'blue' }
]

interface Artist {
    id: number;
    name: string;
    coverImage: string;
    genres: string[];
}

interface HomeScreenProps {
    navigation: any;
}

const SearchScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [filteredArtists, setFilteredArtists] = useState<Artist[]>([]);
    const [artist, setArtist] = useState<string>('');
    const [artists, setArtists] = useState<Artist[]>([]);
    const insets = useSafeAreaInsets();

    const fetchData = () => {
        fetch(Platform.OS === 'android' ? 'http://10.0.2.2:3000/mockapi' : 'http://localhost:3000/mockapi')
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
            <TouchableOpacity onPress={() => {
                navigation.navigate('album', { artistName: item.name });
            }}>
                <Image source={{ uri: item.coverImage }} style={styles.artistImage} resizeMode="stretch" />
            </TouchableOpacity>
            <Text style={styles.artistName}>{item.name}</Text>
            <Text style={styles.artistGenres}>{item.genres.join(', ')}</Text>
        </View>
    );

    const renderItem = ({ item }: { item: { id: string; name: string, backgroundColor: any } }) => (
        <View style={[styles.box,{backgroundColor: item.backgroundColor}]}>
            <Text style={styles.text1}>{item.name}</Text>
        </View>
    );
    const renderItem1 = ({ item }: { item: { id: string; name: string, backgroundColor: any } }) => (
        <View style={[styles.box, { height: Dimensions.get('window').width / 2 - 120,backgroundColor: item.backgroundColor}]}>
            <Text style={styles.text1}>{item.name}</Text>
        </View>
    );

    const openDrawer = () => {
        navigation.openDrawer('Drawer');
    };

    const handleFocusSearch = () => {
        navigation.navigate('SearchHome')
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
            <ScrollView>
                <Text style={styles.sectionTitle}>Start Browsing</Text>
                <FlatList
                    data={data2}
                    renderItem={renderItem1}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                />
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
                <Text style={styles.sectionTitle}>Browse all</Text>
                <FlatList
                    data={renderData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                />
            </ScrollView>
        </View>
    );
};

export default SearchScreen;

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
    text1: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        marginLeft: 10,
        color: 'white',
    },
    imageInput: {
        width: vw(20),
        height: vh(20),
        position: 'absolute',
        zIndex: 1,
        top: 24,
        left: 12,
        alignSelf: 'auto'
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
        marginLeft: 10
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
    box: {
        flex: 1,
        margin: 10,
        backgroundColor: '#f0a500',
        height: Dimensions.get('window').width / 2 - 100,
        // justifyContent: 'center',
        // alignItems: 'center',
        borderRadius: 10,
        padding: 12
    },
    imageViewContainer: { flexDirection: 'row', borderRadius: 5, borderWidth: 1, margin: 10, backgroundColor: '#5e5e5e', width: 300 },
    imageContainer: { justifyContent: 'center', alignItems: 'center', padding: 10, },
    icon: {
        width: vw(15),
        height: vh(15),
        alignSelf: 'auto',
        tintColor: 'white',
    },
    input1: { justifyContent: 'center', width: "80%", backgroundColor: '#5e5e5e', },
});

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { images } from '../../assets/index';
import { vw, vh } from '../../utils/Dimensions';
import { RootState } from '../../redux/store'; 
import string from '../../utils/enum';

interface HomeScreenProps {
    navigation: any;
  }
const Create: React.FC<HomeScreenProps> = ({navigation}) => {
    const insets = useSafeAreaInsets();
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
});

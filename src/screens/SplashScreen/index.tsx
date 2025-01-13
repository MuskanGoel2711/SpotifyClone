import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import { images } from '../../assets/index';

type RootStackParamList = {
    FirstScreen: undefined;
    HomeScreen: undefined;
    TutorialScreen: undefined;
    TutorialScreen1: undefined;
};

type SplashScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'FirstScreen'>;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
    const isLoggedIn = useSelector((state: RootState) => state.AuthSlice.isLoggedIn);
    useEffect(() => {
        const checkLoginStatus = async () => {
            // const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

            setTimeout(() => {
                if (isLoggedIn) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'HomeScreen' }],
                    });
                } else {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'TutorialScreen' }],
                    });
                }
            }, 2000);
        };

        checkLoginStatus();
    }, [navigation, isLoggedIn]);

    return (
        <View style={styles.MainContainer}>
            <View style={styles.RootView}>
                <View style={styles.ChildView}>
                    {/* <Image source={images.spotify} style={styles.gif} /> */}
                    <Image source={images.splash} style={styles.gif} />
                </View>
            </View>
        </View>
    );
};

export default SplashScreen;
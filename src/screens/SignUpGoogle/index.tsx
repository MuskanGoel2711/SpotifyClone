import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { images } from '../../assets/index';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './style';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import string from '../../utils/enum';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/config/AuthSlice';

interface SignInGoogleProps {
    navigation: any;
}

const SignInGoogle: React.FC<SignInGoogleProps> = ({ navigation }) => {
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '1069575896038-sq24pipv6bunt9evq13tilr6m0egd3f9.apps.googleusercontent.com',
            offlineAccess: false
            // scopes: ['profile', 'email']
        });
    }, []);

    const handleSignup = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const response = await GoogleSignin.signIn();
            console.log("12345678-->", response);
            const idToken = response?.data?.idToken;

            if (!idToken) {
                throw new Error('No idToken received from Google');
            }
            const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredentials);
            // await AsyncStorage.setItem('isLoggedIn', 'true');
            dispatch(login())
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }],
            });
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User cancelled the login flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Sign in operation is in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Google Play Services not available');
            } else {
                console.error('Error during Google Sign-In:', error);
            }
        }
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.viewContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.leftContainer}>
                    <Image source={images.left} style={styles.left} />
                </TouchableOpacity>
                <Text style={styles.text}>{string.signIn}</Text>
            </View>
            <View style={{ flex: 0.7, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={images.google} style={styles.googleImage} />
                <TouchableOpacity style={styles.buttonContainer} onPress={handleSignup}>
                    <Image source={images.google} style={styles.googleLogo} />
                    <Text style={styles.buttonText}>{string.signInGoogle}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignInGoogle;
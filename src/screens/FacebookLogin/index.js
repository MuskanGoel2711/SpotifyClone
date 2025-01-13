import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import string from '../../utils/enum';
import { useDispatch } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { login } from '../../redux/config/AuthSlice';
import {images} from '../../assets/index';
import styles from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FaceBookLogin = ({ navigation }) => {
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    async function onFacebookButtonPress() {
        try {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

            if (result.isCancelled) {
                throw 'User cancelled the login process';
            }
            // Once signed in, get the users AccessToken
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
                throw 'Something went wrong obtaining access token';
            }

            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
            // Sign-in the user with the credential
            auth().signInWithCredential(facebookCredential);

            dispatch(login())
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }],
                })
            );
        } catch (err) {
            console.log("error", err)
        }
    }
    return (
        <View style={[styles.container,{paddingTop: insets.top}]}>
            <View style={styles.viewContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.leftContainer}>
                    <Image source={images.left} style={styles.left} resizeMode='contain'/>
                </TouchableOpacity>
                <Text style={styles.text}>{string.signIn}</Text>
            </View>
            <View style={{ flex: 0.7, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={images.facebook} style={styles.googleImage} resizeMode='contain'/>
                <TouchableOpacity style={styles.buttonContainer} onPress={onFacebookButtonPress}>
                    <Image source={images.facebook} style={styles.googleLogo} resizeMode='contain'/>
                    <Text style={styles.buttonText}>Sign in with FaceBook</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FaceBookLogin;
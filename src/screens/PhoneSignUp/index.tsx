import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import OtpScreen from '../OtpScreen/index';
import { images } from '../../assets/index';
import { vh, vw } from '../../utils/Dimensions';
import string from '../../utils/enum';
import { useDispatch } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { login } from '../../redux/config/AuthSlice';

interface PhoneSignUpProps {
    navigation: any;
}

const PhoneSignUp: React.FC<PhoneSignUpProps> = ({ navigation }) => {
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

    async function signInWithPhoneNumber(phoneNumber: string) {
        try {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(confirmation);
        } catch (error) {
            console.error('Error signing in with phone number:', error);
        }
    }
    const onConfirm = () => {
        dispatch(login())
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }],
            })
        );
    }
    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.viewContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.leftContainer}>
                    <Image source={images.left} style={styles.left} />
                </TouchableOpacity>
                <Text style={styles.text}>{string.signIn}</Text>
            </View>
            {confirm ? (
                <OtpScreen confirm={onConfirm} />
            ) : (
                <TouchableOpacity
                    onPress={() => signInWithPhoneNumber('+919255265660')}
                    style={styles.buttonContainer}
                >
                    <Text style={styles.buttonText}>Phone Number Sign In</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default PhoneSignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    buttonContainer: {
        padding: 15,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'white',
        width: '90%',
        marginTop: 100,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    viewContainer: {
        flexDirection: 'row',
    },
    leftContainer: {},
    left: {
        width: vw(30),
        height: vh(30),
        tintColor: 'white',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        width: '90%',
    },
});

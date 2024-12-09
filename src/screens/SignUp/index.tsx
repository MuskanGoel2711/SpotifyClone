import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { images } from '../../assets/index';
import CustomInput from '../../components/CustomInput/input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { login } from '../../redux/config/AuthSlice';
import styles from './style';
import string from '../../utils/enum';
import CustomButton from '../../components/CustomButton/customButton';

interface SignupProps {
  navigation: any;
  route: any;
}

const Signup: React.FC<SignupProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const passwordInputRef = useRef<TextInput>(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    validateInputs();
  }, [email, password]);

  const validateInputs = () => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordValid = password.length >= 6;
    console.log('Email valid:', emailValid);
    console.log('Password valid:', passwordValid);
    setButtonDisabled(!(emailValid && passwordValid));
  };

  const handleSignup = async () => {
    if (!buttonDisabled) {
      try {
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        console.log('User account created & signed in:', userCredential.user);
        dispatch(login())
        // await AsyncStorage.setItem('isLoggedIn', 'true');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }],
          })
        );
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          console.log('Invalid email address!');
        } else if (error.code === 'auth/weak-password') {
          console.log('Password is too weak!');
        } else {
          console.error('Signup error:', error);
        }
      }
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.viewContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.leftContainer}>
          <Image source={images.left} style={styles.left} />
        </TouchableOpacity>
        <Text style={styles.text}>{string.signUp}</Text>
      </View>
      <View style={styles.inpCont}>
        <Text style={styles.placeholderText}>{string.emailSign}</Text>
        <CustomInput
          placeholder=""
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => passwordInputRef.current?.focus()}
          keyboardAppearance="dark"
        />
        <Text style={styles.placeholderText}>{string.passwordSign}</Text>
        <View>
          <CustomInput
            placeholder=""
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            keyboardType="default"
            secureTextEntry={!passwordVisible}
            returnKeyType="done"
            inputRef={passwordInputRef}
            keyboardAppearance="dark"
          />
          <TouchableOpacity style={styles.eyeContainer} onPress={togglePasswordVisibility}>
            <Image source={!passwordVisible ? images.eye : images.hide} style={styles.eye} />
          </TouchableOpacity>
        </View>
      </View>
      <CustomButton
        title={string.register}
        textStyle={styles.buttonText}
        style={buttonDisabled ? styles.buttonDisabled : styles.buttonContainer}
        disabled={buttonDisabled}
        onPress={handleSignup}
      />
    </View>
  );
};

export default Signup;

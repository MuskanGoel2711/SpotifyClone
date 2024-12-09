import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleProp, TextStyle } from 'react-native';
import { images } from '../../assets/index';
import CustomInput from '../../components/CustomInput/input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './style';
import auth from '@react-native-firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import string from '../../utils/enum';
import { useDispatch } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { login } from '../../redux/config/AuthSlice';
import CustomButton from '../../components/CustomButton/customButton';

interface LoginProps {
  navigation: any;
  route: any;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const passwordInputRef = useRef<TextInput>(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    validateInputs();
  }, [email, password]);

  const validateInputs = () => {
    const emailValid = /\S+@\S+\.\S+/.test(email);
    const passwordValid = password.length >= 6;
    setButtonDisabled(!(emailValid && passwordValid));
    setEmailError(false);
    setPasswordError(false);
    setErrorMessage('');
  };

  const handleLogin = async () => {
    if (!buttonDisabled) {
      try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        console.log('user', userCredential.user);
        dispatch(login())
        // await AsyncStorage.setItem('isLoggedIn', 'true');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }],
          })
        );
      } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
          setErrorMessage('User not found. Please check your email.');
        } else if (error.code === 'auth/wrong-password') {
          setErrorMessage('Incorrect password. Please try again.');
        } else if (error.code === 'auth/invalid-email') {
          setErrorMessage('Invalid email format. Please enter a valid email.');
        } else {
          setErrorMessage('This email and password combination is incorrect');
        }
        setEmailError(true);
        setPasswordError(true);
      }
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.viewContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.leftContainer}>
          <Image source={images.left} style={styles.left} />
        </TouchableOpacity>
        <Text style={styles.text}>{string.logIn}</Text>
      </View>
      <View style={styles.inpCont}>
        <Text style={styles.placeholderText}>{string.email}</Text>
        <CustomInput
          placeholder=""
          style={[
            styles.input,
            emailError && { backgroundColor: 'white', color: 'red' } as StyleProp<TextStyle>,
          ]}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => passwordInputRef.current?.focus()}
          keyboardAppearance="dark"
        />
        <Text style={styles.placeholderText}>{string.password}</Text>
        <View>
          <CustomInput
            placeholder=""
            style={[
              styles.input,
              passwordError && { backgroundColor: 'white', color: 'red' } as StyleProp<TextStyle>,
            ]}
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
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      </View>
      <CustomButton
        title={string.logIn}
        style={buttonDisabled ? styles.buttonDisabled : styles.buttonContainer}
        disabled={buttonDisabled}
        onPress={handleLogin}
        textStyle={styles.buttonText}
      />
    </View>
  );
};

export default Login;

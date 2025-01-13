import {
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  useColorScheme,
  ScrollView,
  SafeAreaView,
  Platform
} from 'react-native';
import React, { useState } from 'react';
import { Styles } from './style';
import CustomInputBox from '../../component/customInput';
import CustomButton from '../../component/customButton';
import CustomPasswordInputBox from '../../component/customInput';
import { validateEmail, validatePassword } from '../../utils/validations';
import { Icons } from '../../assets';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface LoginProps {
  onClose?: any;
  navigation: any;
}

const Login = ({ navigation }: LoginProps) => {
  const theme = useColorScheme();
  const styles = Styles(theme);

  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const loginOptions = [
    ...(Platform.OS === 'ios'
      ? [{ icon: 'logo-apple', label: 'Continue with Apple', onPress: () => {} }]
      : []),
    { icon: 'phone-portrait-outline', label: 'Continue with phone number', onPress: () => navigation.navigate('PhoneSignUp') },
    { icon: 'logo-google', label: 'Continue with Google', onPress: () => navigation.navigate('SignInGoogle') },
    { icon: 'logo-facebook', label: 'Continue with Facebook', onPress: () => navigation.navigate('FaceBookLogin') },
  ];

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (text === '') {
      setEmailError(false);
    } else if (validateEmail(text)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };
  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (text.length === 0) {
      setPasswordError(false);
    } else if (validatePassword(text)) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleNext = () => {
    if (!error) {
      navigation.navigate('Home');
    }
  };

  const isButtonDisabled = emailError || !validateEmail(email);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.mainContainer}>
          <ScrollView style={{ flex: 1 }}>
            <StatusBar
              backgroundColor={'transparent'}
              barStyle={'dark-content'}
              translucent={true}
            />
            <View style={styles.subContainer}>
              <View style={styles.contentHeader}>
                <Text style={styles.headerText}>Sign In</Text>
              </View>
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailText}>
                  Welcome back! Please enter your details.
                </Text>
              </View>

              <CustomInputBox
                name={email}
                label={'Email Address'}
                maxLength={50}
                keyboardType={'email-address'}
                onChangeText={handleEmailChange}
                setName={setEmail}
                Icon={Icons.email}
                Error={emailError}
                setError={setEmailError}
                errorText={'Please enter valid email'}
              />
              <CustomPasswordInputBox
                name={password}
                label="Password"
                Icon={Icons.lock}
                isPasswordVisible={isPasswordVisible}
                togglePasswordVisibility={togglePasswordVisibility}
                Error={passwordError}
                onChangeText={handlePasswordChange}
                maxLength={50}
                keyboardType="default"
                errorText="Please enter correct password"
              />
              <TouchableOpacity
                style={styles.forgotPass}
                onPress={() => {
                  navigation.navigate('ForgotPassword');
                }}>
                <Text style={styles.forgotPassText}>Forgot Password?</Text>
              </TouchableOpacity>

              <CustomButton
                title={'Sign in'}
                onPress={handleNext}
                isButtonDisabled={isButtonDisabled}
              />
            </View>
            <View style={styles.loginContainer}>
              <Text style={styles.accountText}>Don't have an account?</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'SignUpScreen' }],
                  })
                }>
                <Text style={styles.loginText}> Sign up</Text>
              </TouchableOpacity>
            </View>
            {loginOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.buttonCont}
                onPress={option.onPress}
              >
                <Ionicons name={option.icon} size={20} color="black" />
                <Text style={styles.buttonText1}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Login;
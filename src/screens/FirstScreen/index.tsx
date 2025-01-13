import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageStyle, Platform } from 'react-native';
import CustomButton from '../../components/CustomButton/customButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { images } from '../../assets/index';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './style';
import string from '../../utils/enum';

type FirstScreenProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

const FirstScreen: React.FC<FirstScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const loginOptions = [
    ...(Platform.OS === 'ios'
      ? [{ icon: 'logo-apple', label: 'Continue with Apple', onPress: () => {} }]
      : []),
    { icon: 'phone-portrait-outline', label: 'Continue with phone number', onPress: () => navigation.navigate('PhoneSignUp') },
    { icon: 'logo-google', label: 'Continue with Google', onPress: () => navigation.navigate('SignInGoogle') },
    { icon: 'logo-facebook', label: 'Continue with Facebook', onPress: () => navigation.navigate('FaceBookLogin') },
  ];

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {/* <Image source={images.spotify} style={styles.image as ImageStyle} /> */}
      {/* <Text style={styles.text}>{string.millionText}</Text> */}
      {/* <Text style={styles.text}>{string.spotifyText}</Text> */}
      <CustomButton 
        title={string.signUpText}
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Signup')}
        textStyle={styles.buttonText}
      />
      {loginOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.buttonCont}
          onPress={option.onPress}
        >
          <Ionicons name={option.icon} size={20} color="white" />
          <Text style={styles.buttonText1}>{option.label}</Text>
        </TouchableOpacity>
      ))}
      <CustomButton 
        title={string.logIn}
        onPress={() => navigation.navigate('Login')}
        textStyle={styles.Text}
      />
    </View>
  );
};

export default FirstScreen;

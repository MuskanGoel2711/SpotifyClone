import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageStyle } from 'react-native';
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
    { icon: 'logo-apple', label: 'Continue with Apple', onPress: () => {} },
    { icon: 'phone-portrait-outline', label: 'Continue with phone number', onPress: () =>  navigation.navigate('PhoneSignUp')},
    { icon: 'logo-google', label: 'Continue with Google', onPress: () => navigation.navigate('SignInGoogle') },
    { icon: 'logo-facebook', label: 'Continue with FaceBook', onPress: () => {} },
  ];

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Image source={images.spotify} style={styles.image as ImageStyle} />
      <Text style={styles.text}>{string.millionText}</Text>
      <Text style={styles.text}>{string.spotifyText}</Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.buttonText}>{string.signUpText}</Text>
      </TouchableOpacity>
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
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.Text}>{string.logIn}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FirstScreen;

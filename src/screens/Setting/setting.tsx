import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { images } from '../../assets/index';
import { vw, vh } from '../../utils/Dimensions';
import string from '../../utils/enum';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/config/AuthSlice';
import styles from './style';
import CustomButton from '../../components/CustomButton/customButton';

interface SettingProps {
  navigation: any;
}

const Setting: React.FC<SettingProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const handleLogout = async () => {
    dispatch(logout());
    // await AsyncStorage.removeItem('isLoggedIn');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'FirstScreen' }],
      })
    );
  };

  const settingOptions = [
    'Account',
    'Data Saver',
    'Playback',
    'Content and display',
    'Devices',
    'Car',
    'Privacy and social',
    'Voice Assistants & Apps',
    'Audio Quality',
    'Video Quality',
    'Storage',
    'Notifications',
    'Local Files',
    'About'
  ]

  return (
    <View style={[styles.container, { paddingTop: insets.top }]} >
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.leftContainer}>
          <Image source={images.left} style={styles.left} />
        </TouchableOpacity>
        <Text style={styles.settingText}>{string.settingHeader}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.optionViewContainer}>
          {settingOptions.map((option, index) => (
            <TouchableOpacity key={index} style={styles.optionContainer}>
              <Text style={styles.optionText}>{option}</Text>
              <Image style={styles.right} source={images.right} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.viewContainer}>
          <CustomButton
            title={string.logOut}
            style={styles.buttonContainer}
            onPress={handleLogout}
            textStyle={styles.text}
          />
        </View>
      </ScrollView>

    </View>
  );
};

export default Setting;
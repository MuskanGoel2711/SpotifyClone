import {StyleSheet} from 'react-native';
import {vw, vh} from '../../utils/Dimensions';
export const Styles = (theme: any) =>
  StyleSheet.create({
    mainContainer: {
      backgroundColor: theme === 'dark' ? '#000' : '#FFF',
      flex: 1,
    },
    subContainer: {
      paddingVertical: vh(50),
      paddingHorizontal: vw(26),
    },
    backButton: {
      width: vw(40),
      height: vw(40),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#E7E7E7',
      borderRadius: 50,
    },
    Left: {
      width: vw(24),
      height: vw(24),
      resizeMode: 'contain',
    },
    titleContainer: {
      marginTop: vh(26),
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#FFF' : '#000',
    },
    subtitle: {
      marginTop: vh(10),
      fontSize: 15,
      color: '#6c6c6c',
    },
    mobileText: {
      fontWeight: '600',
      color: theme === 'dark' ? '#FFF' : '#000',
    },
    otpText: {
      fontSize: 14,
      marginTop: vh(20),
      marginBottom: vh(14),
    },
    otpContainer: {
      marginTop: vh(26),
      flexDirection: 'row',
      justifyContent: 'center',
    },
    otpInput: {
      paddingHorizontal: vw(20),
      paddingVertical: vh(13),
      borderWidth: 1,
      backgroundColor: '#fff',
      borderRadius: 8,
      textAlign: 'center',
      fontSize: 18,
      marginHorizontal: vw(6),
    },
    error: {
      color: 'red',
      marginTop: vh(10),
    },
    button: {
      width: '85%',
      backgroundColor: '#486284',
      paddingVertical: vh(15),
      paddingHorizontal: vw(50),
      alignSelf: 'center',
      marginTop: vh(50),
      borderRadius: 12,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
    },
    signUpContainer: {
      flexDirection: 'row',
      alignSelf: 'center',
    },
    newAccountText: {
      fontSize: 16,
      fontWeight: '400',
      color: 'grey',
    },
    resendText: {
      fontSize: 16,
      fontWeight: '600',
    },
    timerContainer: {
      marginTop: vh(30),
      alignItems: 'center',
    },
    timerText: {
      fontSize: 16,
      color: '#486284',
      fontWeight: 'bold',
    },
  });
import {StyleSheet} from 'react-native';
import {vw, vh} from '../../utils/Dimensions';

export const Styles = (theme: any) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: theme === 'dark' ? 'black' : 'white',
    },
    subContainer: {
      paddingVertical: vh(25),
      paddingHorizontal: vw(20),
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
    contentHeader: {},
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#FFF' : '#000',
      marginTop:vh(20),
    },
    detailTextContainer: {
      marginTop: vh(10),
      marginBottom: vh(10),
    },
    detailText: {
      fontSize: 15,
      color: 'gray',
    },
    focusedInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: vh(24),
      borderWidth: 1,
      borderRadius: 10,
      borderColor: 'red',
      width: '100%',
    },
    telephoneButton: {
      paddingHorizontal: vw(14),
      borderColor: '#ccc',
      borderRightWidth: 1,
      marginRight: vw(4),
    },

    countryCodeButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    consentContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginTop: vh(15),
      paddingRight: vw(24),
    },
    consentButton: {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme === 'dark' ? 'white' : 'white',
    },
    consentText: {
      lineHeight: vh(19),
      fontSize: 15,
      color: 'gray',
      marginLeft: vw(4),
    },
    uncheckedImg: {
      width: vw(18),
      height: vw(18),
      resizeMode: 'cover',
    },
    disabledButton: {
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.8,
      shadowRadius: 3,
      elevation: 5,
    },
    loginContainer: {
      flexDirection: 'row',
      alignSelf: 'center',
      // marginTop: vh(10),
    },
    accountText: {
      fontSize: 16,
      fontWeight: '400',
      color: 'grey',
    },
    loginText: {
      fontSize: 16,
      fontWeight: '600',
      color: 'blue',
    },
    languageButton: {
      width: '30%',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: vh(20),
      padding: vw(8),
    },
    languageText: {
      fontSize: 16,
      fontWeight: '500',
      color: theme === 'dark' ? '#FFF' : '#000',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: vh(16),
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#ccc',
      width: '100%',
    },
    phoneInput: {
      width: '74%',
      // width: '95%',
      paddingVertical: vh(16),
      fontSize: 15,
      backgroundColor: theme === 'dark' ? '#000' : '#FFF',
      // backgroundColor:'red',
      // marginHorizontal: 8,
      overflow: 'hidden',
    },
    iconButton: {
      paddingHorizontal: vw(14),
      borderColor: '#ccc',
      borderRightWidth: 1,
      marginRight: vw(4),
    },
    iconStyle: {
      width: vw(20),
      height: vw(20),
      resizeMode: 'contain',
    },
    forgotPass: {
      marginTop: vw(14),
      alignSelf: 'flex-end',
    },
    forgotPassText: {
      fontSize: 15,
      color: '#3797EF',
    },
  });
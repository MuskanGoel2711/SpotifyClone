import { StyleSheet } from "react-native";
import {vw,vh} from '../../utils/Dimensions'
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    headerContainer: {
      flexDirection: 'row',
    },
    settingText: {
      color: 'white',
      fontSize: 18,
      width: '80%',
      textAlign: 'center'
    },
    optionViewContainer: {
      paddingVertical: 15
    },
    optionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 9
    },
    optionText: {
      color: 'white',
      fontSize: 17
    },
    right: {
      width: vw(20),
      height: vh(20),
      tintColor: 'white'
    },
    viewContainer: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContainer: {
      backgroundColor: 'white',
      borderRadius: 30,
      paddingHorizontal: 30,
      paddingVertical: 20,
      marginTop: 15,
      width: '35%',
    },
    text: {
      color: 'black',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 18
    },
    leftContainer: {
  
    },
    left: {
      width: vw(30),
      height: vh(30),
      tintColor: 'white'
    },
    
  });

export default styles;
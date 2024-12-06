import {StyleSheet} from 'react-native';
import {vh,vw} from '../../utils/Dimensions'
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    headerContainer: {
      flexDirection: 'row',
    },
    textContainer: {
      backgroundColor: '#eb6b34',
      borderRadius: 100,
      padding: 10,
      marginLeft: 12,
    },
    textContainer1: {
      backgroundColor: '#269134',
      borderRadius: 50,
      paddingHorizontal: 18,
      paddingVertical: 10,
      marginLeft: 12,
    },
    text: {
      color: 'black',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      // marginBottom: 20,
      marginLeft: 10,
      color: 'white',
    },
    sectionTitle1: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 35,
      // marginBottom: 20,
      marginLeft: 10,
      color: 'white',
    },
    flatListContainer: {
      marginLeft: 12,
      marginRight: 12,
      marginTop: 12,
      marginBottom: 9
    },
    artistImage: {
      width: vw(120),
      height: vh(120),
      borderRadius: 8,
      marginBottom: 10,
    },
    artistContainer: {
      marginRight: 15,
      width: vw(120),
      alignItems: 'center',
    },
    artistName: {
      fontSize: 14,
      fontWeight: 'bold',
      color: 'white',
    },
    artistGenres: {
      fontSize: 12,
      color: 'gray',
      textAlign: 'center',
    },
    albumContainer: {
      marginRight: 15,
      alignItems: 'center',
      width: vw(120),
    },
    albumImage: {
      width: vw(100),
      height: vh(100),
      borderRadius: 8,
      marginBottom: 5,
      backgroundColor: 'red',
    },
    albumTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'white',
    },
    albumArtist: {
      fontSize: 12,
      color: 'gray',
      textAlign: 'center',
    },
  });

export default styles;
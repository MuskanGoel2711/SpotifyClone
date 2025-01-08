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
      borderRadius: 50,
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
      marginTop: 15,
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
    recommendedToday: {
      width: 120,
      height: 120
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
    albumContainerFirst: {
      marginHorizontal: 10,
      marginTop: 20,
      alignItems: 'center',
      width: vw(170),
      flexDirection: 'row',
      borderRadius: 8,
      backgroundColor: 'gray'
    },
    albumContainer: {
      marginRight: 15,
      width: vw(120),
    },
    albumContainer1: {
      marginBottom: 20,
      width: vw(120),
    },
    albumContainer2:{borderRadius: 23, margin: 12},
    textContainer2: {position: 'absolute',marginLeft: 22},
    albumImage: {
      width: vw(350),
      height: vh(320),
      borderRadius: 8,
      marginBottom: 5,
      // backgroundColor: 'red',
    },
    albumImageFirst: {
      width: vw(60),
      height: vh(60),
      borderRadius: 8,
      marginRight: 10
      // backgroundColor: 'red',
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
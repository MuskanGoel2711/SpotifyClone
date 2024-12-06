import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ImageStyle } from 'react-native';
import { images } from '../../assets/index';
import { vh, vw } from '../../utils/Dimensions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type CustomDrawerProps = {
  navigation: any;
};


const CustomDrawer: React.FC<CustomDrawerProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const onSetting = () => {
    navigation.navigate('Setting');
  }
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View></View>
      <View style={styles.sideContainer}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('FirstScreen')}
        >
          <Image source={images.addAccount} style={styles.image} />
          <Text style={styles.text}>Add account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Image source={images.thunder} style={styles.image} />
          <Text style={styles.text}>What's new</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Image source={images.history} style={styles.image} />
          <Text style={styles.text}>Listening history</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={onSetting}>
          <Image source={images.setting} style={styles.image} />
          <Text style={styles.text}>Settings and privacy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  sideContainer: {
    margin: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  image: {
    width: vw(28),
    height: vh(28),
    tintColor: 'white',
  } as ImageStyle,
  text: {
    paddingLeft: 15,
    color: 'white',
    fontSize: 18,
  },
});

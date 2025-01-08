import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ImageStyle } from 'react-native';
import { images } from '../../assets/index';
import { vh, vw } from '../../utils/Dimensions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type CustomDrawerProps = {
  navigation: any;
};

type DrawerItemProps = {
  onPress: () => void;
  imageSource: any;
  label: string;
}

const DrawerItem: React.FC<DrawerItemProps> = ({ onPress, imageSource, label }) => (
  <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
    <Image source={imageSource} style={styles.image} />
    <Text style={styles.text}>{label}</Text>
  </TouchableOpacity>
);


const CustomDrawer: React.FC<CustomDrawerProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.sideContainer}>
        <DrawerItem
          onPress={() => navigation.navigate('FirstScreen')}
          imageSource={images.addAccount}
          label="Add account"
        />
        <DrawerItem
          onPress={() => { }}
          imageSource={images.thunder}
          label="What's new"
        />
        <DrawerItem
          onPress={() => { }}
          imageSource={images.history}
          label="Listening history"
        />
        <DrawerItem
          onPress={() => navigation.navigate('Setting')}
          imageSource={images.setting}
          label="Settings and privacy"
        />
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
    alignItems: 'center'
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

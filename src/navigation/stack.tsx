import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import MusicPlayer from '../screens/MusicPlayer';
import DrawerNavigator from './drawer';
import FirstScreen from '../screens/FirstScreen';
import Login from '../screens/Login';
import Album from '../screens/HomeScreen/album';
import Track from '../screens/HomeScreen/track';
import Signup from '../screens/SignUp/index';
import Player from '../screens/HomeScreen/Player/player';
import SignInGoogle from '../screens/SignUpGoogle';
import SearchHome from '../screens/HomeScreen/searchHome';
import Setting from '../screens/Setting/setting';
import PhoneSignUp from '../screens/PhoneSignUp';

type RootStackParamList = {
  SplashScreen: undefined;
  FirstScreen: undefined;
  Login: undefined;
  HomeScreen: undefined;
  album: undefined;
  Player: undefined;
  track: undefined;
  Signup: undefined;
  SignInGoogle: undefined;
  SearchHome: undefined;
  Setting: undefined;
  MusicPlayer: undefined;
  PhoneSignUp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const NativeStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="MusicPlayer" component={MusicPlayer} options={{ gestureEnabled: false }} /> */}
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="FirstScreen" component={FirstScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="Login" component={Login} options={{ gestureEnabled: false}} />
        <Stack.Screen name="HomeScreen" component={DrawerNavigator} options={{gestureEnabled: false, animation: 'fade'}} />
        <Stack.Screen name="album" component={Album} />
        <Stack.Screen name="Player" component={Player}/>
        <Stack.Screen name="track" component={Track}/>
        <Stack.Screen name="Signup" component={Signup} options={{ gestureEnabled: false }} />
        <Stack.Screen name="SignInGoogle" component={SignInGoogle} options={{ gestureEnabled: false }} />
        <Stack.Screen name="SearchHome" component={SearchHome} options={{ gestureEnabled: false, animation: 'slide_from_bottom' }} />
        <Stack.Screen name="Setting" component={Setting} options={{ gestureEnabled: false }} />
        {/* <Stack.Screen name="MusicPlayer" component={MusicPlayer} options={{ gestureEnabled: false }} /> */}
        <Stack.Screen name="PhoneSignUp" component={PhoneSignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NativeStack;

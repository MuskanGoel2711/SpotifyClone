import React from 'react';
import { Image } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import Premium from './components/premium';
import Create from './components/library';
import Search from './components/search';
import { images } from '../assets/index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchHome from '../screens/HomeScreen/searchHome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type TabParamList = {
    Home: undefined;
    Search: undefined;
    "Your Library": undefined;
    Premium: undefined;
    SearchHome: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const SearchStack = createNativeStackNavigator();

const BottomTab: React.FC = () => {
    const SearchStackNavigator = () => {
        return (
            <SearchStack.Navigator screenOptions={{ headerShown: false }}>
                <SearchStack.Screen name="Search" component={Search} options={{ gestureEnabled: false, animation: 'fade' }} />
                <SearchStack.Screen name="SearchHome" component={SearchHome} options={{ gestureEnabled: false, animation: 'fade' }} />
            </SearchStack.Navigator>
        );
    };
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: { backgroundColor: 'black' },
            tabBarInactiveTintColor: '#FFFFFF',
        }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: "Home",
                    tabBarIcon: ({ size, color }: { size: number, color: string }) => {
                        return (
                            <Image
                                style={{ width: size, height: size, tintColor: color }}
                                source={images.hut}
                            />
                        );
                    },
                }} 
            />

            <Tab.Screen
                name="Search"
                component={SearchStackNavigator}
                options={() => ({
                    title: 'Search',
                    tabBarIcon: ({ size, color }: { size: number; color: string }) => (
                        <Image
                            style={{ width: 23, height: 23, tintColor: color }}
                            source={images.search}
                        />
                    ),
                })}
            />
            <Tab.Screen
                name="Your Library"
                component={Create}
                options={{
                    title: 'Your Library',
                    tabBarIcon: ({ size, color }: { size: number, color: string }) => {
                        return (
                            <Image
                                style={{ width: 32, height: 32, tintColor: color }}
                                source={images.library}
                            />
                        );
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTab;
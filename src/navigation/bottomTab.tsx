import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import Premium from './components/premium';
import Create from './components/library';
import Search from './components/search';
import { images } from '../assets/index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

type TabParamList = {
    Home: undefined;
    Search: undefined;
    "Your Library": undefined;
    Premium: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const BottomTab: React.FC = () => {
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
                }} />

            <Tab.Screen
                name="Search"
                component={Search}
                options={() => ({
                    title: 'Search',
                    tabBarIcon: ({ size, color }: { size: number; color: string }) => (
                        <TouchableOpacity>
                            <Image
                                style={{ width: 25, height: 25, tintColor: color }}
                                source={images.search}
                            />
                        </TouchableOpacity>
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
                                style={{ width: size, height: size, tintColor: color }}
                                source={images.library}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Premium"
                component={Premium}
                options={{
                    title: 'Premium',
                    tabBarIcon: ({ size, color }: { size: number, color: string }) => {
                        return (
                            <Image
                                style={{ width: size, height: size, tintColor: color }}
                                source={images.premium}
                            />
                        );
                    },
                }} />
        </Tab.Navigator>
    )
}

export default BottomTab;

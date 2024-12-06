import React from 'react';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import BottomTab from './bottomTab';
import CustomDrawer from '../components/CustomDrawer/customDrawer';

type DrawerParamList = {
    HomeSc: undefined; 
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator: React.FC = () => {
    return (
        <Drawer.Navigator
            initialRouteName="HomeSc"
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Drawer.Screen name="HomeSc" component={BottomTab} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;

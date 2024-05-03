import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { rootNavigationRef } from './RootNavigation';
import { useState } from 'react';
import GlobalComponent from '../GlobalComponent';
import { Text, View } from 'react-native';
import UserHelper from '../utils/user.helper';
import { BackgroundImgContainer } from '../components/background/Background';
import Test from '../components/test';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainTabBar from '../components/mainTabBar/MainTabBar';
import OnboardingScreen from '../screens/OnBoardDingScreen';
import DetailTourScreen from '../screens/DetailTourScreen';
import ExploreScreen from '../screens/ExploreScreen';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';

const AppNavigator = () => {
    const tag = '[AppNavigator]';
    enableScreens();
    const Stack = createStackNavigator();
    const [log, setLog] = useState(false);

    const isLogged = async () => {
        setLog(await UserHelper.checkAccessTokenValid());
    };
    isLogged();
    return (
        <NavigationContainer ref={rootNavigationRef}>
            <GlobalComponent />
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'ExploreScreen'}>
                <Stack.Screen
                    name="OnBoardingScreen"
                    component={OnboardingScreen}
                    options={{ headerTitle: 'Header on Boarding' }}
                    screenOptions={{ headerShown: true }}
                />
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerTitle: 'Header on login' }} />
                <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                    options={{ headerTitle: 'Header on Register' }}
                />
                <Stack.Screen name="MainTabBar" component={MainTabBar} options={{ headerTitle: 'Header MainTabBar' }} />
                <Stack.Screen name="DetailTourScreen" component={DetailTourScreen} />
                <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
                <Stack.Screen name="PaymentMethodScreen" component={PaymentMethodScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;

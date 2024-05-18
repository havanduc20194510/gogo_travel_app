import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import SavedScreen from '../../screens/SavedScreen';
import BookingScreen from '../../screens/BookingScreen';
import AppIcon from '../icon/AppIcon';
import DefaultHeader from '../header/DefaultHeader';
import { useTranslation } from 'react-i18next';
import SearchHeader from '../header/SearchHeader';
import PlaceScreen from '../../screens/PlaceScreen';
import AppColors from '../../assets/AppColors';

const Tab = createBottomTabNavigator();

export default function MainTabBar() {
    const { t } = useTranslation();
    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: true,
                tabBarStyle: {
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    // elevation: 4,
                },
                tabBarActiveTintColor: AppColors.backgroundHeader,
                tabBarInactiveTintColor: AppColors.bgrbutton,
            })}
        >
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => <AppIcon name="home-outline" color={color} size={size} />,
                    headerShown: true,
                    header: ({ navigation, route, options }) => {
                        return <SearchHeader title={t('header')}></SearchHeader>;
                    },
                }}
            />

            <Tab.Screen
                name="BookingScreen"
                component={BookingScreen}
                options={{
                    tabBarLabel: 'Booking',
                    tabBarIcon: ({ color, size }) => <AppIcon name="ticket-outline" color={color} size={size} />,
                    headerShown: true,
                    header: ({ navigation, route, options }) => {
                        return <SearchHeader title={t('header')}></SearchHeader>;
                    },
                }}
            />

            <Tab.Screen
                name="PlaceScreen"
                component={PlaceScreen}
                options={{
                    tabBarLabel: 'Place',
                    tabBarIcon: ({ color, size }) => <AppIcon name="globe-outline" color={color} size={size} />,
                    headerShown: true,
                    header: ({ navigation, route, options }) => {
                        return <SearchHeader title={t('header')}></SearchHeader>;
                    },
                }}
            />

            <Tab.Screen
                name="Journey"
                component={SavedScreen}
                options={{
                    tabBarLabel: 'Saved',
                    tabBarIcon: ({ color, size }) => <AppIcon name="heart-circle-outline" color={color} size={size} />,
                }}
            />

            <Tab.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => <AppIcon name="person-circle-outline" color={color} size={size} />,
                    headerShown: true,
                    header: ({ navigation, route, options }) => {
                        return <SearchHeader title={t('header')}></SearchHeader>;
                    },
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/HomeScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import SavedScreen from "../../screens/SavedScreen";
import BookingScreen from "../../screens/BookingScreen";
import AppIcon from "../icon/AppIcon";
import DefaultHeader from "../header/DefaultHeader";
import { useTranslation } from "react-i18next";
import SearchHeader from "../header/SearchHeader";

const Tab = createBottomTabNavigator();

export default function MainTabBar() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      initialRouteName="SavedScreen"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          // elevation: 4,
        },
      })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "HomeScreen",
          tabBarIcon: ({ color, size }) => (
            <AppIcon name="home-outline" color={color} size={size} />
          ),
          headerShown: true,
          header: ({ navigation, route, options }) => {
            return <SearchHeader title={t("header")}></SearchHeader>;
          },
        }}
      />

      <Tab.Screen
        name="SavedScreen"
        component={SavedScreen}
        options={{
          tabBarLabel: "SavedScreen",
          tabBarIcon: ({ color, size }) => (
            <AppIcon name="heart-circle-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="BookingScreen"
        component={BookingScreen}
        options={{
          tabBarLabel: "BookingScreen",
          tabBarIcon: ({ color, size }) => (
            <AppIcon name="ticket-outline" color={color} size={size} />
          ),
          headerShown: true,
          header: ({ navigation, route, options }) => {
            return <SearchHeader title={t("header")}></SearchHeader>;
          },
        }}
      />

      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile screen",
          tabBarIcon: ({ color, size }) => (
            <AppIcon name="person-circle-outline" color={color} size={size} />
          ),
          headerShown: true,
          header: ({ navigation, route, options }) => {
            return <SearchHeader title={t("header")}></SearchHeader>;
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});

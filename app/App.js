import React from 'react';
// import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogBox, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { store } from './controllers/redux/AppStore';
import AppNavigator from './Navigator/AppNavigator';
import { Provider } from 'react-redux';
import './ignoreWarnings';
import { LogLevel, OneSignal } from 'react-native-onesignal';

// import { useFonts } from "expo-font";
/**
 * @document
 * @param
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => {
    const tag = '[App]';
    // const [fontsLoaded] = useFonts({
    //   light: require("./assets/fonts/BeVietnamPro-Light.ttf"),
    //   // regular: require("./assets/fonts/BeVietnamPro-Light.ttf"),
    //   medium: require("./assets/fonts/BeVietnamPro-Light.ttf"),
    //   semiBold: require("./assets/fonts/BeVietnamPro-Light.ttf"),
    //   bold: require("./assets/fonts/BeVietnamPro-Light.ttf"),
    // });

    // if (!fontsLoaded) {
    //   return null;
    // }

    // Remove this method to stop OneSignal Debugging
    // OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    // OneSignal Initialization
    OneSignal.initialize('e4303842-6a36-4be3-8fcf-b0a2c6697723');

    // requestPermission will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
    OneSignal.Notifications.requestPermission(true);

    // Method for listening for notification clicks
    OneSignal.Notifications.addEventListener('click', (event) => {
        console.log('OneSignal: notification clicked:', event);
    });

    LogBox.ignoreAllLogs(true);
    return (
        // <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
            <Provider store={store}>
                <StatusBar backgroundColor={'transparent'} translucent barStyle={'light-content'} />
                <AppNavigator></AppNavigator>
            </Provider>
        </SafeAreaView>
        // </SafeAreaProvider>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 25,
        fontWeight: '500',
    },
});

import React from "react";
// import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { store } from "./controllers/redux/AppStore";
import AppNavigator from "./Navigator/AppNavigator";
import { Provider } from "react-redux";

// import { useFonts } from "expo-font";
/**
 * @document
 * @param
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => {
  const tag = "[App]";
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

  return (
    // <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <StatusBar
          backgroundColor={"transparent"}
          translucent
          barStyle={"light-content"}
        />
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
    fontWeight: "500",
  },
});

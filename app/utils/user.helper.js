import { useSelector } from "react-redux";
import PreferenceKeys from "../controllers/constants/PreferenceKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserHelper = {
  // Check accessToken isValid
  checkAccessTokenValid: async () => {
    const accessToken = await AsyncStorage.getItem(PreferenceKeys.accessToken);

    if (accessToken) {
      return true;
    }

    return false;
  },

  // Sign out
  signOut: async () => {
    await AsyncStorage.removeItem(PreferenceKeys.accessToken);
    // AsyncStorage.removeItem(PreferenceKeys.refreshToken);
    // removeAxiosAccessToken();
  },
};

export default UserHelper;

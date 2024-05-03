import { Text, View } from "react-native";
import CardProfile from "../components/card/cardProfile";
import Styles from "../components/Styles";
import CardRowNavigate from "../components/card/cardRowNavigate";
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default ProfileScreen = () => {
  const { t } = useTranslation();
  const handleLogin = () => {
    console.log("handle login");
  };
  return (
    <View>
      <CardProfile></CardProfile>
      <CardRowNavigate
        title={t("Setting")}
        leftIcon={<Ionicons name="settings-outline" size={26}></Ionicons>}
      ></CardRowNavigate>

      <CardRowNavigate
        title={t("FAQs")}
        leftIcon={
          <Ionicons name="information-circle-outline" size={26}></Ionicons>
        }
      ></CardRowNavigate>

      <CardRowNavigate
        title={t("Logout")}
        leftIcon={<MaterialIcons name="logout" size={26}></MaterialIcons>}
        rightIcon={<View style={{ width: 26, height: 26 }}></View>}
        onPress={handleLogin}
      ></CardRowNavigate>
    </View>
  );
};

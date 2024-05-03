import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  Alert,
} from "react-native";

import { useTranslation } from "react-i18next";
import GlobalIndicator from "../components/indicator/GlobalIndicator";
import Global from "../components/Global";
import AppTextInput from "../components/input/AppTextInput";
import AppPasswordInput from "../components/input/AppPasswordInput";
import { BackgroundImgContainer } from "../components/background/Background";
import AppColors from "../assets/AppColors";
import ButtonFullBgr from "../components/buttons/custom/ButtonFullBgr";
import Utils from "../utils/util";
import navigatorUtils from "../utils/navigator.utils";

/**
 * @document
 * @param
 * @returns {JSX.Element}
 * @constructor
 */
function RegisterScreen() {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [pass, setPass] = useState("");
  const [rePass, setRePass] = useState("true");

  const handleRegister = async () => {
    GlobalIndicator.show("Đang đăng kí");
    if (rePass != pass) {
      Alert.alert("Failed !!!", `Not same confirm pass...`, [
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);

      return;
    }

    GlobalIndicator.hide();
    Alert.alert("Success", `Đăng kí tài khoản thành công`, [
      {
        text: "OK",
        style: "cancel",
      },
    ]);
    navigatorUtils.navigate("LoginScreen");
    // const res = await authApi.register({
    //   username,
    //   fullname,
    //   email,
    //   password: pass,
    // });

    // if (res?.result != "success") {
    //   GlobalIndicator.hide();
    //   Alert.alert("Register failed", `Failed  !!!`, [
    //     {
    //       text: "Cancel",
    //       style: "cancel",
    //     },
    //   ]);

    //   return;
    // } else {
    //   GlobalIndicator.hide();
    //   Alert.alert("Success", `Đăng kí tài khoản thành công`, [
    //     {
    //       text: "OK",
    //       style: "cancel",
    //     },
    //   ]);
    //   navigatorUtils.navigate("LoginScreen");
    // }
  };

  return (
    <BackgroundImgContainer
      source={require("../assets/images/bg_auth_02.jpg")}
      imageStyle={{
        height: Global.Const.fullScreenHeight,
      }}
    >
      <View style={{ position: "relative" }}>
        <ScrollView>
          <View
            style={{
              // // position: 'absolute',
              height: Global.Const.fullScreenHeight,
              paddingTop: 30,
              width: "100%",
            }}
          >
            <View
              style={{
                marginTop: 0,
                // borderRadius: "20px",
                height: Global.Const.fullScreenHeight - 284,
                width: "100%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  overflow: "scroll",
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 20,
                    flexDirection: "row",
                    alignContent: "center",
                    width: "100%",
                    marginTop: 20,
                  }}
                >
                  <View style={{ marginRight: 20 }}></View>
                  <View style={{ width: "auto" }}>
                    <Text
                      style={{
                        color: AppColors.ghostwhite,
                        fontSize: 32,
                        fontWeight: 600,
                        lineHeight: 46,
                      }}
                    >
                      {t("Register")}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ marginVertical: 24, marginHorizontal: 20 }}>
                {/* fullname */}
                <View>
                  <AppTextInput
                    title={t("Fullname")}
                    value={fullname}
                    isNumber={false}
                    placeholder={t("Fullname")}
                    onChangeText={(text) => {
                      // dispatch(AccountActions.setCurrentPhone(text));
                      setFullname(text);
                    }}
                    // editable={true}

                    onClear={() => {
                      setFullname("");
                    }}
                    borColor={AppColors.neutral}
                    message={""}
                  />
                </View>

                {/* email */}
                <View>
                  <AppTextInput
                    title={t("Email")}
                    value={email}
                    isNumber={false}
                    placeholder={t("Email")}
                    onChangeText={(text) => {
                      // dispatch(AccountActions.setCurrentPhone(text));
                      setEmail(text);
                    }}
                    // editable={true}

                    onClear={() => {
                      setEmail("");
                    }}
                    borColor={AppColors.neutral}
                    message={""}
                  />
                </View>

                {/*  username */}
                <View>
                  <AppTextInput
                    title={t("Username")}
                    value={username}
                    isNumber={false}
                    placeholder={t("Username")}
                    onChangeText={(text) => {
                      setUsername(text);
                    }}
                    // editable={true}

                    onClear={() => {
                      setUsername("");
                    }}
                    borColor={AppColors.neutral}
                    message={""}
                  />
                </View>

                {/* password */}
                <View style={{ marginTop: 16 }}>
                  <AppPasswordInput
                    value={pass}
                    title={t("Password")}
                    placeholder={t("Password")}
                    // message={messRePassword}
                    type="password"
                    onChangeText={(text) => {
                      setPass(Utils.sha256(text));
                    }}
                    borColor={AppColors.neutral}
                    onClear={() => {
                      setPass("");
                    }}
                  />
                </View>

                {/* rePassword */}
                <View style={{ marginTop: 16 }}>
                  <AppPasswordInput
                    value={rePass}
                    title={t("Confirm password")}
                    placeholder={t("Confirm password")}
                    // message={messRePassword}
                    type="password"
                    onChangeText={(text) => {
                      setRePass(Utils.sha256(text));
                    }}
                    borColor={AppColors.neutral}
                    onClear={() => {
                      setRePass("");
                    }}
                  />
                </View>
              </View>

              {/* button register */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 20,
                  marginTop: 30,
                }}
              >
                <ButtonFullBgr
                  onPress={() => {
                    handleRegister();
                  }}
                  title={t("Register")}
                />
              </View>

              {/* đã có tài khoản */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginHorizontal: 20,
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <Text
                  onPress={() => navigatorUtils.navigate("LoginScreen")}
                  style={{ color: `${AppColors.ghostwhite}` }}
                >
                  {t("Have account")} ?
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </BackgroundImgContainer>
  );
}

export default RegisterScreen;

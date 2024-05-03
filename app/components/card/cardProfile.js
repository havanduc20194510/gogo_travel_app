import _ from "lodash";
import React from "react";
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
} from "react-native";
import FastImage from "react-native-fast-image";
import Styles, { FontSize } from "../Styles";
import Const from "../Const";
import AppColors from "../../assets/AppColors";
import AppIcons from "../../assets/AppIcons";
import ButtonFullBgr from "../buttons/custom/ButtonFullBgr";
import { useTranslation } from "react-i18next";
import AvatarPicker from "../picker/AvatarPicker";

const tag = "[CardProfile]";
/**
 * @author sonnh
 * @document https://git.mdcgate.com:8443/myx/my-x-mobile/-/issues/15
 * @param {Object} props
 * @param {ImageSourcePropType} props.thumbnail ảnh banner
 * @param {string|JSX.Element|()=>JSX.Element=} props.selectTitle mô tả ngắn tại icon >, không nên quá dài. có thể là 1 component
 * @param {string} props.title tiêu đề
 * @param {string|JSX.Element|()=>JSX.Element=} props.description mô tả dưới tiêu đề
 * @param {()=>void=} props.onPress
 * @param {StyleProp<ViewStyle>=} props.style
 * @param {StyleProp<TextStyle>=} props.titleStyle
 * @param {StyleProp<TextStyle>=} props.descriptionStyle
 * @param {StyleProp<TextStyle>=} props.selectTitleStyle
 * @param {StyleProp<ImageStyle>=} props.thumbStyle
 */
const CardProfile = (props) => {
  const { t } = useTranslation();
  let {
    thumbnail,
    title,
    description,
    descriptionStyle,
    selectTitle,
    selectTitleStyle,
    onPress,
    style,
    titleStyle,
    thumbStyle,
    efficiency,
    price,
    children,
  } = props;

  return (
    <View
      style={{
        borderRadius: Const.space_12,
        backgroundColor: AppColors.white,
        shadowColor: "rgba(0,0,0,0.06)",
        shadowOffset: { height: 12, width: 12 },
        shadowOpacity: 1,
        shadowRadius: 30,
        elevation: 20,
        paddingVertical: Const.space_12,
        paddingHorizontal: Const.space_12,
        justifyContent: "space-between",

        marginHorizontal: 10,
        position: "absolute",
        zIndex: 1,
        right: 0,
        left: 0,
        marginTop: -10,
      }}
    >
      {/* avatar, name */}
      <View
        style={{
          marginVertical: 10,
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        {/* avatar. */}
        <View>
          <AvatarPicker size={60} showEdit={true}></AvatarPicker>
        </View>
        {/* name. */}
        <View style={{ width: "70%", alignItems: "flex-start" }}>
          <Text style={{ fontSize: 20, fontWeight: 700 }}>Pham Van A</Text>
          <Text style={{ fontSize: 10, fontWeight: 600 }}>Username</Text>
        </View>
      </View>

      {/* button */}

      <TouchableOpacity style={{ marginVertical: 10 }}>
        <ButtonFullBgr title={t("View profile")} height={35}></ButtonFullBgr>
      </TouchableOpacity>
    </View>
  );
};

export default CardProfile;

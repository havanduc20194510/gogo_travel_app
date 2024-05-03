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
  StyleSheet,
} from "react-native";
import FastImage from "react-native-fast-image";
import Styles, { FontSize } from "../Styles";
import Const from "../Const";
import AppColors from "../../assets/AppColors";
import AppIcons from "../../assets/AppIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const tag = "[CardRowNavigate]";
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
const CardRowNavigate = (props) => {
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
    leftIcon,
    rightIcon,
    top,
  } = props;

  return (
    <TouchableOpacity onPress={onPress}>
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
          top: top ?? 150,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 5,
        }}
      >
        {leftIcon ? (
          leftIcon
        ) : (
          <FontAwesome5 name="dot-circle" size={26}></FontAwesome5>
        )}

        <Text style={{ fontSize: 18, fontWeight: 700, alignItems: "center" }}>
          {title}
        </Text>
        {rightIcon ? (
          rightIcon
        ) : (
          <MaterialIcons
            name="keyboard-double-arrow-right"
            size={26}
          ></MaterialIcons>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CardRowNavigate;

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});

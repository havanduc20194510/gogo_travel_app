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

const tag = "[CardView]";
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
const CardView = (props) => {
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
      }}
    ></View>
  );
};

export default CardView;

import PropTypes from "prop-types";
import React from "react";
import { Image, Button } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Global from "../Global";
import navigatorUtils from "../../utils/navigator.utils";

/**
 *
 * @param title
 * @param icon
 * @param style
 * @param onIconPress
 * @param navigation
 * @param unsafe
 * @returns {JSX.Element}
 * @constructor
 */
export default function DefaultHeader({
  title,
  icon,
  style,
  onIconPress,
  navigation,
  unsafe,
}) {
  return (
    <View style={{ width: "100%" }}>
      {!!unsafe || <View style={{ height: Global.Const.statusBarHeight }} />}
      <View
        style={[
          {
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: Global.Const.space_16,
            paddingVertical: Global.Const.space_16,
          },
          style,
        ]}
      >
        <TouchableOpacity
          style={{ ...style, zIndex: 1 }}
          onPress={() => navigatorUtils.goBack(navigation)}
          hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        >
          <Icon name={"chevron-back-outline"} size={20} color={"#483d8b"} />
        </TouchableOpacity>
        {/* fix title absolute center*/}
        {typeof title === "object" ? (
          title
        ) : (
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              zIndex: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={[Global.Styles.Text.title, { color: "#483d8b" }]}>
              {title}
            </Text>
          </View>
        )}
        {icon && typeof icon === "object" ? (
          icon
        ) : (
          <TouchableOpacity
            onPress={onIconPress}
            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
          >
            {/* <Image
              source={icon}
              resizeMode="contain"
              style={[styles.rightIcon]}
            /> */}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

DefaultHeader.propTypes = {
  icon: PropTypes.number,
  navigation: PropTypes.object,
  onIconPress: PropTypes.func,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  title: PropTypes.string.isRequired,
  unsafe: PropTypes.bool,
};

const styles = StyleSheet.create({
  rightIcon: {
    width: 40,
    height: 40,
    color: "#483d8b",
  },
});

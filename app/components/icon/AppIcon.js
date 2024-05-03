import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

/**
 *
 * @param name
 * @param size
 * @param style
 * @param onPress
 * @param color
 * @returns {JSX.Element}
 * @document https://ionic.io/ionicons/
 * @constructor
 */
const AppIcon = ({ name, size, style, onPress, color = "white", title }) => {
  const tag = "[AppIcon]";

  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress}>
      <Icon color={color} name={name} size={size} style={style} />
    </TouchableOpacity>
  );
};

export default AppIcon;

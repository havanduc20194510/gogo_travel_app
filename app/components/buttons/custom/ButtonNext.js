import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import AppColors from "../../../assets/AppColors";
import AppIcon from "../../icon/AppIcon";
/**
 * @document
 * @param {function} onPress sự kiện khi click vào component
 * @param {string} text  
 }}
 * @returns {JSX.Element}
 * @constructor
 */
function ButtonNext({ onPress, text }) {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
    >
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 7,
          paddingVertical: 7,
          backgroundColor: "#FFF",
          marginHorizontal: 20,
          borderRadius: 30,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 6,
        }}
      >
        <Text style={{ color: AppColors.blueColor, fontWeight: 600 }}>
          {text}
        </Text>
        <View
          style={{
            backgroundColor: "#D4FCFC",
            padding: 5,
            borderRadius: 30,
          }}
        >
          <View
            style={{
              backgroundColor: "#00D9D9",
              padding: 5,
              borderRadius: 30,
            }}
          >
            <AppIcon
              name="chevron-forward-outline"
              style={{ width: 24, height: 24 }}
            ></AppIcon>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ButtonNext;

import React from "react";
import { View, Text } from "react-native";
import Global from "../Global";

/**
 * @param keyText
 * @param valueText
 * @param height
 * @returns {JSX.Element}
 * @constructor
 */
const KeyValueItem = ({ keyText, valueText, height = "auto", color }) => {
  const tag = "[KeyValueItem]";

  return (
    <View
      style={{
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        height: height,
        alignItems: "center",
        paddingHorizontal: 5,
      }}
    >
      <Text style={Global.Styles.Text.secondary}>{keyText}</Text>
      <View>
        <Text
          style={{
            ...Global.Styles.Text.title,
            textAlign: "right",
            maxWidth: 200,
            color: color,
          }}
        >
          {valueText}
        </Text>
      </View>
    </View>
  );
};

export default KeyValueItem;

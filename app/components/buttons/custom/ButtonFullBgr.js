import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Styles, { FontSize } from "../../Styles";
import AppColors from "../../../assets/AppColors";
import Const from "../../Const";

/**
 *  
 * @param {title} title: tiêu đề của nút (required)
 * @param {width} width:chiều rộng của nút (option)
 * @param {height} height:chiều cao của nút (option)
 * @param {bgrColor} bgrColor:màu nền của nút (option)
 * @param {txtColor} txtColor:màu chữ (option)
 * @param {disabled} disabled: enable/disable click button (option)
 * @param {style} style (option)
 * @callback onPress gọi khi nút đc bấm
 * @constructor
 */

function ButtonFullBgr({
  title,
  width = "100%",
  height,
  bgrColor = null,
  txtColor = null,
  style,
  disabled = false,
  onPress,
  fontSize
}) {
  const tag = "ButtonFullBgr";
  if (!height) {
    height = Const.heightButton;
  }
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        {
          borderRadius: height / 2,
          height: height ? height : Const.heightButton,
          width: width ? width : Const.widthButton,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: bgrColor ? bgrColor : AppColors.bgrbutton,
          fontWeight: "bold",
        },
        disabled && {
          backgroundColor: AppColors.disable,
        },
        style,
      ]}
      onPress={() => {
        onPress();
      }}
    >
      <Text
        style={[
          Styles.Text.primary,
          {
            color: txtColor ? txtColor : AppColors.white,
            fontSize: fontSize ?? FontSize.s_14,
            fontWeight: "600",
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default ButtonFullBgr;
